import client from "./client";

const get_All_Post = async () => {
  try {
    const res = await client.get("/post/get-all-post");

    return res.data;
  } catch (error) {
    if (error.response)
      console.log("Error response: ", error.response.data.error);
    else console.log("Error not response: ", error.message);
    return null;
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
}

export default {
  get_All_Post,
  add_New_Post,
  add_Comment
};
