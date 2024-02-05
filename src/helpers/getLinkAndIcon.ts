export const getLinkAndIcon = (accountType: string, userData: any, storeIcon: any, profileIcon: any) => {
    if (accountType == "Vendor") {
        return {
            icon: storeIcon,
            profileLink: `/Vendor/${userData?._id}`,
            caption: "My store",
            alt: "Store icon",
        };
    } else {
        return {
            icon: profileIcon,
            profileLink: "/Profile",
            caption: "Profile",
            alt: "Profile icon",
        };
    }
};
