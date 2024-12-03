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
      if (isLoggedIn) {
        try {
          const accountData = await Account_API.get_Account_By_Email(
            user?.email
          );
          // console.log(accountData);

          setAccount(accountData);
          setError(null);
          if (user?.verified === true) console.log("Doctor");
          if (user?.verified === false) {
            console.log("Doctor not verify");
            setAccount({});
            setIsLoggedIn(false);
            setError("Tài khoản chưa được xác thực!");
          }
        } catch (error) {
          console.error("Failed to fetch account info: ", error);
          setAccount({});
          setIsLoggedIn(false);
        }
      } else {
        setAccount({});
      }
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
      console.error("Error logging out: ", error);
    }
  };

  // const Forgot_Pass = async (email) => {
  //   try {
  //     const res = await Account_API.ForgotPassword(email);
  //     return res;
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
  

  const soft_deleteAccount = async(account_Ids) => {
    try{
      const response = await Account_API.softDeleteAccount(account_Ids);
      return response;
    } catch (error) {
      throw error;
    }
  };
  
  const perma_deleteAccount = async(account_Ids) => {
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
        perma_deleteAccount
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
