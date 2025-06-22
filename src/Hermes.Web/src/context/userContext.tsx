import React, { createContext, useContext, useState } from 'react';
import UserDto from '../types/users/UserDto';

type UserContextType = {
  user: UserDto | null;
  setUser: (user: UserDto | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserDto | null>(null);
  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used with UserProvider");
  return context;
};
