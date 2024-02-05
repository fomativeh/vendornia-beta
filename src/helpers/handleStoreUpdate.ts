import { updateVendor } from "@/APIs/vendor";
import { handleApiRes } from "@/utils/handleApiRes";

type props = {
    dashboardStoreName: string,
    dashboardDescription: string,
    dashboardWhatsapp: string,
    dashboardBanner: string,
    dashboardLogo: string,
    userData: any,
    setDashboardStoreDetails: (data: any) => void,
    context: any,
    setIsEditing: (data: boolean) => void,
    toast: any
}

export const handleStoreUpdate = async ({
    dashboardStoreName,
    dashboardDescription,
    dashboardWhatsapp,
    dashboardBanner,
    dashboardLogo,
    userData,
    setDashboardStoreDetails,
    context,
    setIsEditing,
    toast }: props) => {
    const updateDetails = {
        storeName: dashboardStoreName,
        storeDescription: dashboardDescription,
        whatsapp: dashboardWhatsapp,
        banner: dashboardBanner,
        logo: dashboardLogo,
        vendorId: userData?.vendorDetails?._id,
    };
    try {
        const loadingToast = toast.loading("Updating your details...");
        context.actions.toggleIsLoading();
        const updateProductRes = await updateVendor(updateDetails);
        toast.dismiss(loadingToast);
        const productUpdated = await handleApiRes(updateProductRes, toast);
        if (productUpdated) {
            context.actions.updateVendorDetails(productUpdated);
            toast.success("Details updated.");
            setIsEditing(false);
            context.actions.toggleIsLoading();
        } else {
            context.actions.toggleIsLoading();
            setDashboardStoreDetails(userData?.vendorDetails);
        }
    } catch (error) { }
};