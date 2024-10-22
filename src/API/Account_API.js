import client from "./client";

class Account_API {
  userSignup = async (User) => {
    try {
      const response = await client.post("/acc/signup", User.toJSON_Signup());

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
      const response = await client.post("/acc/login", User.toJSON_Login());

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

module.exports = new Account_API();
