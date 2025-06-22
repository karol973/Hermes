// // import React, { useState } from 'react';
// // import { Input, Button, notification } from 'antd';
// // import { useNavigate } from 'react-router-dom';
// // import MainMenu from './mainmenu';
// // import AccountService from '../services/AccountService';
// // import { useUser } from '../context/userContext';

// // const Login = () => {
// //   const [loginValueL, setLoginValueL] = useState('');
// //   const [passwordValueL, setPasswordValueL] = useState('');
// //   const [loginValue, setLoginValue] = useState('');
// //   const [passwordValue, setPasswordValue] = useState('');
// //   const [content, setContent] = useState('');
// //   const [isWarningOn, setIsWarningOn] = useState(false);

// //   const [api, contextHolder] = notification.useNotification();
// //   const navigate = useNavigate();
// //   const accountService = new AccountService();

// //   const { user, setUser } = useUser(); // UserContext
// //   const isLoggedIn = !!user;

// //   const showWarning = (text) => {
// //     setContent(text);
// //     setIsWarningOn(true);
// //     setTimeout(() => setIsWarningOn(false), 3000);
// //   };

// //   const Warning = () =>
// //     isWarningOn && (
// //       <div style={{
// //         width: '80%',
// //         margin: '0 auto',
// //         backgroundColor: '#ff4d4f',
// //         border: '2px solid #d9363e',
// //         borderRadius: '12px',
// //         padding: '16px',
// //         color: 'white',
// //       }}>
// //         <p>{content}</p>
// //       </div>
// //     );

// //   const handleLogin = async () => {
// //     if (passwordValueL.length < 4 || passwordValueL.length > 20) {
// //       return showWarning("NIEPOPRAWNA ILOŚĆ LITER");
// //     }

// //     try {
// //       const response = await accountService.signInAsync(loginValueL, passwordValueL);

// //       if (response.isSuccess && response.data) {
// //         localStorage.setItem("user", JSON.stringify(response.data));
// //         setUser(response.data);

// //         api.success({
// //           message: 'Sukces',
// //           description: 'Zalogowano pomyślnie!',
// //         });
// //         navigate('/');
// //       } else {
// //         showWarning(response.errorMessage || "Błąd logowania");
// //       }
// //     } catch {
// //       showWarning("Błąd połączenia z serwerem");
// //     }
// //   };

// //   const handleRegister = () => {
// //     if (passwordValue.length < 4 || passwordValue.length > 20) {
// //       return showWarning("NIEPOPRAWNA ILOŚĆ LITER");
// //     }

// //     api.info({
// //       message: 'Rejestracja',
// //       description: 'Logika rejestracji nie jest jeszcze zaimplementowana.',
// //     });
// //   };

// //   const handleLogout = () => {
// //     localStorage.removeItem("user");
// //     setUser(null);
// //     window.location.reload();
// //   };

// //   return (
// //     <div>
// //       {contextHolder}
// //       <MainMenu />

// //       {isLoggedIn ? (
// //         <div style={{ textAlign: 'center', marginTop: '5vh' }}>
// //           <h2>Jesteś zalogowany jako <strong>{user.username}</strong></h2>
// //           <Button type="primary" danger onClick={handleLogout}>
// //             Wyloguj się
// //           </Button>
// //         </div>
// //       ) : (
// //         <>
// //           <div style={{ display: "flex" }}>
// //             <div style={{
// //               width: '35%',
// //               margin: '5vh auto',
// //               display: 'flex',
// //               flexDirection: 'column',
// //               justifyContent: 'center',
// //               alignItems: 'center',
// //             }}>
// //               <h1>Logowanie</h1>
// //               <Input
// //                 placeholder="Login"
// //                 value={loginValueL}
// //                 onChange={(e) => setLoginValueL(e.target.value)}
// //                 style={{ marginBottom: 10 }}
// //               />
// //               <Input.Password
// //                 placeholder="Hasło"
// //                 value={passwordValueL}
// //                 onChange={(e) => setPasswordValueL(e.target.value)}
// //                 style={{ marginBottom: 10 }}
// //               />
// //               <Button type="primary" onClick={handleLogin}>Zaloguj się</Button>
// //             </div>

