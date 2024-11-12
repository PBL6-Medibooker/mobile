import client from "./client";

const get_Region_List = async () => {
  try {
    const response = await client.post("/region/get-region-list", {
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

export default { get_Region_List };