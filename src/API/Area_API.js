import axios from "axios";
import Area_Model from "../models/Area_Model";

class Area_API {
  get_Region_List = async () => {
    try {
      const response = await axios.get(
        "http://192.168.1.11:4000/region/get-region-list"
      );
      const data = response.data;
      const areas = data.map(
        (region) => new Area_Model(region._id, region.name, region.is_deleted)
      );
      return areas;
    } catch (error) {
      if (error.response) {
        console.log("Error response: ", error.response.data.error);
      } else {
        console.log("Error not response: ", error.message);
      }
      return [];
    }
  };
}

module.exports = new Area_API();
