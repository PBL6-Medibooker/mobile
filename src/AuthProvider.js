import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Account_API from "./API/Account_API";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [storedToken, setStoredToken] = useState(null);
  const [accountInfo, setAccountInfo] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      const token = await AsyncStorage.getItem("userToken");
      if (token) {
        setStoredToken(token);
        console.log(token);
        setIsLoggedIn(true);
      }
    };

    fetchToken();
  }, []);

  useEffect(() => {
    const fetchAccountInfo = async () => {
      if (isLoggedIn) {
        try {
          const myEmail = await AsyncStorage.getItem("myEmail");
          if (!myEmail) {
            console.log("No email found in AsyncStorage.");
            return;
          }
          const accountData = await Account_API.get_Account_By_Email(myEmail);
          setAccountInfo(accountData);
        } catch (error) {
          console.error("Failed to fetch account info: ", error);
        }
      }
    };

    fetchAccountInfo();
  }, [isLoggedIn]);

  const login = async (token) => {
    try {
      await AsyncStorage.setItem("userToken", token);
      setStoredToken(token);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Error logging in: ", error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      setStoredToken(null);
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        storedToken,
        login,
        logout,
        isLoggedIn,
        accountInfo,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
