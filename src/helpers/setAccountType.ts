import { isEmptyString } from "./isEmptyString";

export const setAccountType = (accountTypeCache: any, setProfileType: (data: string) => void) => {
    if (
        isEmptyString(accountTypeCache)
    ) {
        localStorage.setItem("accountType", JSON.stringify("Customer"));
        setProfileType("Customer");
    } else {
        switch (accountTypeCache) {
            case "Customer":
                setProfileType("Customer");
                localStorage.setItem("accountType", JSON.stringify("Customer"));
                break;
            default:
                setProfileType("Vendor");
                localStorage.setItem("accountType", JSON.stringify("Vendor"));

        }
    }
}