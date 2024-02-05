"use client";
import { fetchUserData } from "@/APIs/user";
import { StoreContext, StoreContextType } from "@/GlobalState/store";
import { fetchUserForAuth } from "@/helpers/fetchUserForAuth";
import { handleApiRes } from "@/utils/handleApiRes";
import { useContext, useEffect } from "react";
import toast from "react-hot-toast";

export const UseAuth = () => {
  const context = useContext<StoreContextType>(StoreContext);
  let accessToken: any = null;
  const { userData } = context.state;
  const { setUserData } = context.actions;


  //Can only access localstorage on the client
  if (typeof window !== "undefined") {
    accessToken = JSON.parse(localStorage.getItem("accessToken") as string);
    if (userData?.isVendor) {
      localStorage.setItem("accountType", JSON.stringify("Vendor"));
    }
  }

  useEffect(() => {
    fetchUserForAuth(accessToken, setUserData);
  }, [accessToken, setUserData]);
  return <></>;
};
