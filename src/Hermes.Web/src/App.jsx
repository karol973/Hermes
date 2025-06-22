// import React from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import HomeView from './views/HomeView';
// import BookDetailsView from './views/BookDetailsView';
// import LoginView from './views/LoginView';
 
// const App = () => (
//   <BrowserRouter>
//     <Routes>
//       <Route path="/" element={<HomeView />} />
//       <Route path="/card" element={<BookDetailsView />} />
//       <Route path="/login" element={<LoginView />} />
//      </Routes>
//   </BrowserRouter>
// );

// export default App;

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';

// import './index.css';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
// export default App;
// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import HomeView from './views/HomeView';
// import BookDetailsView from './views/BookDetailsView';
// import Login from './components/componentlogin.jsx';
// import Contact from './components/contactcomponent.jsx';
// import News from './components/newscomponent.jsx';

// const App = () => (
//   <Routes>
//     <Route path="/" element={<HomeView />} />
//     <Route path="/card" element={<BookDetailsView />} />
//     <Route path="/login" element={<Login />} />
//     <Route path="/contact" element={<Contact />} />
//     <Route path="/news" element={<News />} />
//   </Routes>
// );

// export default App;

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeView from './views/HomeView';
import BookDetailsView from './views/BookDetailsView';
import Login from './components/componentlogin.jsx';
import Contact from './components/contactcomponent.jsx';
import News from './components/newscomponent.jsx';

const App = () => (
  <Routes>
    <Route path="/" element={<HomeView />} />
    <Route path="/card" element={<BookDetailsView />} />
    <Route path="/login" element={<Login />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/news" element={<News />} />
  </Routes>
);

export default App;
