import React, { useState, useEffect } from 'react';
import { Menu, Badge } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import baner from '../mainbaner.png';
import logo from '../logo.svg';
import BookService from '../services/BookService';

const MainMenu = ({ isCardComponent }) => {
  const [current, setCurrent] = useState('MainPage');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { totalItems } = useCart();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const bookService = new BookService();
        const categoriesData = await bookService.getCategoriesForView();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Błąd ładowania kategorii:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  const onClick = (e) => {
    setCurrent(e.key);

    switch (e.key) {
      case 'MainPage':
        navigate('/');
        break;
      case 'kontakt':
        navigate('/contact');
        break;
      case 'konto':
        navigate('/login');
        break;
      case 'koszyk':
        navigate('/cart');  
        break;
      case 'news':
        navigate('/news');
        break;
      default:
        if (e.key.startsWith('category-')) {
          const categoryId = e.key.split('-')[1];
          navigate(`/category/${categoryId}`);
        }
        break;
    }
  };

  const items = [
    {
      label: 'Strona główna',
      key: 'MainPage',
    },
    {
      label: 'Katalog',
      key: 'SubMenu',
      children: loading 
        ? [{ label: 'Ładowanie...', key: 'loading', disabled: true }]
        : categories.map(category => ({
            label: category.label,
            key: `category-${category.value}`,
          })),
    },
    {
      label: 'Kontakt',
      key: 'kontakt',
    },
    {
      label: 'Konto',
      key: 'konto',
    },
    {
      label: (
        <Badge count={totalItems} offset={[10, 0]}>
          Koszyk
        </Badge>
      ),
      key: 'koszyk',
    },
    {
      label: 'Aktualności',
      key: 'news',
    },
  ];

  return (
    <div>
      <h1
        style={{
          textAlign: 'left',
          fontSize: '15px',
          fontWeight: 'bold',
          margin: '6px 0',
          color: '#333',
          padding: '0',
        }}
      >
        Antykwariat
      </h1>

      {!isCardComponent && (
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
          style={{
            margin: '8px',
            backgroundColor: 'transparent',
            border: 'none',
            color: '#424756',
          }}
        />
      )}

      <header className="header">
        <div className="banner-container">
          <img src={baner} alt="Baner Antykwariat" className="banner-image" />
          <img src={logo} alt="Logo Antykwariat" className="logo-on-banner" />
        </div>
      </header>
    </div>
  );
};

export default MainMenu;