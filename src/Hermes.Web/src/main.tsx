// src/main.tsx
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import App from './App';  
// import './index.css';
// import MainMenu from './components/mainmenu.jsx';
// import Mysearch from './components/searchfilters.jsx';
// import AddBookModal from './components/addbookmodal.jsx';
// import BookCard from './components/bookCard';
// import BookDetails from "./components/bookdetails.jsx";
// import Login from "./components/componentlogin.jsx";
// import Contact from './components/contactcomponent.jsx';
// import News from './components/newscomponent.jsx';
// import { Pagination } from 'antd';
// import { UserProvider } from '../src/context/userContext';


// const arr = [
//   { name: "Szczegóły ksiązki", link: "https://codesandbox.io/p/sandbox/..." },
//   { name: "test name 2", link: "https://www.cargo.link/career/frontend-dev/" },
//   { name: "test name 3", link: "https://www.youtube.com/watch?v=ix9cRaBkVe0" },
//   { name: "test name 5", link: "https://www.freecodecamp.org/news/how-to-render-lists-in-react/" }
// ];

// // const Home = () => (
// //   <>
// //     <MainMenu isCardComponent={false} />
// //     <div className="book-add-position-conatiner">
// //       <Mysearch className="search-bar" />
// //       <AddBookModal isWorker={true} />
// //     </div>

// //     <div className='card-container'>
// //       {arr.map((data, key) => (
// //         <BookCard card={data} key={key} />
// //       ))}
// //     </div>

// //     <Pagination align="start" defaultCurrent={1} total={50} className='card-pagination' />
// //   </>
// // );

// const root = ReactDOM.createRoot(document.getElementById('root')!);
// root.render(
//   <React.StrictMode>
//      <BrowserRouter>
//       <UserProvider>
//         <App />
//       </UserProvider>
//     </BrowserRouter>
//   </React.StrictMode>
// );

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { UserProvider } from './context/userContext';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
