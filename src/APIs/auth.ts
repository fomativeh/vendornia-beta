import axios from "axios";
import { SERVER_URL } from "../constants/Backend_url";

export const AccountSignup = async ({
    google,
    username,
    email,
    password,
}: {
    google: boolean;
    username: string;
    email: string;
    password?: string;
}) => {
    const AUTH_URL = google ? "user/auth/google/signup" : "user/auth/signup";
    try {
        const response = await axios.post(
            `${SERVER_URL}/${AUTH_URL}`,
            {
                username,
                email,
                password,
            },
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

export const AccountSignin = async ({
    google,
    email,
    password,
}: {
    google: boolean;
    email: string;
    password?: string;
}) => {
    const AUTH_URL = google ? "user/auth/google/signin" : "user/auth/signin";
    try {
        const response = await axios.post(
            `${SERVER_URL}/${AUTH_URL}`,
            {
                email,
                password,
            },
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
