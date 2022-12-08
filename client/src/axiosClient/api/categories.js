import axiosClient from ".."

const categoriesApi = {
    getByName: async (name)=>{
        return await axiosClient.get(`/categories`, {params: {
            q: name
        }})
    },
    addTag: async (name)=>{
        return await axiosClient.post("/categories",{
            name: name
        })
    },
    getTags: async (_id)=>{
        return await axiosClient.get(`/categories/user/${_id}`)
    },
    getPostByTags: async(tagId)=>{
        return await axiosClient.get(`/categories/${tagId}`)
    },
    getPostByTag: async(name)=>{
        console.log(name);
        return await axiosClient.get(`/categories/${name}`)
    }
}
export default categoriesApi