import client from "./client";

const get_All_Post = async () => {
  try {
    const res = await client.get("/post/get-all-post");
    // console.log(res.data.length);
    
    return res.data;
  } catch (error) {
    if (error.response) {
      console.log("Error response: ", error.response.data.error);
      //   return error.response.data.error;
    } else {
      console.log("Error not response: ", error.message);
      //   return error.message;
    }
    return null;
  }
};

export default {
  get_All_Post,
};