// //             <div style={{
// //               width: '35%',
// //               margin: '5vh auto',
// //               display: 'flex',
// //               flexDirection: 'column',
// //               justifyContent: 'center',
// //               alignItems: 'center',
// //             }}>
// //               <h1>Rejestracja</h1>
// //               <Input
// //                 placeholder="Login"
// //                 value={loginValue}
// //                 onChange={(e) => setLoginValue(e.target.value)}
// //                 style={{ marginBottom: 10 }}
// //               />
// //               <Input.Password
// //                 placeholder="Hasło"
// //                 value={passwordValue}
// //                 onChange={(e) => setPasswordValue(e.target.value)}
// //                 style={{ marginBottom: 10 }}
// //               />
// //               <Button onClick={handleRegister}>Zarejestruj się</Button>
// //             </div>
// //           </div>
// //           <Warning />
// //         </>
// //       )}
// //     </div>
// //   );
// // };

// // export default Login;


// // import React, { useState, useEffect } from 'react';
// // import { Input, Button, notification, Modal, Form, Select, Switch } from 'antd';
// // import { useNavigate } from 'react-router-dom';
// // import MainMenu from './mainmenu';
// // import AccountService from '../services/AccountService';
// // import UserService from '../services/UserService';
// // import { useUser } from '../context/userContext';
// // import { Role } from '../types/users/Role';

// // const { Option } = Select;

// // const Login = () => {
// //   const [loginValueL, setLoginValueL] = useState('');
// //   const [passwordValueL, setPasswordValueL] = useState('');
// //   const [loginValue, setLoginValue] = useState('');
// //   const [passwordValue, setPasswordValue] = useState('');
// //   const [newPassword, setNewPassword] = useState('');
// //   const [content, setContent] = useState('');
// //   const [isWarningOn, setIsWarningOn] = useState(false);
// //   const [users, setUsers] = useState([]);
// //   const [editUser, setEditUser] = useState(null);

// //   const [api, contextHolder] = notification.useNotification();
// //   const navigate = useNavigate();

// //   const { user, setUser } = useUser();

// //   const isLoggedIn = !!user;
// //   const isAdmin = user && (user.role === Role.Admin || user.role === Role.SuperUser);

// //   const showWarning = (text) => {
// //     setContent(text);
// //     setIsWarningOn(true);
// //     setTimeout(() => setIsWarningOn(false), 3000);
// //   };

// //   const handleLogin = async () => {
// //     if (passwordValueL.length < 4 || passwordValueL.length > 20) {
// //       return showWarning("NIEPOPRAWNA ILOŚĆ LITER");
// //     }
  
// //     try {
// //       const service = new AccountService();
// //       const response = await service.signInAsync(loginValueL, passwordValueL);
  
// //       if (response.isSuccess && response.data?.isSuccess) {
// //         localStorage.setItem("user", JSON.stringify(response.data));
// //         setUser(response.data);
// //         api.success({ message: 'Zalogowano pomyślnie!' });
// //         navigate('/');
// //       } else {
// //         const msg =
// //           response?.data?.isSuccess === false
// //             ? "Nieprawidłowa nazwa użytkownika lub hasło."
// //             : response?.errorMessage || "Błąd logowania. Spróbuj ponownie.";
      
// //         showWarning(msg);
// //       }
        
// //     } catch {
// //       showWarning("Błąd połączenia z serwerem");
// //     }
// //   };

// //   const handleChangePassword = async () => {
// //     console.log("Wywołano zmianę hasła");

// //     if (!user || typeof user.id !== 'number') {
// //       return showWarning("Nie można zmienić hasła – użytkownik nieprawidłowy.");
// //     }
  
// //     if (!newPassword || newPassword.length < 4) {
// //       return showWarning("Hasło musi mieć co najmniej 4 znaki.");
// //     }
  
// //     try {
// //       console.log("Próba zmiany hasła dla ID:", user.id);
// //       const result = await service.changePasswordAsync(user.id, newPassword);
// //       console.log("Odpowiedź z serwisu:", result);
    
// //       api.success({ message: "Hasło zmienione pomyślnie" });
// //       setNewPassword('');
// //     } catch (error) {
// //       console.error("Błąd podczas zmiany hasła:", error);
// //       showWarning("Nie udało się zmienić hasła");
// //     }
// //   };
  

