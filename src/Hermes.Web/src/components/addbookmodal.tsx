// import React, { useState } from 'react';
// import { Button, Modal, Form } from 'antd';
// import BookDetailsForm from './bookdetailsform';
// import UserDto from '../types/users/UserDto';
// import { Role } from '../types/users/Role';

// interface Props {
//   user: UserDto | null;
//   onBookAdded: () => void;
// }

// const AddBookModal: React.FC<Props> = ({ user, onBookAdded }) => {
//   const [form] = Form.useForm();
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const isPrivileged = user && (user.role === Role.Admin || user.role === Role.SuperUser);

//   const showModal = () => setIsModalOpen(true);
//   const handleCancel = () => setIsModalOpen(false);
//   const handleBookAdded = () => {
//     setIsModalOpen(false);
//     setTimeout(() => onBookAdded?.(), 300);
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
