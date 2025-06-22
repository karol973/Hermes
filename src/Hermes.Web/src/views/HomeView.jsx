// import React, { useEffect, useState } from 'react';
// import MainMenu from '../components/mainmenu.jsx';
// import Mysearch from '../components/searchfilters.jsx';
// import AddBookModal from '../components/addbookmodal.jsx';
// import BookCard from '../components/bookcard.jsx';
// import { Pagination, Alert } from 'antd';
// import BookService from '../services/BookService';
// import { useUser } from '../UserContext';

// const HomeView = () => {
//   const [books, setBooks] = useState([]);

 

//   useEffect(() => {
//     loadAllBooks();
//   }, []);

//   const loadAllBooks = async () => {
//     try {
//       const data = await new BookService().getBooksAsync();
//       const mappedBooks = mapBooks(data);
//       setBooks(mappedBooks);
//     } catch (err) {
//       console.error('API error:', err);
//     }
//   };

//   const mapBooks = (bookList) =>
//     bookList.map(book => ({
//       name: book.name || "Brak tytułu",
//       link: `/card?id=${book.id}`
//     }));

//   return (
//     <>
//       <MainMenu isCardComponent={false} />

//       <div className="book-add-position-conatiner">
//         <Mysearch 
//           className="search-bar" 
//           onBooksLoaded={(filteredBooks) => {
//             const mapped = mapBooks(filteredBooks);
//             setBooks(mapped);
//           }} 
//         />
//       <AddBookModal user={user} onBookAdded={loadAllBooks} />

//       </div>

//       <div className="card-container">
//         {books.length === 0 ? (
//           <Alert
//             message="Brak wyników"
//             description="Brak książek spełniających kryteria wyszukiwania lub wybranej kategorii."
//             type="info"
//             showIcon
//             style={{ margin: '1rem auto', maxWidth: '600px' }}
//           />
//         ) : (
//           books.map((book, index) => (
//             <BookCard card={book} key={index} />
//           ))
//         )}
//       </div>

//       <Pagination 
//         align="start" 
//         defaultCurrent={1} 
//         total={books.length} 
//         className="card-pagination" 
//       />
//     </>
//   );
// };

// export default HomeView;

import React, { useEffect, useState } from 'react';
import MainMenu from '../components/mainmenu.jsx';
import Mysearch from '../components/searchfilters.jsx';
import AddBookModal from '../components/addbookmodal.tsx';
// import BookCard from '../components/bookcard.jsx';
import BookCard from '../components/bookcard.tsx';
import { Pagination, Alert } from 'antd';
import BookService from '../services/BookService';
import { useUser } from '../context/userContext';
import { Role } from '../types/users/Role';

const HomeView = () => {
  const [books, setBooks] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    loadAllBooks();
  }, []);

  const loadAllBooks = async () => {
    try {
      const data = await new BookService().getBooksAsync();
      const mappedBooks = mapBooks(data);
      setBooks(mappedBooks);
    } catch (err) {
      console.error('API error:', err);
    }
  };

  const mapBooks = (bookList) =>
    bookList.map(book => ({
      id: book.id,
      name: book.name,
      link: `/card?id=${book.id}`,
      category: book.categoryName,
      authorName: book.authorName,
      authorSurname: book.authorSurname,
      price: book.price
    }));
  

  const isPrivileged = user && (user.role === Role.Admin || user.role === Role.SuperUser);

  return (
    <>
      <MainMenu isCardComponent={false} />

      <div className="book-add-position-conatiner">
        <Mysearch 
          className="search-bar" 
          onBooksLoaded={(filteredBooks) => {
            const mapped = mapBooks(filteredBooks);
            setBooks(mapped);
          }} 
        />
        {isPrivileged && (
          <AddBookModal user={user} onBookAdded={loadAllBooks} />
        )}
      </div>

      <div className="card-container">
        {books.length === 0 ? (
          <Alert
            message="Brak wyników"
            description="Brak książek spełniających kryteria wyszukiwania lub wybranej kategorii."
            type="info"
            showIcon
            style={{ margin: '1rem auto', maxWidth: '600px' }}
          />
        ) : (
          books.map((book, index) => (
            <BookCard card={book} key={index} />
          ))
        )}
      </div>

      <Pagination 
        align="start" 
        defaultCurrent={1} 
        total={books.length} 
        className="card-pagination" 
      />
    </>
  );
};

export default HomeView;
