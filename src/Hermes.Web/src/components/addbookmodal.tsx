// // // import React, { useState } from 'react';
// // // import { Button, Modal, Form, Input } from 'antd';
// // // import BookDetailsForm from './bookdetailsform';
// // // import UserDto from '../types/users/UserDto';
// // // import { Role } from '../types/users/Role';

// // // const { TextArea } = Input;

// // // interface Props {
// // //   user: UserDto;
// // //   onBookAdded: () => void;  
// // // }

// // // const AddBookModal: React.FC<Props> = ({ user, onBookAdded }) => {
// // //   const [form] = Form.useForm();
// // //   const [isModalOpen, setIsModalOpen] = useState(false);

// // //   const isPrivileged = user.role === Role.Admin || user.role === Role.SuperUser;

// // //   const showModal = () => setIsModalOpen(true);
// // //   const handleCancel = () => setIsModalOpen(false);
// // //   const handleBookAdded = () => {
// // //     setIsModalOpen(false);      
// // //     onBookAdded?.();            
// // //   };

// // //   return (
// // //     <>
// // //       {isPrivileged && (
// // //         <Button
// // //           type="primary"
// // //           className="Button-primary button-add-position"
// // //           onClick={showModal}
// // //         >
// // //           Dodaj nową pozycję
// // //         </Button>
// // //       )}

// // //       <Modal
// // //         title="Dodawanie książki"
// // //         closable={{ 'aria-label': 'Custom Close Button' }}
// // //         open={isModalOpen}
// // //         onCancel={handleCancel}
// // //         footer={null}
// // //         destroyOnClose  
// // //       >
// // //         <BookDetailsForm onBookAdded={handleBookAdded} />
// // //       </Modal>
// // //     </>
// // //   );
// // // };

// // // export default AddBookModal;

// // import React, { useState } from 'react';
// // import { Button, Modal, Form, Input } from 'antd';
// // import BookDetailsForm from './bookdetailsform';
// // import UserDto from '../types/users/UserDto';
// // import { Role } from '../types/users/Role';

// // const { TextArea } = Input;

// // interface Props {
// //   user: UserDto;
// //   onBookAdded: () => void;
// // }

// // const AddBookModal: React.FC<Props> = ({ user, onBookAdded }) => {
// //   const [form] = Form.useForm();
// //   const [isModalOpen, setIsModalOpen] = useState(false);

// //   const isPrivileged = user.role === Role.Admin || user.role === Role.SuperUser;

// //   const showModal = () => setIsModalOpen(true);
// //   const handleCancel = () => setIsModalOpen(false);

// //   const handleBookAdded = () => {
// //     setIsModalOpen(false);
// //     onBookAdded?.();
// //     window.location.reload();  
// //   };

// //   return (
// //     <>
// //       {isPrivileged && (
// //         <Button
// //           type="primary"
// //           className="Button-primary button-add-position"
// //           onClick={showModal}
// //         >
// //           Dodaj nową pozycję
// //         </Button>
// //       )}

// //       <Modal
// //         title="Dodawanie książki"
// //         closable={{ 'aria-label': 'Custom Close Button' }}
// //         open={isModalOpen}
// //         onCancel={handleCancel}
// //         footer={null}
// //         destroyOnClose
// //       >
// //         <BookDetailsForm onSuccessClose={handleBookAdded} />
// //       </Modal>
// //     </>
// //   );
// // };

// // export default AddBookModal;


// import React, { useState } from 'react';
// import { Button, Modal, Form } from 'antd';
// import BookDetailsForm from './bookdetailsform';
// import UserDto from '../types/users/UserDto';
// import { Role } from '../types/users/Role';

// interface Props {
//   user: UserDto;
// }

// const AddBookModal: React.FC<Props> = ({ user }) => {
//   const [form] = Form.useForm();
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const isPrivileged = user.role === Role.Admin || user.role === Role.SuperUser;

//   const showModal = () => setIsModalOpen(true);
//   const handleCancel = () => setIsModalOpen(false);

//   const handleBookAdded = () => {
//     setIsModalOpen(false);           // zamknij modal
//     window.location.reload();        // odśwież stronę
//   };

//   return (
//     <>
//       {isPrivileged && (
//         <Button
//           type="primary"
//           className="Button-primary button-add-position"
//           onClick={showModal}
//         >
//           Dodaj nową pozycję
//         </Button>
//       )}

