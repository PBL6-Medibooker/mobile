import { useEffect, useState } from "react";
import SpecialitiesAPI from "../API/Speciality_API";

const useSpecialities = () => {
  const [specialitiesHook, setSpecialitiesHook] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // const filterSort = (data) => {
  //   return data.slice().sort((a, b) => a.name.localeCompare(b.name));
  // };

  const filterSpecialities = async () => {
    setLoading(true);
    try {
      const allSpecialities = await SpecialitiesAPI.get_Speciality_List();

      setSpecialitiesHook(allSpecialities);
    } catch (error) {
      console.error("Failed to fetch specialities:", error);
      setError("Failed to fetch specialities.");
    } finally {
      setLoading(false);
    }
  };

  const get_Specialty_By_ID = (data, id) => {
    return data.find((item) => item._id === id);
  };

  useEffect(() => {
    filterSpecialities();
  }, []);

  return [specialitiesHook, get_Specialty_By_ID, loading, error];
};

export default useSpecialities;