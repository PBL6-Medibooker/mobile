import AsyncStorage from "@react-native-async-storage/async-storage";
import client from "./client";
import * as FileSystem from "expo-file-system";

const userSignup = async (user, proof) => {
  try {
    const data = new FormData();
    data.append("username", user.username);
    data.append("email", user.email);
    data.append("phone", user.phone);
    data.append("password", user.password);
    data.append("is_doc", user.is_doc);
    if (proof)
      data.append("proof", {
        uri: proof.uri,
        type: proof.mimeType || "image/jpeg",
        name: proof.fileName || "anh.jpg",
      });

    const response = await client.post("/acc/signup", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error sign up: ", error.response.data.error);
      return error.response.data.error;
    } else {
      console.error("Error sign up: ", error.message);
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
      console.error("Error login: ", error.response.data.error);
      return error.response.data.error;
    } else {
      console.error("Error login: ", error.message);
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
      console.error("Error get doctor list: ", error.response.data.error);
      return error.response.data.error;
    } else {
      console.error("Error get doctor list: ", error.message);
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
      console.error("Error get account by email: ", error.response.data.error);
      return error.response.data.error;
    } else {
      console.error("Error get account by email: ", error.message);
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
      console.error("Error get account by id: ", error.response.data.error);
      return error.response.data.error;
    } else {
      console.error("Error get account by id: ", error.message);
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
      console.error(
        "Error doctor by specialty and region: ",
        error.response.data.error
      );
      return error.response.data.error;
    } else {
      console.error("Error doctor by specialty and region: ", error.message);
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

const update_Account = async (id, data) => {
  try {
    const res = await client.post(`/acc/update-acc-info/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    if (error.response) {
      console.error("Error update account: ", error.response.data.error);
      return error.response.data.error;
    } else {
      console.error("Error update account: ", error.message);
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
};
