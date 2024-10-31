import client from "./client";

const get_Client_By_User_Id = async (userID) => {
  try {
    const res = await client.get(`/client/get-client-by-userid/${userID}`);
    console.log("response: ", res.data);
    return res.data;
  } catch (error) {
    if (error.response) {
      console.log("Error response: ", error.response.data.error);
      //   return error.response.data.error;
    } else {
      console.log("Error not response: ", error.message);
      //   return error.message;
    }
    return null;
  }
};

const add_Client = async (userID, insurance) => {
  try {
    const response = await client.post("/client/add-client", {
      user_id: userID,
      insurance_name: insurance.insurance_name,
      insurance_number: insurance.insurance_number,
      insurance_location: insurance.insurance_location,
      insurance_exp_date: insurance.insurance_exp_date,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
        console.log("Error response: ", error.response.data.error);
        //   return error.response.data.error;
      } else {
        console.log("Error not response: ", error.message);
        //   return error.message;
      }
      return null;
  }
};

export default {
  get_Client_By_User_Id,
  add_Client,
};