// //   const handleLogout = () => {
// //     localStorage.removeItem("user");
// //     setUser(null);
// //     window.location.reload();
// //   };

// //   const loadUsers = async () => {
// //     try {
// //       const service = new UserService();
// //       const userList = await service.getUsersAsync();
// //       setUsers(userList);
// //     } catch {
// //       showWarning("Błąd ładowania użytkowników");
// //     }
// //   };

// //   const handleUpdateUser = async () => {
// //     console.log("Wywołano edycję użytkownika:", editUser);
    
// //     if (!editUser?.id) {
// //       return showWarning("Nieprawidłowy identyfikator użytkownika");
// //     }
  
// //     try {
// //       const service = new UserService();
// //       await service.updateUserAsync(editUser.id, editUser);
// //       api.success({ message: 'Użytkownik zaktualizowany' });
// //       setEditUser(null);
// //       loadUsers();
// //     } catch (error) {
// //       console.error("Błąd aktualizacji użytkownika:", error);
// //       showWarning("Nie udało się zaktualizować użytkownika");
// //     }
// //   };

// //   useEffect(() => {
// //     if (isAdmin) {
// //       loadUsers();
// //     }
// //   }, [isAdmin]);

// //   return (
// //     <div>
// //       {contextHolder}
// //       <MainMenu />

// //       {isLoggedIn ? (
// //         <div style={{ 
// //           marginTop: '3rem', 
// //           padding: '2rem', 
// //           backgroundColor: '#f0f2f5', 
// //           borderRadius: '8px', 
// //           boxShadow: '0 2px 8px rgba(0,0,0,0.1)' 
// //         }}>
// //           <h2>Witaj, <strong>{user.username}</strong></h2>
// //           <Button type="primary" danger onClick={handleLogout}>Wyloguj się</Button>

// //           <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>🔐 Zmień hasło</h3>          
// //           <Input.Password
// //             placeholder="Nowe hasło"
// //             value={newPassword}
// //             onChange={(e) => setNewPassword(e.target.value)}
// //             style={{ marginBottom: 10, maxWidth: 400 }}
// //           />         
// //           <Button type="primary" onClick={handleChangePassword}>Zmień hasło</Button>

         
// //           {isAdmin && (
// //   <div style={{ marginTop: '3rem', padding: '2rem', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
// //     <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>👥 Lista użytkowników</h3>
// //     {users.map((u) => (
// //       <div
// //         key={u.id}
// //         style={{
// //           marginBottom: '1rem',
// //           padding: '1rem',
// //           backgroundColor: '#fff',
// //           border: '1px solid #d9d9d9',
// //           borderRadius: '6px',
// //           boxShadow: '0 1px 4px rgba(0, 0, 0, 0.05)',
// //         }}
// //       >
// //         <p style={{ marginBottom: '0.5rem' }}>
// //           <strong>Nazwa użytkownika:</strong> {u.username}<br />
// //           <strong>Rola:</strong> {Role[u.role]}
// //         </p>
// //         <Button type="primary" onClick={() => setEditUser({ ...u })}>
// //           Edytuj
// //         </Button>
// //       </div>
// //     ))}
// //   </div>
// // )}

