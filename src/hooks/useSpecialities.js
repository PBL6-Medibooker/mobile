import { useEffect, useState } from "react";
import SpecialitiesAPI from "../API/Speciality_API";
import { Buffer } from "buffer";

const useSpecialities = () => {
  const [specialities, setSpecialities] = useState([]);
  const [sortSpecialities, setSortSpecialities] = useState([]);

  const filterSort = (data) => {
    return [...data].sort((a, b) => a.name.localeCompare(b.name));
  };

  const filterSpecialities = async () => {
    try {
      const allSpecialities = await SpecialitiesAPI.get_Speciality_List();

      const updatedSpecialities = allSpecialities.map((speciality) => {
        if (speciality.speciality_image && speciality.speciality_image.data) {
          const base64String = Buffer.from(speciality.speciality_image.data).toString('base64');
          return { ...speciality, speciality_image: base64String };
        }
        return speciality; // Không có image thì trả về nguyên trạng
      });

      setSpecialities(updatedSpecialities);
      setSortSpecialities(filterSort(updatedSpecialities));
    } catch (error) {
      console.error("Failed to fetch specialities:", error);
    }
  };

  useEffect(() => {
    filterSpecialities();
  }, []);

  return [specialities, sortSpecialities];
};

export default useSpecialities;

// [
//     "__v",
//     "_id",
//     "description",
//     "is_deleted",
//     "name",
//     "speciality_image"
// ]
