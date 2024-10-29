import { useEffect, useState } from "react";
import Region_API from "../API/Region_API";

const useRegions = () => {
  const [regionsHook, setRegionsHook] = useState([]);

  const filterRegions = async () => {
    try {
      const allRegions = await Region_API.get_Region_List();

      setRegionsHook(allRegions.sort((a, b) => a.name.localeCompare(b.name)));
    } catch (error) {
      console.error("Failed to fetch specialities:", error);
    }
  };

  useEffect(() => {
    filterRegions();
  }, []);

  return [regionsHook];
};

export default useRegions;

// [
//     "__v",
//     "_id",
//     "is_deleted",
//     "name",
// ]
