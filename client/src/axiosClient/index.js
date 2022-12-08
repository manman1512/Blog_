import axios from "axios";
import queryString from "query-string";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const url = `${SERVER_URL}/api`;
const axiosClient = axios.create({ 
    baseURL: url,
    headers:{
        "Content-Type": "application/json",
    },
    paramsSerializer: (params) => queryString.stringify(params)
})
axiosClient.interceptors.request.use(config =>{
    const token = window.localStorage.getItem("accessToken");
    if(token){

        config.headers = {
            "Authorization": "Bearer " + token
        }
    }
    return config;
    })
export default axiosClient;