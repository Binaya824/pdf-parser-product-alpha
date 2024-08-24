import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';

const createAxiosInstance = (): AxiosInstance => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

    if (!baseUrl) {
        throw new Error("Base URL is not defined. Please set NEXT_PUBLIC_BASE_API_URL in your .env file.");
    }

    const axiosInstance = axios.create({
        baseURL: baseUrl,
    });

    const token = Cookies.get('authToken');
    if (token) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    return axiosInstance;
};

export default createAxiosInstance;