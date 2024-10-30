import { useEffect, useState } from "react";
import Post_API from "../API/Post_API";

const usePosts = () => {
  const [postsHook, setPostsHook] = useState([]);
  const [firstPost, setFirstPost] = useState({});
  const [fourPosts, setFourPosts] = useState([]);
  const [loading, isLoading] = useState(false);

  const filterFirstPost = (data) => {
    return data.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    )[0];
  };

  const filterFourPosts = (data) => {
    return data
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .splice(1, 4);
  };

  const filterPosts = async () => {
    isLoading(true);
    try {
      const allPosts = await Post_API.get_All_Post();

      setPostsHook(allPosts);
      setFirstPost(filterFirstPost(allPosts));
      setFourPosts(filterFourPosts(allPosts));
    } catch (error) {
      console.error("Failed to fetch specialities:", error);
    } finally {
      isLoading(false);
    }
  };

  useEffect(() => {
    filterPosts();
  }, []);

  return [postsHook, firstPost, fourPosts, loading];
};

export default usePosts;
