import axios from "axios";
import Specialty_Model from "../models/Specialty_Model";

class Specialty_API {
  get_Speciality_List = async () => {
    try {
      const response = await axios.get(
        "http://192.168.1.11:4000/special/get-speciality-list"
      );
      const data = response.data;
      const specialties = data.map(
        (specialty) =>
          new Specialty_Model(
            specialty._id,
            specialty.name,
            specialty.description,
            specialty.speciality_image,
            specialty.is_deleted
          )
      );
      return specialties;
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

module.exports = new Specialty_API();
