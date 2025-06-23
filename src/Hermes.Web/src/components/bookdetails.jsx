import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Button, 
  Image, 
  Modal, 
  Spin, 
  Alert, 
  Typography, 
  Card, 
  Space, 
  Tag, 
  notification,
  Badge
} from 'antd';
import MainMenu from '../components/mainmenu';
import BookDetailsForm from './BookDetailsForm';
import BookService from '../services/BookService';
import { useUser } from '../context/UserContext';
import { useCart } from '../context/CartContext';

const { Title, Text } = Typography;

const BookDetails = (props) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageKey, setImageKey] = useState(Date.now());
  
  const { user, isAdmin, isSuperUser } = useUser();
  const { cartItems, addToCart, getAvailableQuantity } = useCart();
  const [api, contextHolder] = notification.useNotification();

  const id = Number(searchParams.get("id"));
  const canEdit = isAdmin || isSuperUser;
  const canAddToCart = user !== null;

  const showNotification = (type, message, description) => {
    api[type]({
      message,
      description,
      placement: 'topRight',
      duration: 4.5,
    });
  };

  useEffect(() => {
    if (!id || isNaN(id)) {
      navigate('/');
      return;
    }

    const loadBook = async () => {
      try {
        const bookService = new BookService();
        const data = await bookService.getBookByIdAsync(id);
        setBook(data);
        setImageKey(Date.now());
      } catch (err) {
        console.error('Błąd ładowania szczegółów książki:', err);
        setError("Nie udało się załadować danych książki.");
        showNotification('error', 'Błąd', 'Nie udało się załadować danych książki');
      } finally {
        setLoading(false);
      }
    };

    loadBook();
  }, [id, navigate]);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const handleUpdateSuccess = async () => {
    setIsModalOpen(false);
    showNotification('success', 'Sukces', 'Zaktualizowano dane książki');
    
    try {
      const bookService = new BookService();
      const updatedBook = await bookService.getBookByIdAsync(id);
      setBook(updatedBook);
      if (props.onBookUpdated) {
        props.onBookUpdated();
      }
    } catch (error) {
      console.error(error);
      showNotification('error', 'Błąd', 'Nie udało się odświeżyć danych książki');
    }
  };

  const handleAddToCart = () => {
    if (!user) {
      showNotification('warning', 'Wymagane logowanie', 'Musisz się zalogować, aby dodać produkt do koszyka');
      navigate('/login');
      return;
    }
    
    const availableQuantity = getAvailableQuantity(book);
    if (availableQuantity <= 0) {
      showNotification('error', 'Brak dostępnych sztuk', 'Ta książka jest obecnie niedostępna');
      return;
    }

    addToCart(book);
    showNotification('success', 'Dodano do koszyka', `"${book.name}" został dodany do koszyka`);
  };

  if (loading) return (
    <>
      {contextHolder}
      <Spin style={{ margin: '2rem auto', display: 'block' }} />
    </>
  );
  
  if (error) return (
    <>
      {contextHolder}
      <Alert message={error} type="error" style={{ margin: '2rem auto', maxWidth: 600 }} />
    </>
  );
  
  if (!book) return null;

  const availableQuantity = getAvailableQuantity(book);
  const inCart = cartItems.find(item => item.id === book.id)?.quantity || 0;

  return (
    <div style={{ maxWidth: '2000px', margin: '0 auto' }}>
      {contextHolder}
      <MainMenu isCardComponent={false} />
      
      <Button 
        type="primary" 
        onClick={() => navigate('/')} 
        style={{ marginBottom: '16px', marginTop: '15px' }}
      >
        Powrót
      </Button>

      <Card>
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Title level={2}>{book.name}</Title>
          <Tag color="blue">{book.category}</Tag>

          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            <Card
              style={{ width: '400px', padding: '16px' }}
              cover={
                <Image.PreviewGroup>
                  <Image
                    key={imageKey}
                    width="100%"
                    src={book.bookImage 
                      ? `data:image/jpeg;base64,${book.bookImage}`
                      : 'https://via.placeholder.com/400'}
                    alt="okładka"
                    style={{ borderRadius: '4px' }}
                  />
                </Image.PreviewGroup>
              }
            />

            <Space direction="vertical" size="middle" style={{ flex: 1 }}>
              <Text><strong>Autor:</strong> {book.authorName} {book.authorSurname}</Text>
              <Text><strong>Wydawnictwo:</strong> {book.publisherName}</Text>
              <Text><strong>Cena:</strong> {book.price.toFixed(2)} zł</Text>
              
              <Text>
                <strong>Dostępność:</strong>{" "}
                <Tag color={availableQuantity > 0 ? "green" : "red"}>
                  {availableQuantity > 0 ? "DOSTĘPNA" : "BRAK"}
                </Tag>
              </Text>
              
              <Text>
                <strong>Ilość na stanie:</strong> {book.quantity}
                {inCart > 0 && (
                  <Text type="secondary" style={{ marginLeft: '8px' }}>
                    (w koszyku: {inCart})
                  </Text>
                )}
              </Text>
              
              <Text><strong>Dostępna ilość:</strong> {availableQuantity}</Text>
              <Text><strong>Rok publikacji:</strong> {book.publishYear}</Text>

              <Space size="middle" style={{ marginTop: '16px' }}>
                {canEdit && (
                  <Button type="default" onClick={showModal}>
                    Edytuj
                  </Button>
                )}
                <Button 
                  type="primary" 
                  onClick={handleAddToCart}
                  disabled={availableQuantity <= 0}
                >
                  Dodaj do koszyka
                </Button>
              </Space>
            </Space>
          </div>
        </Space>
      </Card>
      <Modal
        title="Edycja książki"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
        width={800}
      >
        <BookDetailsForm
          isEditMode={true}
          book={book}
          onSuccessClose={handleUpdateSuccess}
        />
      </Modal>
    </div>
  );
};

export default BookDetails;