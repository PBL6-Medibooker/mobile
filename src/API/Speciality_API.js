import client from "./client";

const get_Speciality_List = async () => {
  try {
    const response = await client.get("/special/get-speciality-list");
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

export default { get_Speciality_List };
