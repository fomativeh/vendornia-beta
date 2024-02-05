import axios from "axios";
import { SERVER_URL } from "../constants/Backend_url";

type reviewType = {
    authorEmail: string,
    authorUsername:string,
    comment: string,
    reaction: string,
    productId: string
}

export const addReview = async (reviewDetails: reviewType) => {
    console.log(reviewDetails)
    try {
        const response = await axios.post(
            `${SERVER_URL}/review/`,
            { ...reviewDetails },
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                },
            }
        );
        return response;
    } catch (error) {
        console.log(error)
        return { success: false, error }
    }
}

export const getAllProductReviews = async (productId: string) => {
    try {
        const response = await axios.get(
            `${SERVER_URL}/getAll/${productId}`,
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