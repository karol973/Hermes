import React, { useState } from 'react';
import { Card, Row, Col, Typography, Divider } from 'antd';
import MainMenu from '../components/mainmenu';
import Mysearch from '../components/searchfilters';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const CategoryBooks = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  const handleBooksLoaded = (booksFromApi) => {
    setBooks(booksFromApi);
  };

  return (
    <div>
      <MainMenu isCardComponent={true} />
      <div style={{ padding: '20px 50px' }}>
        <Title level={2}>Katalog książek</Title>
        <Mysearch onBooksLoaded={handleBooksLoaded} />

        <Divider />

        {books.length === 0 ? (
          <Text type="secondary">Brak wyników. Wybierz kategorię lub autora.</Text>
        ) : (
          <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
            {books.map((book) => (
              <Col key={book.id} xs={24} sm={12} md={8} lg={6}>
                <Card
                  hoverable
                  style={{ borderRadius: '10px', minHeight: 380 }}
                  cover={
                    <img
                      alt={book.name}
                      src={
                        book.bookImage
                          ? `data:image/jpeg;base64,${book.bookImage}`
                          : 'https://via.placeholder.com/400'
                      }
                      style={{ height: 280, objectFit: 'cover', borderRadius: '10px 10px 0 0' }}
                    />
                  }
                  onClick={() => navigate(`/bookdetails?id=${book.id}`)}
                >
                  <Card.Meta
                    title={book.name}
                    description={
                      <>
                        <div>Autor: {book.authorName}</div>
                        <div>Cena: {book.price} zł</div>
                        <div style={{ color: book.isAvailable ? 'green' : 'red' }}>
                          {book.isAvailable ? 'Dostępna' : 'Brak'}
                        </div>
                      </>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
};

export default CategoryBooks;
