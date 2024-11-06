import client from "./client";
import * as FileSystem from 'expo-file-system';

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

const updateAccountInfo = async (
  id,
  username,
  phone,
  underlying_condition,
  image
) => {
  try {
    const formData = new FormData();

    // Thêm thông tin người dùng vào FormData
    if (username) formData.append("username", username);
    if (phone) formData.append("phone", phone);
    if (underlying_condition)
      formData.append("underlying_condition", underlying_condition);

    // Nếu có ảnh, chuyển ảnh sang định dạng Blob để upload
    if (image && image.uri) {
      const fileUri = image.uri;
      const fileName = image.fileName || "profile_image.jpeg";

      // Lấy nội dung file từ URI
      const file = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Tạo Blob từ file base64
      const blob = new Blob([Buffer.from(file, "base64")], {
        type: image.mimeType,
      });

      // Thêm ảnh vào FormData
      formData.append("profile_image", blob, fileName);
    }

    // Gửi request lên server
    const response = await axios.post(`/acc/update-acc-info/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Cập nhật thành công:", response.data);
  } catch (error) {
    console.error("Lỗi khi cập nhật thông tin tài khoản:", error);
  }
};

export default {
  userLogin,
  userSignup,
  get_Doctor_List,
  get_Account_By_Email,
  get_Account_By_Id,
  updateAccountInfo
};
