import React from 'react';
import { Table, Button, Typography, Space, notification, Card, Badge } from 'antd';
import { ShoppingCartOutlined, DeleteOutlined } from '@ant-design/icons';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import MainMenu from '../components/mainmenu';

const { Title, Text } = Typography;

const Cart = () => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    totalItems, 
    totalPrice 
  } = useCart();
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  const columns = [
    {
      title: 'Produkt',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <img 
            src={record.bookImage 
              ? `data:image/jpeg;base64,${record.bookImage}`
              : 'https://via.placeholder.com/50'} 
            alt={text}
            style={{ width: '50px', height: '70px', objectFit: 'cover' }}
          />
          <div>
            <Text strong>{text}</Text>
            <br />
            <Text type="secondary">{record.authorName} {record.authorSurname}</Text>
          </div>
        </div>
      ),
    },
    {
      title: 'Cena',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `${price.toFixed(2)} zł`,
      align: 'right',
    },
    {
      title: 'Ilość',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (quantity, record) => (
        <Space>
          <Button 
            size="small" 
            onClick={() => updateQuantity(record.id, quantity - 1)}
            disabled={quantity <= 1}
          >
            -
          </Button>
          <Text>{quantity}</Text>
          <Button 
            size="small" 
            onClick={() => updateQuantity(record.id, quantity + 1)}
            disabled={quantity >= record.quantity}
          >
            +
          </Button>
        </Space>
      ),
      align: 'center',
    },
    {
      title: 'Razem',
      key: 'total',
      render: (_, record) => `${(record.price * record.quantity).toFixed(2)} zł`,
      align: 'right',
    },
    {
      title: 'Akcje',
      key: 'actions',
      render: (_, record) => (
        <Button 
          type="text" 
          danger 
          icon={<DeleteOutlined />}
          onClick={() => removeFromCart(record.id)}
        />
      ),
      align: 'center',
    },
  ];

  const handleCheckout = () => {
    api.success({
      message: 'Zamówienie złożone!',
      description: `Dziękujemy za zakupy. Łączna kwota: ${totalPrice.toFixed(2)} zł`,
      placement: 'topRight',
    });
    clearCart();
    navigate('/');
  };

  return (
    <div style={{ maxWidth: '2000px', margin: '0 auto' }}>
      {contextHolder}
      <MainMenu isCardComponent={false} />
      
      <Title level={2} style={{ marginBottom: '24px', marginTop: '20px' }}>
        <ShoppingCartOutlined /> Twój koszyk
        {totalItems > 0 && (
          <Badge 
            count={totalItems} 
            style={{ marginLeft: '10px' }} 
          />
        )}
      </Title>
      
      {cartItems.length === 0 ? (
        <Card>
          <Text>Twój koszyk jest pusty</Text>
          <br />
          <Button 
            type="primary" 
            onClick={() => navigate('/')} 
            style={{ marginTop: '16px' }}
          >
            Kontynuuj zakupy
          </Button>
        </Card>
      ) : (
        <>
          <Table
            columns={columns}
            dataSource={cartItems.map(item => ({ ...item, key: item.id }))}
            pagination={false}
            footer={() => (
              <div style={{ textAlign: 'right', paddingRight: '24px' }}>
                <Title level={4}>Suma: {totalPrice.toFixed(2)} zł</Title>
              </div>
            )}
          />
          
          <Space style={{ marginTop: '24px', float: 'right' }}>
            <Button onClick={() => navigate('/')}>
              Kontynuuj zakupy
            </Button>
            <Button danger onClick={clearCart}>
              Wyczyść koszyk
            </Button>
            <Button type="primary" onClick={handleCheckout}>
              Złóż zamówienie
            </Button>
          </Space>
        </>
      )}
    </div>
  );
};

export default Cart;