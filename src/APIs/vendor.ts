import axios from "axios";
import { SERVER_URL } from "../constants/Backend_url";

export const createVendor = async (vendorDetails: any) => {
    try {
        const response = await axios.post(`${SERVER_URL}/vendor/create`, vendorDetails);
        return response;
    } catch (error) {
        return { success: false, error }
    }
}

export const fetchSingleVendor = async (vendorDetails: any) => {
    try {
        const response = await axios.post(
            `${SERVER_URL}/vendor/single`,
            vendorDetails,
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
}

export const updateVendor = async (vendorDetails: any) => {
    try {
        const response = await axios.put(
            `${SERVER_URL}/vendor/`,
            vendorDetails,
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
}

export const fetchVendorProducts = async (sellerId: string) => {
    try {
        const response = await axios.get(
            `${SERVER_URL}/vendor/products/${sellerId}`,
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
}
