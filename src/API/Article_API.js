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

export default {
  get_All_Article,
  getArticlesByDoctor,
  getArticlesBySpecialty,
};