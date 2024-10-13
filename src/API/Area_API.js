import axios from "axios";

class Area_API {
    get_Region_List = async () => {
    try {
      const response = await axios.get(
        "http://192.168.1.11:4000/region/get-region-list"
      );

      return response.data;
    } catch (error) {
      if (error.response) {
        console.log("Error response: ", error.response.data.error);
      } else {
        console.log("Error not response: ", error.message);
      }
      return []
    }
  };
}

module.exports = new Area_API();
