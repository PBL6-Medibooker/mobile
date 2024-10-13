import axios from "axios";
// import Account_API from "../API/Account_API";

class Account_API {
  userSignup = async (User) => {
    try {
      const response = await axios.post(
        "http://192.168.1.11:4000/acc/signup",
        User.toJSON_Signup()
      );

      console.log("response: ", response.data);
      return response.data;
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

  userLogin = async (User) => {
    try {
      const response = await axios.post(
        "http://192.168.1.11:4000/acc/login",
        User.toJSON_Login()
      );

      console.log("response: ", response.data);
      return response.data;
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
}

// export default Account_API;
module.exports = new Account_API();
