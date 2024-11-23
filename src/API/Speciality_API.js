import client from "./client";

const get_Speciality_List = async () => {
  try {
    const response = await client.get("/special/get-speciality-list", {
      hidden_state: "false",
    });
    return response.data;
  } catch (error) {
    if (error.response)
      console.error("Error get_Speciality_List: ", error.response.data.error);
    else console.error("Error get_Speciality_List: ", error.message);

    return [];
  }
};

const get_Speciality_By_Id = async (id) => {
  try {
    const specialities = await get_Speciality_List(); // `/special/get-speciality/${id}`
    return specialities.find((item) => item._id === id);
  } catch (error) {
    console.error("get_Speciality_By_Id", error);
  }
};

export default { get_Speciality_List, get_Speciality_By_Id };
