import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null); // Agrega el estado para el nombre de usuario
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUsername = localStorage.getItem('username'); // Obtén el nombre de usuario del almacenamiento local
    if (savedToken) {
      setToken(savedToken);
      setUsername(savedUsername); // Establece el nombre de usuario almacenado
    }
    setLoading(false);
  }, []);

  const login = (newToken, newUserId) => {
    setToken(newToken);
    setUsername(newUserId); // Establece el nombre de usuario al iniciar sesión
    localStorage.setItem('token', newToken);
    localStorage.setItem('userId', newUserId); // Almacena el nombre de usuario en el almacenamiento local
  };

  const logout = () => {
    setToken(null);
    setUsername(null); // Borra el nombre de usuario al cerrar sesión
    localStorage.removeItem('token');
    localStorage.removeItem('username'); // Borra el nombre de usuario del almacenamiento local
  };

  return (
    <AuthContext.Provider value={{ token, username, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
