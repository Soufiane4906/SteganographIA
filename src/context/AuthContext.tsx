import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

interface User {
  id: string;
  username: string;
  email: string;
  profile_picture: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const register = async (username: string, email: string, password: string) => {
    await axios.post('http://localhost:5000/register', { username, email, password });
  };

  const login = async (username: string, password: string) => {
    const response = await axios.post('http://localhost:5000/login', { username, password });
    setUser(response.data.user);
  };

  const logout = async () => {
    await axios.post('http://localhost:5000/logout');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
