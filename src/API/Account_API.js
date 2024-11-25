import AsyncStorage from "@react-native-async-storage/async-storage";
import client from "./client";
import * as FileSystem from "expo-file-system";

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

    const data = response.data;
    if (data?.token) {
      // console.log(data);
      await AsyncStorage.setItem("user", JSON.stringify(data));
      await AsyncStorage.setItem("myEmail", data.email);
    }
    return data;
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
    const res = await client.post("/acc/get-acc-mail", { email: email });
    // console.log("response: ", res.data);
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
    const res = await client.post(`/acc/get-acc/${id}`);
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

const get_Filter_Doctor_List = async (specialty, region) => {
  try {
    const params = {
      speciality: specialty,
      region: region,
    };
    const res = await client.post("/acc/filter-doctor-list", params);
    const data = res.data.filter((item) => !item.is_deleted);
    return data;
  } catch (error) {
    if (error.response) {
      return error.response.data.error;
    } else {
      return error.message;
    }
  }
};

const get_Doctor_Active_Hour_List = async (doctor_id) => {
  try {
    const res = await client.get(`/acc/active-hour-list/${doctor_id}`);
    const data = res.data;
    return data;
  } catch (error) {
    if (error.response) {
      console.error("Error active hours: ", error.response.data.error);
      return error.response.data.error;
    } else {
      console.error("Error active hours: ", error.message);
      return error.message;
    }
  }
};




const ForgotPassword = async (email) => {
  try {
    const res = await client.post("/acc/forgot-pass", { email });
    console.log("Forgot Password Response: ", res.data);
    return res.data;
  } catch (error) {
    if (error.message) {
      console.log("Error response:", error.response.data.error);
      return error.response.data.error;
    } else {
      console.log("Error not response:", error.message);
      return error.message;
    }
  }
}; 

const ResetPassword = async (token, newPassword) => {
  try {
    const res = await client.post(`/acc/reset-password/${token}`, {
      new_password: newPassword,
    });
    console.log("Reset Password Response:", res.data);
    return res.data;
  } catch (error) {
    if (error.message) {
      console.log("Error response:", error.response.data.error);
      return error.response.data.error;
    } else {
      console.log("Error not response:", error.message);
      return error.message;
    }
  }
};

const softDeleteAccount = async (account_Ids) => {
  try {
    const res = await client.post("/acc/soft-delete-acc", {
      account_Ids,
    });
    return res.data;
  } catch (error) {
    if (error.message) {
      return error.message.data.error;
    } else {
      return error.message;
    }
  }
};

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

const change_password = async (email, newPassword) => {
  try {
    const res = await client.post("/acc/change-pass", {
      email: email,
      new_password: newPassword,
    });
    console.log("Password change successful: ", res.data);
    return res.data; 
  } catch (error) {
    if (error.response) {
      console.log("Error response: ", error.response.data.error);
      return error.response.data.error;
    } else {
      console.log("Error not response: ", error.message);
      return error.message 
    }
  }
};

const addDoctorActiveHour = async (doctor_id, activeHour) => {
  try {
    const response = await client.post(`/acc/add-active-hour/${doctor_id}`, activeHour);

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Lỗi từ backend:", error.response.data.error);
      throw new Error(error.response.data.error);
    } else {
      console.error("Lỗi không từ backend:", error.message);
      throw new Error("Đã xảy ra lỗi không xác định.");
    }
  }
};

const updateDoctorActiveHour = async (doctor_id, newActiveHour, oldActiveHour) => {
  try {
    // Tạo payload gửi lên backend
    const payload = {
      ...newActiveHour, // Bao gồm day, start_time, end_time, hour_type, appointment_limit
      ...oldActiveHour, // Bao gồm old_day, old_start_time, old_end_time, old_hour_type
    };

    // Gửi yêu cầu POST tới backend
    const response = await client.post(`/acc/update-active-hour/${doctor_id}`, payload);

    // Trả về danh sách active_hours và thông tin đã thay đổi từ backend
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Lỗi từ backend:", error.response.data.error);
      throw new Error(error.response.data.error);
    } else {
      console.error("Lỗi không từ backend:", error.message);
      throw new Error("Đã xảy ra lỗi không xác định.");
    }
  }
};