// //           <Modal
// //             open={!!editUser}
// //             onCancel={() => setEditUser(null)}
// //             onOk={handleUpdateUser}
// //             title="Edycja użytkownika"
// //           >
// //             {editUser && (
// //               <Form layout="vertical">
// //                 <Form.Item label="Nazwa użytkownika">
// //                   <Input
// //                     value={editUser.username}
// //                     onChange={(e) => setEditUser({ ...editUser, username: e.target.value })}
// //                   />
// //                 </Form.Item>
// //                 <Form.Item label="Rola">
// //                   <Select
// //                     value={editUser.role}
// //                     onChange={(val) => setEditUser({ ...editUser, role: val })}
// //                   >
// //                     <Option value={1}>Admin</Option>
// //                     <Option value={2}>SuperUser</Option>
// //                     <Option value={3}>User</Option>
// //                   </Select>
// //                 </Form.Item>
// //                 <Form.Item label="Aktywny">
// //                   <Switch
// //                     checked={editUser.isActive}
// //                     onChange={(val) => setEditUser({ ...editUser, isActive: val })}
// //                   />
// //                 </Form.Item>
// //               </Form>
// //             )}
// //           </Modal>
// //         </div>
// //       ) : (
// //         <div style={{ display: 'flex', justifyContent: 'center', gap: '5rem', marginTop: '5rem' }}>
// //           <div>
// //             <h1>Logowanie</h1>
// //             <Input placeholder="Login" value={loginValueL} onChange={(e) => setLoginValueL(e.target.value)} style={{ marginBottom: 10 }} />
// //             <Input.Password placeholder="Hasło" value={passwordValueL} onChange={(e) => setPasswordValueL(e.target.value)} style={{ marginBottom: 10 }} />
// //             <Button type="primary" onClick={handleLogin}>Zaloguj się</Button>
// //           </div>

// //           <div>
// //             <h1>Rejestracja</h1>
// //             <Input placeholder="Login" value={loginValue} onChange={(e) => setLoginValue(e.target.value)} style={{ marginBottom: 10 }} />
// //             <Input.Password placeholder="Hasło" value={passwordValue} onChange={(e) => setPasswordValue(e.target.value)} style={{ marginBottom: 10 }} />
// //             <Button disabled>Rejestracja niezaimplementowana</Button>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Login;

// import React, { useState, useEffect } from 'react';
// import { Input, Button, notification, Modal, Form, Select, Switch } from 'antd';
// import { useNavigate } from 'react-router-dom';
// import MainMenu from './mainmenu';
// import AccountService from '../services/AccountService';
// import UserService from '../services/UserService';
// import { useUser } from '../context/userContext';
// import { Role } from '../types/users/Role';

// const { Option } = Select;

// const Login = () => {
//   const [loginValueL, setLoginValueL] = useState('');
//   const [passwordValueL, setPasswordValueL] = useState('');
//   const [loginValue, setLoginValue] = useState('');
//   const [passwordValue, setPasswordValue] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [content, setContent] = useState('');
//   const [isWarningOn, setIsWarningOn] = useState(false);
//   const [users, setUsers] = useState([]);
//   const [editUser, setEditUser] = useState(null);

//   const [api, contextHolder] = notification.useNotification();
//   const navigate = useNavigate();

//   const { user, setUser } = useUser();

//   const isLoggedIn = !!user;
//   const isAdmin = user && (user.role === Role.Admin || user.role === Role.SuperUser);

//   const showWarning = (text) => {
//     setContent(text);
//     setIsWarningOn(true);
//     setTimeout(() => setIsWarningOn(false), 3000);
//   };

//   const Warning = () =>
//     isWarningOn && (
//       <div style={{
//         width: '80%',
//         margin: '1rem auto',
//         backgroundColor: '#ff4d4f',
//         border: '2px solid #d9363e',
//         borderRadius: '12px',
//         padding: '16px',
//         color: 'white',
//         textAlign: 'center'
//       }}>
//         <p>{content}</p>
//       </div>
//     );

//     const handleLogin = async () => {   
//       try {
//         const service = new AccountService();
//         const response = await service.signInAsync(loginValueL, passwordValueL);
    
//         if (response.isSuccess && response.data?.isSuccess) {
//           localStorage.setItem("user", JSON.stringify(response.data));
//           setUser(response.data);
    
//           api.success({
//             message: 'Zalogowano',
//             description: `Zalogowano jako ${response.data.username || loginValueL}`,
//             placement: 'topRight',
//           });
    
//           navigate('/');
//         } else {
//           const msg =
//             response?.data?.isSuccess === false
//               ? "Nieprawidłowa nazwa użytkownika lub hasło."
//               : response?.errorMessage || "Błąd logowania. Spróbuj ponownie.";
    
//           showWarning(msg);
//         }
//       } catch (error) {
//         showWarning("Błąd połączenia z serwerem");
//       }
//     };
    
//     const handleChangePassword = async () => {


//     if (!user || typeof user.id !== "number") {
//        return showWarning("Nie można zmienić hasła – zaloguj się ponownie.");
//     }
    
