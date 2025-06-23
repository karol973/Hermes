import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeView from './views/HomeView';
import BookDetailsView from './views/BookDetailsView';
import Login from './components/componentlogin.jsx';
import Contact from './components/contactcomponent.jsx';
import News from './components/newscomponent.jsx';
import BooksCategory from './components/booksCategory.jsx';
import Cart from './components/cart.jsx';

const App = () => (
  <Routes>
    <Route path="/" element={<HomeView />} />
    <Route path="/card" element={<BookDetailsView />} />
    <Route path="/login" element={<Login />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/news" element={<News />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/category/:id" element={<BooksCategory />} />
  </Routes>
);

export default App;
