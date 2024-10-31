import { useEffect, useState } from "react";
import Post_API from "../API/Post_API";

const usePosts = () => {
  const [postsHook, setPostsHook] = useState([]);
  // const [firstPost, setFirstPost] = useState({});
  // const [fourPosts, setFourPosts] = useState([]);
  const [loading, isLoading] = useState(false);

  const filterPosts = async () => {
    isLoading(true);
    try {
      const allPosts = await Post_API.get_All_Post();

      setPostsHook(allPosts);
    } catch (error) {
      console.error("Failed to fetch specialities:", error);
    } finally {
      isLoading(false);
    }
  };

  useEffect(() => {
    filterPosts();
  }, []);

  const getPostsBySpecialty = (data, specialty) => {
    if (!specialty && !area) {
      return data;
    } else {
      const doctorBySpecialty = data.filter((item) => {
        const matchArea = area ? item.region_id === area._id : true;
        const matchSpecialty = specialty
          ? item.speciality_id === specialty._id
          : true;
        return matchArea && matchSpecialty;
      });
      return doctorBySpecialty;
    }
  };

  return [postsHook, loading];
};

export default usePosts;
