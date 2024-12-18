import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Account_API from "./API/Account_API";
import client from "./API/client";
import { tr } from "date-fns/locale";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [account, setAccount] = useState({});
  const [error, setError] = useState(null);
  const [loginPending, setLoginPending] = useState(false); //loading

  const fetchToken = async () => {
    const userString = await AsyncStorage.getItem("user");
    const user = JSON.parse(userString);

    console.log(user);

    if (user?.token) {
      setUser(user);
      console.log(user?.email);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      setUser({});
      setAccount({});
    }
  };

  useEffect(() => {
    fetchToken();
  }, []);

  useEffect(() => {
    const fetchAccountInfo = async () => {
      setError(null);
      if (isLoggedIn) {
        try {
          if (!user || !user.token) return null;

          const accountData = await Account_API.getUserProfile(user?.token);

          const acc = accountData.user;
          // console.log(accountData.user);
          if (acc?.verified === false) {
            setAccount({});
            setIsLoggedIn(false);
            setError("Tài khoản chưa được xác thực!");
          } else {
            setAccount(accountData.user);
            setIsLoggedIn(true);
            setError(null);
          }

          // setAccount(accountData.user);
          // setError(null);
          // if (user?.verified === true) console.log("Doctor");
          // if (user?.verified === false) {
          //   console.log("Doctor not verify");
          //   setAccount({});
          //   setIsLoggedIn(false);
          //   setError("Tài khoản chưa được xác thực!");
          // }
        } catch (error) {
          console.log("Failed to fetch account info: ", error);
          setAccount({});
          setError(error);
          setIsLoggedIn(false);
        }
      } else {
        setAccount({});
        setError(null);
      }
    };

    fetchAccountInfo();
  }, [isLoggedIn]);

  const userLogin = async () => {
    await fetchToken();
  };

  const userLogout = async () => {
    try {
      await AsyncStorage.removeItem("user");
      setUser({});
      setAccount({});
      setIsLoggedIn(false);
    } catch (error) {
      console.log("Error logging out: ", error);
    }
  };

  // const Forgot_Pass = async (email) => {
  //   try {
  //     const res = await Account_API.ForgotPassword(email);
  //     if (!res.success) return { error: res.error };
  //     return res.data;
  //   } catch (error) {
  //     console.error("Error in forgot password:", error);
  //     throw error;
  //   }
  // };

  const Forgot_Pass = async (email) => {
    const response = await Account_API.ForgotPassword(email);
    if (!response.success) {
      return { error: response.error };
    }
    return response.data;
  };

  const soft_deleteAccount = async (account_Ids) => {
    try {
      const response = await Account_API.softDeleteAccount(account_Ids);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const perma_deleteAccount = async (account_Ids) => {
    try {
      const response = await Account_API.permaDeleteAccount(account_Ids);
      return response;
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userLogin,
        userLogout,
        isLoggedIn,
        account,
        error,
        setAccount,
        Forgot_Pass,
        soft_deleteAccount,
        perma_deleteAccount,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
