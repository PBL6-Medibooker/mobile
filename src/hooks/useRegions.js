import { useEffect, useState } from "react";
import Region_API from "../API/Region_API";

const useRegions = () => {
  const [regions, setRegions] = useState([]);
  const [sortRegions, setSortRegions] = useState([]);

  const filterSort = (data) => {
    return [...data].sort((a, b) => a.name.localeCompare(b.name));
  };

  const filterRegions = async () => {
    try {
      const allRegions = await Region_API.get_Region_List();

      setRegions(allRegions);
      setSortRegions(filterSort(allRegions));
    } catch (error) {
      console.error("Failed to fetch specialities:", error);
    }
  };

  useEffect(() => {
    filterRegions();
  }, []);

  return [regions, sortRegions];
};

export default useRegions;

// [
//     "__v",
//     "_id",
//     "is_deleted",
//     "name",
// ]
