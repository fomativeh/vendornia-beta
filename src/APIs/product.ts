import axios from "axios";
import { SERVER_URL } from "../constants/Backend_url";

export const fetchAllHomepageProducts = async () => {
    try {
        const response = await axios.get(`${SERVER_URL}/product/all`);
        return response;
    } catch (error) {
        return { success: false, error };
    }
};

export const createProduct = async (productDetails: any) => {
    try {
        const response = await axios.post(`${SERVER_URL}/product/create`, productDetails);
        return response;
    } catch (error) {
        return { success: false, error };
    }
};

export const updateProduct = async (productDetails: any, productId:string) => {
    try {
        const response = await axios.put(`${SERVER_URL}/product/${productId}`, productDetails);
        return response;
    } catch (error) {
        return { success: false, error };
    }
};

export const fetchSingleProduct = async (productId: string) => {
    try {
        const response = await axios.post(
            `${SERVER_URL}/product/single`,
            { productId },
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                },
            }
        );
        return response;
    } catch (error) {
        return { success: false, error }
    }
};

export const deleteProduct = async (productId: string) => {
    try {
        const response = await axios.post(
            `${SERVER_URL}/product/delete`,
            { productId },
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                },
            }
        );
        return response;
    } catch (error) {
        return { success: false, error }
    }
};