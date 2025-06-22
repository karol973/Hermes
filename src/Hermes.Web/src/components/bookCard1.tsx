import React from 'react';

interface BookCardProps {
  card: {
    name: string;
    link: string;
  };
}

const BookCard: React.FC<BookCardProps> = ({ card }) => {
  return (
    <div className="book-card">
      <h3>{card.name}</h3>
      <a href={card.link}>Zobacz</a>
    </div>
  );
};

export default BookCard;
