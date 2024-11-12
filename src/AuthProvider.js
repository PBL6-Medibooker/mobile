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
  //Chức năng đổi mật khẩu
  const changePassword = async (email, newPassword) => {
    try{
      const response = await Account_API.change_password(email, newPassword);
      return response;
    } catch (error) {
      throw error;
    }
  };
  //Chức năng xóa mềm
  const soft_deleteAccount = async(account_Ids) => {
    try{
      const response = await Account_API.softDeleteAccount(account_Ids);
      return response;
    } catch (error) {
      throw error;
    }
  };
  //Chức năng xóa cứng
  const perma_deleteAccount = async(account_Ids) => {
    try {
      const response = await Account_API.permaDeleteAccount(account_Ids);
      return response;
    } catch (error) {
      throw error;
    }
  };

  // Chức năng cập nhật tài khoản
  const update_acc_info = async (accountId, formData) => {
    try {
      const response = await Account_API.uploadProfileImage(accountId, formData);
      if (response && !response.error) {
        // Cập nhật thông tin trong state với dữ liệu mới nhất từ server
        setAccountInfo((prevInfo) => ({
          ...prevInfo,
          ...response,
          profile_image: response.profile_image // Đường dẫn ảnh từ phản hồi
        }));
        return response;
      } else {
        throw new Error(response.error || "Cập nhật thông tin thất bại");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin:", error);
      return { error: error.message };
    }
  };
  
  //Chức năng quên mật khẩu 
  const Forgot_Pass = async (email) => {
    try {
      const res = await Account_API.ForgotPassword(email);
      return res;
    } catch (error) {
      console.error("Error in forgot password:", error);
      throw error;
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
        changePassword,
        soft_deleteAccount,
        perma_deleteAccount,
        update_acc_info,
        Forgot_Pass,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
