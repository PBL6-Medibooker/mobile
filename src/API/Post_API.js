import client from "./client"

const get_All_Post = async () => {
    try {
        const res = await client.get("/post/get-all-post")
        const data = res.data
        if (data && Array.isArray(data)) {
            const sort = data.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            return sort
        }
        return data
    } catch (error) {
        if (error.response) console.log("Error get_All_Post: ", error.response.data.error)
        else console.log("Error get_All_Post: ", error.message)
        return null
    }
}

const get_Post_By_Id = async (id) => {
    try {
        const res = await client.get(`/post/get-post/${id}`)
        return res.data
    } catch (error) {
        if (error.response) console.log("Error get_Post_By_Id: ", error.response.data.error)
        else console.log("Error get_Post_By_Id: ", error.message)
        return null
    }
}

const get_Post_By_Specialty_Sort = async (specialty, sortBy) => {
    try {
        const posts = await get_All_Post()
        // console.log(item);
        const filterPosts = specialty
            ? posts.filter((item) => item?.speciality_id?._id === specialty?._id)
            : posts
        if (Array.isArray(filterPosts)) {
            const sortPosts = filterPosts.slice().sort((a, b) => {
                if (sortBy === "A-Z") {
                    return a.post_title.localeCompare(b.post_title)
                } else if (sortBy === "Z-A") {
                    return b.post_title.localeCompare(a.post_title)
                }
                return 0
            })
            return sortPosts
        } else return []
    } catch (error) {
        console.log("get_Post_By_Specialty_Sort: ", error)
    }
}

const add_New_Post = async (email, post_title, post_content, speciality_name) => {
    try {
        const res = await client.post("/post/create-post", {
            email: email,
            post_title: post_title,
            post_content: post_content,
            speciality_name: speciality_name,
        })

        return res.data
    } catch (error) {
        if (error.response) console.log("Error add_New_Post: ", error.response.data.error)
        else console.log("Error add_New_Post: ", error.message)
        return null
    }
}

const add_Comment = async (postId, comment_email, comment_content) => {
    try {
        const res = await client.post(`/post/add-comment/${postId}`, {
            comment_email: comment_email,
            comment_content: comment_content,
        })

        return res.data
    } catch (error) {
        if (error.response) console.log("Error add_Comment: ", error.response.data.error)
        else console.log("Error add_Comment: ", error.message)
        return null
    }
}

const update_Comment = async (comment_content, comment_id, post_id) => {
    try {
        const res = await client.post(`post/${post_id}/comment/${comment_id}/update`, {
            comment_content: comment_content,
        })
        // console.log(res.data);
        return res.data
    } catch (error) {
        if (error.response) console.log("Error update_Comment: ", error.response.data.error)
        else console.log("Error update_Comment: ", error.message)
        return null
    }
}

const delete_Comment = async (postId, commentId) => {
    try {
        const res = await client.post(`/post/${postId}/comment/${commentId}/del`)
        //post/:post_id/comment/:comment_id/del
        return res.data
    } catch (error) {
        if (error.response) console.log("Error delete_Comment: ", error.response.data.error)
        else console.log("Error delete_Comment: ", error.message)
        return null
    }
}

const search_Post = async (search_query) => {
    try {
        const res = await client.post("/post/search-post", {
            search_query: search_query,
        })
        const data = res.data
        if (data && Array.isArray(data)) {
            const sort = data.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            return sort
        }
        return data
    } catch (error) {
        if (error.response) console.log("Error search_Post: ", error.response.data.error)
        else console.log("Error search_Post: ", error.message)
        return null
    }
}

const search_Post_By_Specialty_Sort = async (search_query, specialty, sortBy) => {
    try {
        const posts = await search_Post(search_query)
        const filterPosts = specialty
            ? posts.filter((item) => item?.speciality_id?._id === specialty?._id)
            : posts
        if (Array.isArray(filterPosts)) {
            const sortPosts = filterPosts.slice().sort((a, b) => {
                if (sortBy === "A-Z") {
                    return a.post_title.localeCompare(b.post_title)
                } else if (sortBy === "Z-A") {
                    return b.post_title.localeCompare(a.post_title)
                }
                return 0
            })
            return sortPosts
        } else return []
    } catch (error) {
        console.log("search_Post_By_Specialty_Sort", error)
    }
}

export default {
    get_All_Post,
    add_New_Post,
    add_Comment,
    get_Post_By_Specialty_Sort,
    search_Post,
    search_Post_By_Specialty_Sort,
    get_Post_By_Id,
    update_Comment,
    delete_Comment,
}
