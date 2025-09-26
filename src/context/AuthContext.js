// src/context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const getStoredAuth = () => {
  const data = localStorage.getItem('authData');
  return data
    ? JSON.parse(data)
    : { isAuthenticated: false, role: null, user: null, token: null };
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(getStoredAuth());

  const login = (role, user, token) => {
    const authData = { isAuthenticated: true, role, user, token };
    localStorage.setItem('authData', JSON.stringify(authData));
    setAuth(authData);
  };

  const logout = () => {
    localStorage.removeItem('authData');
    setAuth({ isAuthenticated: false, role: null, user: null, token: null });
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
