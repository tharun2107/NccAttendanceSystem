import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(!!localStorage.getItem("token")); // Immediately update state
    };

    // Listen for storage changes (detects login/logout)
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true); // Ensure instant update
    window.dispatchEvent(new Event("storage")); // Force UI update
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false); // Ensure instant update
    window.dispatchEvent(new Event("storage")); // Force UI update
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
