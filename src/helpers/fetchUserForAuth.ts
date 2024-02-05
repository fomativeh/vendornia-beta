import { fetchUserData } from "@/APIs/user";
import { handleApiRes } from "@/utils/handleApiRes";
import toast from "react-hot-toast";
import { isEmptyString } from "./isEmptyString";

export const fetchUserForAuth = async (accessToken:any, setUserData:(data:any)=>void) => {
    // if (isEmptyString(accessToken)) {
    //     return;
    // }

    try {
        const fetchUserRes: any = await fetchUserData(accessToken);
        const userDetails = handleApiRes(fetchUserRes, toast);
        setUserData(userDetails);
    } catch (error) {
        // Handle the error
    }
};