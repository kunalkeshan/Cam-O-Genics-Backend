/**
 * Axios SetUp
 */

// Dependencies
import axios from "axios";
import { getUserFromStorage } from "./custom";

const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:5000';

const server = async (options, auth = false) => {
    const onSuccess = (response) => response.data;
    const onError = (error) => {
        if (error.isAxiosError && !error.response) {
            return error.toJSON();
        }
        if (error.response) {
            return error.response;
        }
        return error;
    };
    if (auth) {
        const user = getUserFromStorage();
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${user?.token || ''}`;
    }
    try {
        const response = await axiosInstance(options);
        return onSuccess(response);
    } catch (error) {
        return Promise.reject(onError(error));
    }
};

export default server;