//       if (!newPassword || newPassword.length < 4) {
//         console.log("3. Nieprawidłowe hasło");
//         return showWarning("Hasło musi mieć minimum 4 znaki");
//       }  
//       try {    
//         const accountService = new AccountService();
//         const result = await accountService.changePasswordAsync(user.id, newPassword);
                
//         if (result?.isSuccess) {
//           api.success({ message: 'Hasło zmienione' });
//           setNewPassword('');
//         } else {
//           showWarning(result?.message || "Nie udało się zmienić hasła");
//         }
//       } catch (error) {
//         showWarning("Błąd połączenia z serwerem");
//       }
//     };
    
//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     setUser(null);
//     window.location.reload();
//   };

//   const loadUsers = async () => {
//     try {
//       const service = new UserService();
//       const userList = await service.getUsersAsync();
//       setUsers(userList);
//     } catch {
//       showWarning("Błąd ładowania użytkowników");
//     }
//   };

//   const handleUpdateUser = async () => {
//     console.log("Wywołano edycję użytkownika:", editUser);

//     if (!editUser?.id) {
//       return showWarning("Nieprawidłowy identyfikator użytkownika");
//     }

//     try {
//       const service = new UserService();
//       await service.updateUserAsync(editUser.id, editUser);
//       api.success({ message: 'Użytkownik zaktualizowany' });
//       setEditUser(null);
//       loadUsers();
//     } catch (error) {
//       showWarning("Nie udało się zaktualizować użytkownika");
//     }
//   };

//   useEffect(() => {
//     if (isAdmin) {
//       loadUsers();
//     }
//   }, [isAdmin]);

//   return (
//     <div>
//       {contextHolder}
//       {Warning()}
//       <MainMenu />

//       {isLoggedIn ? (
//         <div style={{ marginTop: '3rem', padding: '2rem', backgroundColor: '#f0f2f5', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
//           <h2>Witaj, <strong>{user.username}</strong></h2>
//           <Button type="primary" danger onClick={handleLogout}>Wyloguj się</Button>

//           <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>🔐 Zmień hasło</h3>
//           <Input.Password placeholder="Nowe hasło" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} style={{ marginBottom: 10, maxWidth: 400 }} />
//           <Button type="primary" onClick={handleChangePassword}>Zmień hasło</Button>

//           {isAdmin && (
//             <div style={{ marginTop: '3rem', padding: '2rem', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
//               <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>👥 Lista użytkowników</h3>
//               {users.map((u) => (
//                 <div key={u.id} style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: '#fff', border: '1px solid #d9d9d9', borderRadius: '6px', boxShadow: '0 1px 4px rgba(0, 0, 0, 0.05)' }}>
//                   <p style={{ marginBottom: '0.5rem' }}>
//                     <strong>Nazwa użytkownika:</strong> {u.username}<br />
//                     <strong>Rola:</strong> {Role[u.role]}
//                   </p>
//                   <Button type="primary" onClick={() => setEditUser({ ...u })}>Edytuj</Button>
//                 </div>
//               ))}
//             </div>
//           )}

//           <Modal open={!!editUser} onCancel={() => setEditUser(null)} onOk={handleUpdateUser} title="Edycja użytkownika">
//             {editUser && (
//               <Form layout="vertical">
//                 <Form.Item label="Nazwa użytkownika">
//                   <Input value={editUser.username} onChange={(e) => setEditUser({ ...editUser, username: e.target.value })} />
//                 </Form.Item>
//                 <Form.Item label="Rola">
//                   <Select value={editUser.role} onChange={(val) => setEditUser({ ...editUser, role: val })}>
//                     <Option value={1}>User</Option>
//                     <Option value={2}>SuperUser</Option>
//                     <Option value={3}>Admin</Option>
//                   </Select>
//                 </Form.Item>
//                 <Form.Item label="Aktywny">
//                   <Switch checked={editUser.isActive} onChange={(val) => setEditUser({ ...editUser, isActive: val })} />
//                 </Form.Item>
//               </Form>
//             )}
//           </Modal>
//         </div>
//       ) : (
//         <div style={{ display: 'flex', justifyContent: 'center', gap: '5rem', marginTop: '5rem' }}>
//           <div>
//             <h1>Logowanie</h1>
//             <Input placeholder="Login" value={loginValueL} onChange={(e) => setLoginValueL(e.target.value)} style={{ marginBottom: 10 }} />
//             <Input.Password placeholder="Hasło" value={passwordValueL} onChange={(e) => setPasswordValueL(e.target.value)} style={{ marginBottom: 10 }} />
//             <Button type="primary" onClick={handleLogin}>Zaloguj się</Button>
//           </div>

