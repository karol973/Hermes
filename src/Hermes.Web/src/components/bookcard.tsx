import React from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';

interface BookCardProps {
  card: {
    id: number | string;
    name: string;
    category: string;
    price: number;
    authorName: string;
    authorSurname: string
   };
}

const BookCard: React.FC<BookCardProps> = ({ card }) => (
  <Card title={card.name} style={{ width: 350 }}>
    <p>{card.category}</p>
    
    <Link to={`/card?id=${card.id}`}>
      <img
        width={200}
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        alt="Okładka"
      />
    </Link>
     <p>{card.authorName} {card.authorSurname}</p>
     <p>Cena {card.price} zł</p>
  </Card>
);

export default BookCard;