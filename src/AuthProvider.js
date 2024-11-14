import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Account_API from "./API/Account_API";
import client from "./API/client";
import { tr } from "date-fns/locale";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [storedToken, setStoredToken] = useState(null);
  const [accountInfo, setAccountInfo] = useState(null);
  const [loginPending, setLoginPending] = useState(false); //loading

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
          // console.log("acc login: ", accountData);
          setAccountInfo(accountData);
        } catch (error) {
          console.error("Failed to fetch account info: ", error);
        }
      } else setAccountInfo(null);
    };

    fetchAccountInfo();
  }, [isLoggedIn]);

  // const fetchUser = async () => {
  //   setLoginPending(true);
  //   const token = await AsyncStorage.getItem("userToken");
  //   if (token !== null) {
  //     const res = await client.get("acc/get-acc", {
  //       headers: {
  //         Authorization: `JWT ${token}`,
  //       },
  //     });

  //     if (res.data) {
  //       setAccountInfo(res.data);
  //       setIsLoggedIn(true);
  //     } else {
  //       setAccountInfo(null);
  //       setIsLoggedIn(false);
  //     }
  //     setLoginPending(false);
  //   } else {
  //     setAccountInfo(null);
  //     setIsLoggedIn(false);
  //     setLoginPending(false);
  //   }
  // };

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
