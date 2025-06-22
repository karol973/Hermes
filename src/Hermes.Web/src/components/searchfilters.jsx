import React, { useEffect, useState } from 'react';
import { AudioOutlined, DownOutlined } from '@ant-design/icons';
import { Input, Space, Button, Dropdown } from 'antd';
import BookService from '../services/bookService';
import AuthorService from '../services/authorService';

const { Search } = Input;

const Mysearch = (props) => {
  const [categoryItems, setCategoryItems] = useState([]);
  const [authorItems, setAuthorItems] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingAuthors, setLoadingAuthors] = useState(false);

  const bookService = new BookService();
  const authorService = new AuthorService();

  useEffect(() => {
    loadCategories();
    loadAuthors();
  }, []);

  const loadCategories = async () => {
    setLoadingCategories(true);
    try {
      const categories = await bookService.getCategoriesForView();
      const categoryMenuItems = categories.map(category => ({
        label: category.label,
        key: category.value.toString(),
      }));
      setCategoryItems(categoryMenuItems);
    } catch (error) {
      console.error('Błąd wczystywania kategorii:', error);
    } finally {
      setLoadingCategories(false);
    }
  };

  const loadAuthors = async () => {
    setLoadingAuthors(true);
    try {
      const authors = await authorService.getAuthorsAsync();
      const authorMenuItems = authors.map(author => ({
        label: `${author.name} ${author.surname}`,
        key: author.id.toString(),
      }));
      setAuthorItems(authorMenuItems);
    } catch (error) {
      console.error('Błąd wczytywania autorów:', error);
    } finally {
      setLoadingAuthors(false);
    }
  };

  const handleCategoryClick = async (e) => {
    const categoryId = parseInt(e.key);
    try {
      const books = await bookService.getBookSByCategoryAsync(categoryId);
      props.onBooksLoaded?.(books);
    } catch (error) {
      console.error('Błąd wczytywania książek:', error);
    }
  };

  const handleAuthorClick = async (e) => {
    const authorId = parseInt(e.key);
    try {
      const books = await bookService.getBooksByAuthorAsync(authorId);
      props.onBooksLoaded?.(books);
    } catch (error) {
      console.error('Błąd wczystywania książek autora:', error);
    }
  };

  const handleSearch = async (value) => {
    try {
      const allBooks = await bookService.getBooksAsync();
      const filtered = allBooks.filter(book =>
        book.name?.toLowerCase().includes(value.toLowerCase())
      );
      props.onBooksLoaded?.(filtered);
    } catch (error) {
      console.error('Błąd wyszukiwania:', error);
    }
  };

  const handleShowAll = async () => {
    try {
      const allBooks = await bookService.getBooksAsync();
      props.onBooksLoaded?.(allBooks);
    } catch (error) {
      console.error('Błąd ładowania wszystkich książek:', error);
    }
  };

  return (
    <div className="search-container">
      <Space direction="vertical" className={props.className}>
        <Search
          placeholder="Szukaj po tytule..."
          onSearch={handleSearch}
          enterButton
          suffix={<AudioOutlined style={{ fontSize: 16, color: '#1677ff' }} />}
        />
      </Space>

      <div className="search-filters">
        <Dropdown
          menu={{ items: categoryItems, onClick: handleCategoryClick }}
          disabled={loadingCategories}
        >
          <Button>
            <Space>
              {loadingCategories ? 'Ładowanie...' : 'Wybierz kategorię'}
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>

        <Dropdown
          menu={{ items: authorItems, onClick: handleAuthorClick }}
          disabled={loadingAuthors}
        >
          <Button>
            <Space>
              {loadingAuthors ? 'Ładowanie...' : 'Wybierz autora'}
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>

        <Button onClick={handleShowAll}>Pokaż wszystkie</Button>
      </div>
    </div>
  );
};

export default Mysearch;
