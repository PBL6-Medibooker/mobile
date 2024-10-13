import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [storedToken, setStoredToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      const token = await AsyncStorage.getItem('userToken');
      setStoredToken(token);
      console.log(token);
      
    };

    fetchToken();
  }, []);

  const updateToken = async (token) => {
    await AsyncStorage.setItem('userToken', token);
    setStoredToken(token);
  };

  const clearToken = async () => {
    await AsyncStorage.removeItem('userToken');
    setStoredToken(null);
  };

  return (
    <AuthContext.Provider value={{ storedToken, updateToken, clearToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
