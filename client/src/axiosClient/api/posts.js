import queryString from "query-string";
import axiosClient from "..";
import { PER_PAGE } from "../../App";

const postsApi = {
    cratePost: async (data) => {
        return await axiosClient.post("/posts", data);
    },
    getPost: async (data) => {
        return await axiosClient.get('/posts/getPostById/' + data);
    },
    updatePost: async (_id,data) => {
        return await axiosClient.patch('/posts/updatePostById/' + _id, data);
    },
    likePost: async (postId, isLike)=>{
        return await axiosClient.post("/posts/like-post",{
            postId,
            isLike
        })
    },
    isLikePost: async (postId)=>{
        return await axiosClient.get("/posts/like-post",{params: {postId}})
    },
    getPostsByAuthor: async (page, author)=>{
        return await axiosClient.get('/posts/getPostsByAuthor', {
            params: {
                author,
                page,
                perPage: PER_PAGE
            }
        })
    },
    getPosts: async (page) => {
        return await axiosClient.get('/posts/getposts', {
            params: {
                page,
                perPage: PER_PAGE
            }
        })
    }
}
export default postsApi;