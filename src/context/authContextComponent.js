import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthContextComponent({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const savedUser = localStorage.getItem('user');
    if (token) {
      setIsLoggedIn(true);
    }
    if (!token) {
      setIsLoggedIn(false);
    }
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
