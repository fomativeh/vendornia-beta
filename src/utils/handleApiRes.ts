export const handleApiRes = (res: any, toast: any) => {
    if (res.error) {
        const errorMessage = res.error.response.data.message;
        toast.error(errorMessage)
        return false
    }

    return res.data.data
};


export const handleEmptyRes = (res: any, toast: any) => {
    if (res.error) {
        const errorMessage = res.error.response.data.message;
        toast.error(errorMessage)
        return false
    }

    return true
};
