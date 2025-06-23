import React, { createContext, useContext, useState, useEffect } from 'react';
import UserDto from '../types/users/UserDto';
import { Role } from '../types/users/Role'; 

type UserContextType = {
  user: UserDto | null;
  setUser: (user: UserDto | null) => void;
  isAdmin: boolean;
  isSuperUser: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserDto | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser) as UserDto;
        setUser(parsedUser);
      } catch (error) {
        localStorage.removeItem('user');
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const isAdmin = user?.role === Role.Admin;
  const isSuperUser = user?.role === Role.SuperUser;

  return (
    <UserContext.Provider value={{ user, setUser, isAdmin, isSuperUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used with UserProvider");
  return context;
};