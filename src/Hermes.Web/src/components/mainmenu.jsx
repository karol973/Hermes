// import React, { useState } from 'react';
// import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
// import { Menu } from 'antd';
// import baner from '../mainbaner.png';
// import logo from '../logo.svg';
// import { useNavigate } from 'react-router-dom';

 
// const items = [
//   {
//     label: 'Strona główna',
//     key: 'mail',
//   },

//   {
//     label: 'Katalog',
//     key: 'SubMenu',
//     // DODAC IKONE ROZWINIECIA
//     children: [
//       {
//         type: 'group',
//         children: [
//           { label: 'Option 1', key: 'setting:1' },
//           { label: 'Option 2', key: 'setting:2' },
//         ],
//       },


//     ],
//   },
//   {
//     label: 'Kontakt',
//     key: 'kontakt',

//   },
//   {
//     label: 'Konto',
//     key: 'konto',
//   },
//   {
//     label: 'Koszyk',
//     key: 'koszyk',
//   }
// ];

// const MainMenu = ({ isCardComponent }) => {
//   const [current, setCurrent] = useState('mail');
//   const navigate = useNavigate();

//   const onClick = e => {
//     setCurrent(e.key);

//     if (e.key === "konto") {
//       navigate("/login");
//     }

//     if (e.key === "kontakt") {
//       navigate("/contact");
//     }

//     if (e.key === "MainPage") {
//       navigate("/");
//     }

//     if (e.key === "news") {
//       navigate("/news");
//     }
//   };
//   return (
//     <div>
//       <h1 style={{
//         textAlign: 'left',
//         fontSize: '15px',
//         fontWeight: 'bold',
//         margin: '6px 0',
//         color: '#333',
//         padding: '0',
//       }}>
//         Antykwariat
//       </h1>
  
//       {isCardComponent==false && (
//         <Menu
//           onClick={onClick}
//           selectedKeys={[current]}
//           mode="horizontal"
//           items={items}
//           style={{
//             margin: '8px',
//             backgroundColor: 'transparent',
//             border: 'none',
//             color: '#424756',
//           }}
//         />
//       )}
  
//       <div>
//         <header className="header">
//           <div className="banner-container">
//             <img src={baner} alt="Baner Antykwariat" className="banner-image" />
//             <img src={logo} alt="Logo Antykwariat" className="logo-on-banner" />
//           </div>
//         </header>
//       </div>
//     </div>
//   );
// };

// export default MainMenu;
import React, { useState } from 'react';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import baner from '../mainbaner.png';
import logo from '../logo.svg';

const items = [
  {
    label: 'Strona główna',
    key: 'MainPage',
  },
  {
    label: 'Katalog',
    key: 'SubMenu',
    children: [
      {
        type: 'group',
        children: [
          { label: 'Option 1', key: 'setting:1' },
          { label: 'Option 2', key: 'setting:2' },
        ],
      },
    ],
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
    label: 'Koszyk',
    key: 'koszyk',
  },
  {
    label: 'Aktualności',
    key: 'news',
  },
];

const MainMenu = ({ isCardComponent }) => {
  const [current, setCurrent] = useState('MainPage');
  const navigate = useNavigate();

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
        break;
    }
  };

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
