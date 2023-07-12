import React, { createContext, useEffect, useState } from 'react';
import { isTokenValid } from '../api/apiService'

export const AuthContext = createContext(null);

export default function AuthContextComponent({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      isTokenValid()
        .then((response) => setIsLoggedIn(response.valid))
        .catch((error) => {
          console.error('Token validation failed:', error);
          setIsLoggedIn(false);
        });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}