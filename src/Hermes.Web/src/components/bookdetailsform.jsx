import React, { useEffect } from 'react';
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  message,
} from 'antd';
import BookCategory from '../types/books/BookCategory';
import BookService from '../services/bookService';

const { Option } = Select;

const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 6 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 14 } },
};

const categoryNameToEnum = (name) => {
  const entry = Object.entries(BookCategory).find(([key]) => key === name);
  return entry ? entry[1] : undefined;
};

const BookDetailsForm = ({ isEditMode, book, onSuccessClose, onBookUpdated, onBookAdded }) => {
  const [form] = Form.useForm();
  const bookService = new BookService();

  useEffect(() => {
    if (isEditMode && book) {
      const categoryValue = typeof book.category === 'string'
        ? categoryNameToEnum(book.category)
        : book.category;

      form.setFieldsValue({
        ...book,
        category: categoryValue,
      });
    }
  }, [book, isEditMode, form]);

  const handleFinish = async (values) => {
    const command = {
      ...values,
      bookImage: '',
      antiqueShopId: 1,
      isAvailable: true,
    };

    try {
      if (isEditMode && book && book.id) {
        await bookService.updateBookAsync(book.id, command);
        message.success('Zmiany zostały zapisane!');
        if (onSuccessClose) onSuccessClose();
        if (onBookUpdated) onBookUpdated(); 
      } else {
        await bookService.createBookAsync(command);
        message.success('Książka została dodana!');
        form.resetFields();
        if (onSuccessClose) onSuccessClose();
        if (onBookAdded) onBookAdded();
      }
    } catch (error) {
      console.error('Błąd przy zapisie książki:', error);
      message.error('Wystąpił błąd przy zapisie książki.');
    }
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      onFinish={handleFinish}
      style={{ maxWidth: 600 }}
    >
      <Form.Item label="Tytuł" name="name" rules={[{ required: true, message: 'Wprowadź tytuł' }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Imię autora" name="authorName" rules={[{ required: true, message: 'Wprowadź imię autora' }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Nazwisko autora" name="authorSurname" rules={[{ required: true, message: 'Wprowadź nazwisko autora' }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Wydawnictwo" name="publisherName" rules={[{ required: true, message: 'Wprowadź nazwę wydawnictwa' }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Rocznik" name="publishYear" rules={[{ required: true, message: 'Wprowadź rok wydania' }]}>
        <InputNumber min={1000} max={3000} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label="Kategoria" name="category" rules={[{ required: true, message: 'Wybierz kategorię!' }]}>
        <Select placeholder="Wybierz kategorię">
          {Object.entries(BookCategory)
            .filter(([_, val]) => typeof val === 'number')
            .map(([key, val]) => (
              <Option key={val} value={val}>
                {key}
              </Option>
            ))}
        </Select>
      </Form.Item>

      <Form.Item label="Cena PLN" name="price" rules={[{ required: true, message: 'Wprowadź cenę' }]}>
        <InputNumber min={0} step={0.01} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label="Ilość" name="quantity" rules={[{ required: true, message: 'Wprowadź ilość' }]}>
        <InputNumber min={1} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Zatwierdź
        </Button>
      </Form.Item>
    </Form>
  );
};

export default BookDetailsForm;