//           <div>
//             <h1>Rejestracja</h1>
//             <Input placeholder="Login" value={loginValue} onChange={(e) => setLoginValue(e.target.value)} style={{ marginBottom: 10 }} />
//             <Input.Password placeholder="Hasło" value={passwordValue} onChange={(e) => setPasswordValue(e.target.value)} style={{ marginBottom: 10 }} />
//             <Button disabled>Rejestracja niezaimplementowana</Button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Login;

import React, { useState, useEffect } from 'react';
import { Input, Button, notification, Modal, Form, Select, Switch } from 'antd';
import { useNavigate } from 'react-router-dom';
import MainMenu from './mainmenu';
import AccountService from '../services/AccountService';
import UserService from '../services/UserService';
import { useUser } from '../context/userContext';
import { Role } from '../types/users/Role';

const { Option } = Select;

const Login = () => {
  const [loginValueL, setLoginValueL] = useState('');
  const [passwordValueL, setPasswordValueL] = useState('');
  const [loginValue, setLoginValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);

  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  const isLoggedIn = !!user;
  const isAdmin = user && (user.role === Role.Admin || user.role === Role.SuperUser);

  const showWarning = (text) => {
    api.error({
      message: 'Błąd',
      description: text,
      placement: 'topRight',
    });
  };

  const handleRegister = async () => {
  if (!loginValue || !passwordValue) {
    return showWarning("Login i hasło są wymagane");
  }

  if (passwordValue.length < 4 || passwordValue.length > 20) {
    return showWarning("Hasło musi mieć od 4 do 20 znaków");
  }

  try {
    const service = new UserService();
    const newUser = {
       
      username: loginValue,
      passwordHash: passwordValue,
      isActive: true,
      role: Role.User, 
    };

    const createdUser = await service.createUserAsync(newUser);

    api.success({
      message: 'Zarejestrowano użytkownika',
      description: `Użytkownik ${createdUser.username} został utworzony.`,
      placement: 'topRight',
    });

    setLoginValue('');
    setPasswordValue('');
  } catch (error) {
    showWarning("Nie udało się zarejestrować użytkownika");
  }
};

  const handleLogin = async () => {
    try {
      const service = new AccountService();
      const response = await service.signInAsync(loginValueL, passwordValueL);

      if (response.isSuccess && response.data?.isSuccess) {
        localStorage.setItem("user", JSON.stringify(response.data));
        setUser(response.data);

        api.success({
          message: 'Zalogowano',
          description: `Zalogowano jako ${response.data.username || loginValueL}`,
          placement: 'topRight',
        });

        navigate('/');
      } else {
        const msg = response?.data?.isSuccess === false
          ? "Nieprawidłowa nazwa użytkownika lub hasło."
          : response?.errorMessage || "Błąd logowania. Spróbuj ponownie.";
        showWarning(msg);
      }
    } catch {
      showWarning("Błąd połączenia z serwerem");
    }
  };

  const handleChangePassword = async () => {
    if (!user || typeof user.id !== "number") {
      return showWarning("Nie można zmienić hasła – zaloguj się ponownie.");
    }

    if (!newPassword || newPassword.length < 4) {
      return showWarning("Hasło musi mieć minimum 4 znaki");
    }

    try {
      const accountService = new AccountService();
      await accountService.changePasswordAsync(user.id, newPassword);

      api.success({ message: 'Hasło zmienione pomyślnie', placement: 'topRight' });
      setNewPassword('');
    } catch {
      showWarning("Nie udało się zmienić hasła");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.reload();
  };

  const loadUsers = async () => {
    try {
      const service = new UserService();
      const userList = await service.getUsersAsync();
      setUsers(userList);
    } catch {
      showWarning("Błąd ładowania użytkowników");
    }
  };

  const handleUpdateUser = async () => {
    if (!editUser?.id) {
      return showWarning("Nieprawidłowy identyfikator użytkownika");
    }

    try {
      const service = new UserService();
      await service.updateUserAsync(editUser.id, editUser);
      api.success({ message: 'Dane użytkownika zostały zapisane', placement: 'topRight' });
      setEditUser(null);
      loadUsers();
    } catch {
      showWarning("Nie udało się zaktualizować użytkownika");
    }
  };

  useEffect(() => {
    if (isAdmin) {
      loadUsers();
    }
  }, [isAdmin]);

  return (
    <div>
      {contextHolder}
      <MainMenu />

      {isLoggedIn ? (
        <div style={{ marginTop: '3rem', padding: '2rem', backgroundColor: '#f0f2f5', borderRadius: '8px' }}>
          <h2>Witaj, <strong>{user.username}</strong></h2>
          <Button type="primary" danger onClick={handleLogout}>Wyloguj się</Button>

          <h3 style={{ marginTop: '2rem' }}>🔐 Zmień hasło</h3>
          <Input.Password
            placeholder="Nowe hasło"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={{ maxWidth: 400, marginBottom: 10 }}
          />
          <Button type="primary" onClick={handleChangePassword}>Zmień hasło</Button>

          {isAdmin && (
            <div style={{ marginTop: '3rem' }}>
              <h3>👥 Lista użytkowników</h3>
              {users.map((u) => (
                <div
                  key={u.id}
                  style={{
                    marginBottom: '1rem',
                    padding: '1rem',
                    backgroundColor: u.isActive ? '#fff' : '#f5f5f5',
                    border: '1px solid #d9d9d9',
                    borderRadius: '6px',
                    opacity: u.isActive ? 1 : 0.6,
                  }}
                >
                  <p>
                    <strong>Nazwa użytkownika:</strong> {u.username} {u.isActive ? '' : <span style={{ color: 'gray' }}> (INACTIVE)</span>}<br />
                    <strong>Rola:</strong> {Role[u.role]}
                  </p>
                  <Button type="primary" onClick={() => setEditUser({ ...u })}>Edytuj</Button>
                </div>
              ))}
            </div>
          )}

          <Modal
            open={!!editUser}
            onCancel={() => setEditUser(null)}
            onOk={handleUpdateUser}
            title="Edycja użytkownika"
          >
            {editUser && (
              <Form layout="vertical">
                <Form.Item label="Nazwa użytkownika">
                  <Input
                    value={editUser.username}
                    onChange={(e) => setEditUser({ ...editUser, username: e.target.value })}
                  />
                </Form.Item>
                <Form.Item label="Rola">
                  <Select
                    value={editUser.role}
                    onChange={(val) => setEditUser({ ...editUser, role: val })}
                  >
                    <Option value={1}>User</Option>
                    <Option value={2}>SuperUser</Option>
                    <Option value={3}>Admin</Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Aktywny">
                  <Switch
                    checked={editUser.isActive}
                    onChange={(val) => setEditUser({ ...editUser, isActive: val })}
                  />
                </Form.Item>
              </Form>
            )}
          </Modal>
        </div>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '5rem', marginTop: '5rem' }}>
          <div>
            <h1>Logowanie</h1>
            <Input placeholder="Login" value={loginValueL} onChange={(e) => setLoginValueL(e.target.value)} style={{ marginBottom: 10 }} />
            <Input.Password placeholder="Hasło" value={passwordValueL} onChange={(e) => setPasswordValueL(e.target.value)} style={{ marginBottom: 10 }} />
            <Button type="primary" onClick={handleLogin}>Zaloguj się</Button>
          </div>

          <div>
            <h1>Rejestracja</h1>
            <Input placeholder="Login" value={loginValue} onChange={(e) => setLoginValue(e.target.value)} style={{ marginBottom: 10 }} />
            <Input.Password placeholder="Hasło" value={passwordValue} onChange={(e) => setPasswordValue(e.target.value)} style={{ marginBottom: 10 }} />
            <Button type="primary" onClick={handleRegister}>Zarejestruj się</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
