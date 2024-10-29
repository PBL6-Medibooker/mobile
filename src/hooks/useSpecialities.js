import { useEffect, useState } from "react";
import SpecialitiesAPI from "../API/Speciality_API";
import { Buffer } from "buffer";

const useSpecialities = () => {
  const [specialitiesHook, setSpecialitiesHook] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const filterSort = (data) => {
    return data.sort((a, b) => a.name.localeCompare(b.name));
  };

  const filterSpecialities = async () => {
    setLoading(true);
    try {
      const allSpecialities = await SpecialitiesAPI.get_Speciality_List();

      const updatedSpecialities = allSpecialities.map((speciality) => {
        if (speciality.speciality_image && speciality.speciality_image.data) {
          const base64String = Buffer.from(
            speciality.speciality_image.data
          ).toString("base64");
          return { ...speciality, speciality_image: base64String };
        }
        return speciality;
      });

      setSpecialitiesHook(updatedSpecialities);
    } catch (error) {
      console.error("Failed to fetch specialities:", error);
      setError("Failed to fetch specialities.");
    } finally {
      setLoading(false);
    }
  };

  const get_Specialty_By_ID = (data, id) => {
    return data.find((item) => item._id === id)?.name;
  };

  useEffect(() => {
    filterSpecialities();
  }, []);

  return [specialitiesHook, get_Specialty_By_ID, loading, error];
};

export default useSpecialities;