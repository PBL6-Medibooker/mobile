import client from "./client";

const userSignup = async (user) => {
  try {
    const response = await client.post("/acc/signup", user);

    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data.error;
    } else {
      return error.message;
    }
  }
};

const userLogin = async (user) => {
  try {
    const response = await client.post("/acc/login", user);

    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data.error;
    } else {
      return error.message;
    }
  }
};

const get_Doctor_List = async () => {
  try {
    const params = {
      user: false,
      hidden_state: false,
      // verified: false,
    };
    const res = await client.post("/acc/acc-list", params);
    return res.data;
  } catch (error) {
    if (error.response) {
      return error.response.data.error;
    } else {
      return error.message;
    }
  }
};

const get_Account_By_Email = async (email) => {
  try {
    const res = await client.post("/acc/get-acc-mail", {email: email});
    console.log("response: ", res.data);
    return res.data;
  } catch (error) {
    if (error.response) {
      console.log("Error response: ", error.response.data.error);
      return error.response.data.error;
    } else {
      console.log("Error not response: ", error.message);
      return error.message;
    }
  }
};

const get_Account_By_Id = async (id) => {
  try {
    // const mongoose = require('mongoose');
    // const cleanedId = mongoose.Types.ObjectId(id);
    const res = await client.get(`/acc/get-acc/${id}`);
    return res.data;
  } catch (error) {
    if (error.response) {
      console.log("Error response: ", error.response.data.error);
      return error.response.data.error;
    } else {
      console.log("Error not response: ", error.message);
      return error.message;
    }
  }
};


const change_password = async (email, newPassword) => {
  try {
    const res = await client.post("/acc/change-pass", {
      email: email,
      new_password: newPassword,
    });
    
    // Kiểm tra nếu phản hồi từ server có kết quả thành công
    if (res && res.status === 200) {
      console.log("Password change successful: ", res.data);
      return res.data; // Trả về dữ liệu khi thay đổi mật khẩu thành công
    } else {
      console.log("Failed to change password:", res.data);
      return res.data.error || "An unknown error occurred";
    }
  } catch (error) {
    if (error.response) {
      console.log("Error response: ", error.response.data.error);
      return error.response.data.error;
    } else {
      console.log("Error not response: ", error.message);
      return error.message;
    }
  }
};

    
//Xóa mềm tài khoản
// const softDeleteAccount = async (account_Ids) => {
//   const res = await client.post("/acc/soft-delete-acc" , {
//     account_Ids: account_Ids,
//   });
//   return res.data; 
// };

const softDeleteAccount = async (account_Ids) => {
  try {
    const res = await client.post("/acc/soft-delete-acc", {
      account_Ids,
    });
    return res.data;
  } catch (error) {
    if (error.response) {
      return error.response.data.error;
    } else {
      return error.message;
    }
  }
};


//Xóa cứng tài khoản
const permaDeleteAccount = async (account_Ids) => {
  try {
    const res = await client.post("/acc/perma-delete-acc", {
      account_Ids,
    });
    return res.data;
  } catch (error) {
    if (error.response) {
      return error.response.data.error;
    } else {
      return error.message;
    }
  }
};

//Khôi phục tài khoản
// const restoreDeleteAccount = async (account_Ids) => {
//   const res = await client.post("/acc/restore-account", {
//     account_Ids,
//   });
//   return res.data;
// };

// Cập nhật tài khoản
const uploadProfileImage = async (accountId, formData) => {
  try {
    const res = await client.post(`/acc/update-acc-info/${accountId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    if (error.response) {
      return { error: error.response.data.error };
    } else {
      return { error: error.message };
    }
  }
};

const ForgotPassword = async (email) => {
  try {
    const response = await client.post("/acc/forgot-pass", {email});
    console.log("Forgot Password Response: ", response.data);
    return response.data;
  } catch (error) {
    if(error.message) {
      console.log("Errpr response:", error.response.data.error);
      return error.response.data.error;
    } else {
      console.log("Error not response:", error.message);
      return error.message;
    }
  }
};

const resetPassword = async (token, newPassword) => {
  try {
    const response = await client.post(`/acc/reset-password/${token}`, {
      new_password: newPassword,
    });
    console.log("Reset Password Response: ", response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log("Error response:", error.response.data.error);
      return error.response.data.error;
    } else {
      console.log("Error not response:", error.message);
      return error.message;
    }
  }
};



export default {
  userLogin,
  userSignup,
  get_Doctor_List,
  get_Account_By_Email,
  get_Account_By_Id,
  change_password,
  softDeleteAccount,
  permaDeleteAccount,
  // restoreDeleteAccount,
  uploadProfileImage,
  ForgotPassword,
  resetPassword,
};
