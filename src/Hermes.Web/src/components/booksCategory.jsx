import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Typography, Space, Tag, Spin, Alert, Button, Layout } from 'antd';
import BookService from '../services/BookService';
import MainMenu from '../components/mainmenu';

const { Content } = Layout;
const { Title, Text } = Typography;

const BooksCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const bookService = new BookService();
        const categoryBooks = await bookService.getBooksByCategoryAsync(id);
        setBooks(categoryBooks);
        
        const categories = await bookService.getCategoriesForView();
        const category = categories.find(cat => cat.value == id);
        setCategoryName(category?.label || 'Kategoria');
      } catch (err) {
        console.error('Błąd ładowania książek:', err);
        setError("Nie udało się załadować książek z tej kategorii.");
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [id]);

  if (loading) return <Spin style={{ margin: '2rem auto', display: 'block' }} />;
  if (error) return <Alert message={error} type="error" style={{ margin: '2rem auto', maxWidth: 600 }} />;

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <MainMenu isCardComponent={false} />
      
      <Content style={{ padding: '0 50px', marginTop: 16 }}>
        <div style={{ marginBottom: 16 }}>
          <Button type="primary" onClick={() => navigate('/')}>
            Powrót
          </Button>
          <Title level={2} style={{ marginTop: 16 }}>Kategoria: {categoryName}</Title>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px'}}>
          {books.map(book => (
            <Card
              key={book.id}
              hoverable
              style={{ width: 300, marginBottom: 20 }}
              cover={
                <img
                  alt="okładka"
                  src={book.bookImage 
                    ? `data:image/jpeg;base64,${book.bookImage}`
                    : 'https://via.placeholder.com/400'}
                  style={{ height: 200, objectFit: 'contain', padding: 16 }}
                />
              }
              onClick={() => navigate(`/card?id=${book.id}`)}
            >
              <Space direction="vertical" size="small">
                <Title level={4} style={{ margin: 0 }}>{book.name}</Title>
                <Text type="secondary">{book.authorName} {book.authorSurname}</Text>
                <Text strong style={{ color: '#1890ff' }}>{book.price.toFixed(2)} zł</Text>
                <Tag color={book.isAvailable ? "green" : "red"}>
                  {book.isAvailable ? "DOSTĘPNA" : "BRAK"}
                </Tag>
              </Space>
            </Card>
          ))}
        </div>

        {books.length === 0 && (
          <Alert 
            message="Brak książek w tej kategorii" 
            type="info" 
            style={{ margin: '2rem auto', maxWidth: 600 }}
          />
        )}
      </Content>
    </Layout>
  );
};

export default BooksCategory;