//       <Modal
//         title="Dodawanie książki"
//         open={isModalOpen}
//         onCancel={handleCancel}
//         footer={null}
//         destroyOnClose
//       >
//         <BookDetailsForm onSuccessClose={handleBookAdded} />
//       </Modal>
//     </>
//   );
// };

// export default AddBookModal;

// import React, { useState } from 'react';
// import { Button, Modal, Form } from 'antd';
// import BookDetailsForm from './bookdetailsform';
// import UserDto from '../types/users/UserDto';
// import { Role } from '../types/users/Role';

// interface Props {
//   user: UserDto;
//   onBookAdded: () => void; // ⬅️ to z HomeView.loadAllBooks
// }

// const AddBookModal: React.FC<Props> = ({ user, onBookAdded }) => {
//   const [form] = Form.useForm();
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const isPrivileged = user.role === Role.Admin || user.role === Role.SuperUser;

//   const showModal = () => setIsModalOpen(true);
//   const handleCancel = () => setIsModalOpen(false);

//   const handleBookAdded = () => {
//     setIsModalOpen(false);
//     setTimeout(() => {
//       onBookAdded?.(); 
//     }, 300); 
//   };

//   return (
//     <>
//       {isPrivileged && (
//         <Button
//           type="primary"
//           className="Button-primary button-add-position"
//           onClick={showModal}
//         >
//           Dodaj nową pozycję
//         </Button>
//       )}

//       <Modal
//         title="Dodawanie książki"
//         open={isModalOpen}
//         onCancel={handleCancel}
//         footer={null}
//         destroyOnClose
//       >
//         <BookDetailsForm onSuccessClose={handleBookAdded} />
//       </Modal>
//     </>
//   );
// };

// export default AddBookModal;


// import React, { useState } from 'react';
// import { Button, Modal, Form } from 'antd';
// import BookDetailsForm from './bookdetailsform';
// import UserDto from '../types/users/UserDto';
// import { Role } from '../types/users/Role';

// interface Props {
//   user?: UserDto | null; 
//   onBookAdded: () => void;
// }

// const AddBookModal: React.FC<Props> = ({ user, onBookAdded }) => {
//   const [form] = Form.useForm();
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const isPrivileged =
//     user !== null &&
//     user !== undefined &&
//     (user.role === Role.Admin || user.role === Role.SuperUser);

//   const showModal = () => setIsModalOpen(true);
//   const handleCancel = () => setIsModalOpen(false);

//   const handleBookAdded = () => {
//     setIsModalOpen(false);
//     setTimeout(() => {
//       onBookAdded?.();
//     }, 300);
//   };

//   return (
//     <>
//       {isPrivileged && (
//         <Button
//           type="primary"
//           className="Button-primary button-add-position"
//           onClick={showModal}
//         >
//           Dodaj nową pozycję
//         </Button>
//       )}

//       <Modal
//         title="Dodawanie książki"
//         open={isModalOpen}
//         onCancel={handleCancel}
//         footer={null}
//         destroyOnClose
//       >
//         <BookDetailsForm onSuccessClose={handleBookAdded} />
//       </Modal>
//     </>
//   );
// };

// export default AddBookModal;

import React, { useState } from 'react';
import { Button, Modal, Form } from 'antd';
import BookDetailsForm from './bookdetailsform';
import UserDto from '../types/users/UserDto';
import { Role } from '../types/users/Role';

interface Props {
  user: UserDto | null;
  onBookAdded: () => void;
}

const AddBookModal: React.FC<Props> = ({ user, onBookAdded }) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isPrivileged = user && (user.role === Role.Admin || user.role === Role.SuperUser);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);
  const handleBookAdded = () => {
    setIsModalOpen(false);
    setTimeout(() => onBookAdded?.(), 300);
  };

  return (
    <>
      {isPrivileged && (
        <Button
          type="primary"
          className="Button-primary button-add-position"
          onClick={showModal}
        >
          Dodaj nową pozycję
        </Button>
      )}
      <Modal
        title="Dodawanie książki"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
      >
        <BookDetailsForm onSuccessClose={handleBookAdded} />
      </Modal>
    </>
  );
};

export default AddBookModal;
