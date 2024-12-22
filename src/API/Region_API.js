import client from "./client";

const get_Region_List = async () => {
  try {
    const response = await client.post("/region/get-region-list", {
      hidden_state: "false",
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log("Error get_Region_List: ", error.response.data.error);
    } else {
      console.log("Error get_Region_List: ", error.message);
    }
    return [];
  }
};

const get_Region_By_Id = async (id) => {
  try {
    const regions = await get_Region_List();
    return regions.find((item) => item._id === id);
  } catch (error) {
    console.log("get_Region_By_Id", error);
  }
};

export default { get_Region_List, get_Region_By_Id };
