import axios, { type AxiosInstance } from "axios";

export const axiosClient: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL as string,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});