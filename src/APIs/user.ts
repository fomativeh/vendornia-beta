import axios from "axios";
import { SERVER_URL } from "../constants/Backend_url";

export const fetchUserData = async (accessToken: string) => {
    try {
        const response = await axios.post(
            `${SERVER_URL}/user/single`,
            {accessToken},
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