const deleteDoctorActiveHour = async (doctor_id, activeHour) => {
  try {
    // Gửi yêu cầu DELETE tới backend với body chứa thông tin giờ làm việc cần xóa
    const response = await client.post(`/acc/delete-active-hour/${doctor_id}`, activeHour);

    // Trả về thông báo và danh sách active_hours sau khi xóa
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Lỗi từ backend:", error.response.data.error);
      throw new Error(error.response.data.error);
    } else {
      console.error("Lỗi không từ backend:", error.message);
      throw new Error("Đã xảy ra lỗi không xác định.");
    }
  }
};

const update_Doctor_Info = async (accountId, data) => {
  try {
    const res = await client.post(`/acc/update-doc-info/${accountId}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Doctor info updated successfully:", res.data);
    return res.data;
  } catch (error) {
    if (error.response) {
      console.error("Error response:", error.response.data.error);
      return error.response.data.error;
    } else {
      console.error("Error not response:", error.message);
      return error.message || "An unknown error occurred";
    }
  }
};

const getDoctorProof = async (doctor_id) => {
  try {
    const res = await client.post(`/acc/get-proof/${doctor_id}`);
    return res.data.proof; 
  } catch (error) {
    if (error.response) {
      console.log("Error response: ", error.response.data.error);
      return error.response.data.error;
    } else {
      console.log("Error not response: ", error.message);
      return error.message 
    }
  }
};


// // const uploadDoctorProof = async (doctor_id, imageFile) => {
// //   try {
// //     if (!imageFile) {
// //       throw new Error("Không có file hình ảnh để tải lên.");
// //     }
// //     const formData = new FormData();
// //     formData.append("proof", {
// //       uri: imageFile.uri, 
// //       name: imageFile.name || "proof.jpg", 
// //       type: imageFile.type || "image/jpeg", 
// //     });
    
// //     const res = await client.post(`/acc/upload-proof/${doctor_id}`, formData, {
// //       headers: {
// //         "Content-Type": "multipart/form-data",
// //       },
// //     });
// //     return res.data;
// //   } catch (error) {
// //     if (error.response) {
// //       console.error("Lỗi từ backend:", error.response.data.error);
// //       throw new Error(error.response.data.error);
// //     } else {
// //       console.error("Lỗi không từ backend:", error.message);
// //       throw new Error(error.message || "Đã xảy ra lỗi không xác định.");
// //     }
// //   }
// };

const uploadDoctorProof = async (doctor_id, pdfFile) => {
  try {
    if (!pdfFile) {
      throw new Error("Không có file PDF để tải lên.");
    }
    const formData = new FormData();
    formData.append("proof", {
      uri: pdfFile.uri, 
      name: pdfFile.name || "proof.pdf",
      type: "application/pdf", 
    });
    const res = await client.post(`/acc/upload-proof/${doctor_id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", 
      },
    });
    return res.data;
  } catch (error) {
    if (error.response) {
      console.error("Lỗi từ backend:", error.response.data.error);
      throw new Error(error.response.data.error || "Lỗi từ backend.");
    } else {
      console.error("Lỗi không từ backend:", error.message);
      throw new Error(error.message || "Đã xảy ra lỗi không xác định.");
    }
  }
};

const update_Account = async (accountId, formData) => {
  try {
    const res = await client.post(`/acc/update-acc-info/${accountId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
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

export default {
  userLogin,
  userSignup,
  get_Doctor_List,
  get_Account_By_Email,
  get_Account_By_Id,
  get_Filter_Doctor_List,
  get_Doctor_Active_Hour_List,
  update_Account,
  ForgotPassword,
  ResetPassword,
  softDeleteAccount,
  permaDeleteAccount,
  change_password,
  addDoctorActiveHour,
  update_Account,
  update_Doctor_Info,
  uploadDoctorProof,
  addDoctorActiveHour,
  updateDoctorActiveHour,
  deleteDoctorActiveHour,
  getDoctorProof,
};
