import client from "./client";

const get_All_Post = async () => {
  try {
    const res = await client.get("/post/get-all-post");
    const data = res.data;
    if (data && Array.isArray(data)) {
      const sort = data
        .slice()
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      return sort;
    }
    return data;
  } catch (error) {
    if (error.response)
      console.log("Error response: ", error.response.data.error);
    else console.log("Error not response: ", error.message);
    return null;
  }
};

const get_Post_By_Specialty_Sort = async (specialty, sortBy) => {
  try {
    const posts = await get_All_Post();
    const filterPosts = specialty
      ? posts.filter((item) => item.speciality_id._id === specialty._id)
      : posts;
    if (Array.isArray(filterPosts)) {
      const sortPosts = filterPosts.slice().sort((a, b) => {
        if (sortBy === "A-Z") {
          return a.post_title.localeCompare(b.post_title);
        } else if (sortBy === "Z-A") {
          return b.post_title.localeCompare(a.post_title);
        }
        return 0;
      });
      return sortPosts;
    } else return [];
  } catch (error) {
    console.error(error);
  }
};

const add_New_Post = async (
  email,
  post_title,
  post_content,
  speciality_name
) => {
  try {
    const res = await client.post("/post/create-post", {
      email: email,
      post_title: post_title,
      post_content: post_content,
      speciality_name: speciality_name,
    });

    return res.data;
  } catch (error) {
    if (error.response)
      console.log("Error response: ", error.response.data.error);
    else console.log("Error not response: ", error.message);
    return null;
  }
};

const add_Comment = async (postId, comment_email, comment_content) => {
  try {
    const res = await client.post(`/post/add-comment/${postId}`, {
      comment_email: comment_email,
      comment_content: comment_content,
    });

    return res.data;
  } catch (error) {
    if (error.response)
      console.log("Error response: ", error.response.data.error);
    else console.log("Error not response: ", error.message);
    return null;
  }
};

export default {
  get_All_Post,
  add_New_Post,
  add_Comment,
  get_Post_By_Specialty_Sort,
};
