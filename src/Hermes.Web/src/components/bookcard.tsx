import React from 'react';
import { Card, Typography, Space, Tag } from 'antd';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

interface BookCardProps {
  card: {
    id: number | string;
    name: string;
    category: string;
    price: number;
    authorName: string;
    authorSurname: string;
    bookImage?: string;
    coverImageUrl?: string;
  };
  onBookUpdated?: () => void; 
}

const BookCard: React.FC<BookCardProps> = ({ card }) => (
  <Card
    hoverable
    style={{ width: 300, borderRadius: 8, overflow: 'hidden' }}
    cover={
      <Link to={`/card?id=${card.id}`}>
        <div style={{ padding: 16, display: 'flex', justifyContent: 'center', backgroundColor: '#f5f5f5' }}>
          <img
            style={{ 
              height: 200,
              objectFit: 'contain',
              borderRadius: 4,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
            src={card.bookImage 
              ? `data:image/jpeg;base64,${card.bookImage}` 
              : card.coverImageUrl || 'https://via.placeholder.com/400'}
            alt="Okładka książki"
          />
        </div>
      </Link>
    }
  >
    <Space direction="vertical" size="small" style={{ width: '100%' }}>
      <Tag color="blue" style={{ alignSelf: 'flex-start' }}>{card.category}</Tag>
      
      <Title level={4} style={{ margin: 0 }} ellipsis={{ rows: 2 }}>
        {card.name}
      </Title>
      
      <Text type="secondary">
        {card.authorName} {card.authorSurname}
      </Text>
      
      <Text strong style={{ fontSize: 18, color: '#1890ff' }}>
        {card.price.toFixed(2)} zł
      </Text>
    </Space>
  </Card>
);

export default BookCard;