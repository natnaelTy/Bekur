import axios from "axios";


export const adminAPI = axios.create({
    baseURL: "http://localhost:3000/api/admin",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    }
});
