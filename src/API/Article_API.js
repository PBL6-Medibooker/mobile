import client from "./client";

const get_All_Article = async () => {
  try {
    const res = await client.get("/article/get-all-article");

    return res.data;
  } catch (error) {
    if (error.response)
      console.log("Error response: ", error.response.data.error);
    else console.log("Error not response: ", error.message);

    return null;
  }
};

const add_Article = async (email, title, content, image) => {
  try {
    const data = new FormData()
    data.append("email", email)
    data.append("article_title", title)
    data.append("article_content", content)
    data.append("article_img", {
      uri: image.uri,
      type: image.mimeType || "image/jpeg",
      name: image.fileName || 'anh.jpg'
    })
    
    const res = await client.post("/article/create-article", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    });

    return res.data;
  } catch (error) {
    if (error.response)
      console.log("Error response: ", error.response.data.error);
    else console.log("Error not response: ", error.message);

    return null;
  }
};

const getArticlesByDoctor = async (doctorEmail) => {
  try {
    const res = await client.post("/article/get-all-article-by-doctor", {
      email: doctorEmail,
    });

    return res.data;
  } catch (error) {
    if (error.response)
      console.log("Error response: ", error.response.data.error);
    else console.log("Error not response: ", error.message);
    return null;
  }
};

const getArticlesBySpecialty = async (specialtyName) => {
  try {
    const res = await client.post("/article/get-all-article-by-speciality", {
      speciality_name: specialtyName,
    });

    return res.data;
  } catch (error) {
    if (error.response)
      console.log("Error response: ", error.response.data.error);
    else console.log("Error not response: ", error.message);
    return null;
  }
};

const search_Article = async (search_query) => {
  try {
    const res = await client.post("/article/search-article", {
      search_query: search_query,
    });
    const data = res.data.filter((item) => !item.is_deleted);
    if (data && Array.isArray(data)) {
      const sort = data
        .slice()
        .sort(
          (a, b) => new Date(b.date_published) - new Date(a.date_published)
        );
      return sort;
    }
    return data;
  } catch (error) {
    if (error.response)
      console.error("Error response: ", error.response.data.error);
    else console.error("Error not response: ", error.message);
    return null;
  }
};

export default {
  get_All_Article,
  getArticlesByDoctor,
  getArticlesBySpecialty,
  search_Article,
  add_Article
};
