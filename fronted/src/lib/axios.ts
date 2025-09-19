import axios from "axios";
export const axiosInstance=axios.create({
    baseURL:`/api`
    //baseURL:`http://13.222.174.90:5000/api`
    //baseURL:`http://localhost:5000/api`
})