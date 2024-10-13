import axios from "axios";
//import Specialty_API from "../API/Specialty_API";

class Specialty_API {
    get_Speciality_List = async () => {
    try {
      const response = await axios.get(
        "http://192.168.1.11:4000/special/get-speciality-list"
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

module.exports = new Specialty_API();
