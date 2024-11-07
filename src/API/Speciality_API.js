import client from "./client";

const get_Speciality_List = async () => {
  try {
    const response = await client.post("/special/get-speciality-list", {
      hidden_state: "false",
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log("Error response: ", error.response.data.error);
    } else {
      console.log("Error not response: ", error.message);
    }
    return [];
  }
};

const get_Speciality_By_Id = async (id) => {
  try {
    const specialities = await get_Speciality_List();
    return specialities.find((item) => item._id === id);
  } catch (error) {
    console.error(error);
  }
};

export default { get_Speciality_List, get_Speciality_By_Id };
