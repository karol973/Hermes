import React, { useState, useEffect } from 'react';
import { Input, Button, notification, Modal, Form, Select, Switch } from 'antd';
import { useNavigate } from 'react-router-dom';
import MainMenu from './mainmenu';
import AccountService from '../services/AccountService';
import UserService from '../services/UserService';
import { useUser } from '../context/userContext';
import { Role } from '../types/users/Role';

const { Option } = Select;
const SESSION_DURATION = 2 * 60 * 60 * 1000; // ustawienie sesji na 2 h

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

  // sprawdzenie sesjji
  useEffect(() => {
    const checkSession = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          
          if (parsedUser.expires && parsedUser.expires > Date.now()) {
            setUser(parsedUser);
          } else {
            localStorage.removeItem("user");
            api.warning({
              message: 'Sesja wygasła',
              description: 'Zaloguj się ponownie',
              placement: 'topRight'
            });
          }
        } catch (error) {
          localStorage.removeItem("user");
        }
      }
    };

    checkSession();
    const interval = setInterval(checkSession, 60000); // sprawdzenie co minute-sesja
    return () => clearInterval(interval);
  }, [setUser, api]);

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
        const userData = {
          ...response.data,
          expires: Date.now() + SESSION_DURATION // jak jest komunikacja z api to wydłużamy sesje dodając do aktualnej godziny czas sesji ustawiony wyżej
        };
        
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);

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

      // aktualizacja sesji po zmianie hasła
      const updatedUser = {
        ...user,
        expires: Date.now() + SESSION_DURATION
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);

      api.success({ 
        message: 'Hasło zmienione pomyślnie', 
        placement: 'topRight' 
      });
      setNewPassword('');
    } catch {
      showWarning("Nie udało się zmienić hasła");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate('/login');
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

      if (user && user.id === editUser.id) {
        const updatedUser = {
          ...user,
          username: editUser.username,
          role: editUser.role,
          expires: Date.now() + SESSION_DURATION
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
      }

      api.success({ 
        message: 'Dane uzytkowanika zostały zapisane.', 
        placement: 'topRight' 
      });
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
          <p style={{ color: '#666', marginBottom: '1rem' }}>
            Sesja wygaśnie: {new Date(user.expires).toLocaleTimeString()}
          </p>
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
                    <Option value={Role.User}>User</Option>
                    <Option value={Role.SuperUser}>SuperUser</Option>
                    <Option value={Role.Admin}>Admin</Option>
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