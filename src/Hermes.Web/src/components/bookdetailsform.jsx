import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, Select, Upload, Switch, notification } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import BookCategory from '../types/books/BookCategory';
import BookService from '../services/BookService';

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
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const bookService = new BookService();
  const [api, contextHolder] = notification.useNotification();

  const showError = (text) => {
    api.error({
      message: 'Błąd',
      description: text,
      placement: 'topRight',
      duration: 10
    });
  };

  const showSuccess = (text) => {
    api.success({
      message: 'Sukces',
      description: text,
      placement: 'topRight',
      duration: 6
    });
  };

  const showWarning = (text) => {
    api.warning({
      message: 'Ostrzeżenie',
      description: text,
      placement: 'topRight',
      duration: 0
    });
  };

  useEffect(() => {
    if (isEditMode && book) {
      const categoryValue = typeof book.category === 'string'
        ? categoryNameToEnum(book.category)
        : book.category;

      form.setFieldsValue({
        ...book,
        category: categoryValue,
        isAvailable: book.isAvailable,
      });

      if (book.bookImage) {
        setFileList([{
          uid: '-1',
          name: 'book-cover.jpg',
          status: 'done',
          url: `data:image/jpeg;base64,${book.bookImage}`,
        }]);
      }
    }
  }, [book, isEditMode, form]);

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) showError('Możesz przesłać tylko pliki graficzne!');
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) showError('Obraz musi być mniejszy niż 5MB!');
    return isImage && isLt5M;
  };

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result?.toString().split(',')[1] || '';
        resolve(result);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFinish = async (values) => {
    const quantity = values.quantity;
    let isAvailable = isEditMode ? values.isAvailable : quantity > 0;

    if (isEditMode) {
      if (quantity > 0 && !isAvailable) {
        showError('Książka, która jest na stanie nie może być niedostępna');
        return;
      }
      if (quantity === 0 && isAvailable) {
        showError('Książka, która została wyprzedana nie może być dostępna');
        return;
      }
    }

    setUploading(true);
    let imageBase64 = '';
    if (fileList.length > 0 && fileList[0].originFileObj) {
      try {
        imageBase64 = await convertImageToBase64(fileList[0].originFileObj);
      } catch (error) {
        showError('Błąd podczas przetwarzania obrazu');
        setUploading(false);
        return;
      }
    } else if (book?.bookImage && fileList.length > 0) {
      imageBase64 = book.bookImage;
    }

    const command = {
      ...values,
      isAvailable,
      bookImage: imageBase64,
      antiqueShopId: 1,
    };

    try {
      if (isEditMode && book?.id) {
        await bookService.updateBookAsync(book.id, command);
        showSuccess('Zmiany zostały zapisane!');
        if (onSuccessClose) onSuccessClose();
        if (onBookUpdated) onBookUpdated();
      } else {
        await bookService.createBookAsync(command);
        showSuccess('Książka została dodana!');
        form.resetFields();
        setFileList([]);
        if (onSuccessClose) onSuccessClose();
        if (onBookAdded) onBookAdded();
      }
    } catch (error) {
      console.error('Błąd przy zapisie książki:', error);
      showError('Wystąpił błąd przy zapisie książki');
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      {contextHolder}
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
                <Option key={val} value={val}>{key}</Option>
              ))}
          </Select>
        </Form.Item>

        <Form.Item label="Cena PLN" name="price" rules={[{ required: true, message: 'Wprowadź cenę' }]}>
          <InputNumber min={0} step={0.01} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item label="Ilość" name="quantity" rules={[{ required: true, message: 'Wprowadź ilość' }]}>
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>

        {isEditMode && (
          <Form.Item label="Dostępność" name="isAvailable" valuePropName="checked">
            <Switch checkedChildren="Dostępna" unCheckedChildren="Brak" />
          </Form.Item>
        )}

        <Form.Item label="Okładka" name="bookImage">
          <Upload
            listType="picture"
            fileList={fileList}
            beforeUpload={beforeUpload}
            onChange={handleUploadChange}
            maxCount={1}
            accept="image/*"
          >
            <Button icon={<UploadOutlined />}>Wybierz zdjęcie</Button>
          </Upload>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={uploading}>
            Zatwierdź
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default BookDetailsForm;