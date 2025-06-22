import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Image, Modal, Spin, Alert, message } from 'antd';
import MainMenu from './mainmenu';
import BookDetailsForm from './bookdetailsform';
import BookService from '../services/BookService';
import { useUser } from '../context/userContext';
import { Role } from '../types/users/Role';

const BookDetails = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useUser();
  const canEdit = user && (user.role === Role.Admin || user.role === Role.SuperUser);

  const id = Number(searchParams.get("id"));

  useEffect(() => {
    if (!id || isNaN(id)) {
      navigate('/');
      return;
    }

    const loadBook = async () => {
      try {
        const data = await new BookService().getBookByIdAsync(id);
        setBook(data);
      } catch (err) {
        console.error('Błąd ładowania szczegółów książki:', err);
        setError("Nie udało się załadować danych książki.");
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
    message.success('Zaktualizowano dane książki.');
    try {
      const updatedBook = await new BookService().getBookByIdAsync(id);
      setBook(updatedBook);
    } catch (error) {
      console.error('Błąd ponownego pobrania książki:', error);
    }
  };

  if (loading) return <Spin style={{ margin: '2rem auto', display: 'block' }} />;
  if (error) return <Alert message={error} type="error" style={{ margin: '2rem auto', maxWidth: 600 }} />;
  if (!book) return null;

  return (
    <div>
      <MainMenu isCardComponent={false} />
      <Button onClick={() => navigate('/')} style={{ margin: '8px 0' }}>
        Powrót
      </Button>

      <div style={{ padding: 20 }}>
        <h1>{book.name}</h1>
        <p>Kategoria: {book.category}</p>

        <div className='elementy-cardpage'>
          <Image.PreviewGroup>
            <Image
              width={400}
              src={book.coverImageUrl || 'https://via.placeholder.com/400'}
              alt="okładka"
            />
          </Image.PreviewGroup>

          <div>
            <p>Autor: {book.authorName}</p>
            <p>Wydawnictwo: {book.publisherName}</p>
            <p>Cena: {book.price} zł</p>
            Dostępność:{" "}
            <span style={{ color: book.isAvailable ? "green" : "red", fontWeight: "bold" }}>
              {book.isAvailable ? "TAK" : "BRAK"}
            </span>
            <p>Ilość na stanie: {book.quantity}</p>
            <p>Rok publikacji : {book.publishYear}</p>
          </div>

          <div className='buttony-cardpage'>
            {canEdit && (
              <Button className='Button-edit-cardpage' onClick={showModal} style={{ margin: '8px 0' }}>
                Edytuj
              </Button>
            )}
            <Button type="primary">Dodaj do koszyka</Button>
          </div>
        </div>

        <Modal
          title="Edycja książki"
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
          destroyOnClose
        >
          <BookDetailsForm
            isEditMode={true}
            book={book}
            onSuccessClose={handleUpdateSuccess}
          />
        </Modal>
      </div>
    </div>
  );
};

export default BookDetails;
