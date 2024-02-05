"use client";
import React, { memo, useEffect, useContext, useState } from "react";
import logo from "../../../public/assets/images/logo.svg";
import menuIcon from "../../../public/assets/icons/menu.svg";
import userIcon from "../../../public/assets/icons/user.png";

import Image from "next/image";
import Link from "next/link";
import SingleProductBtn from "../Buttons/SingleProductBtn/SingleProductBtn";
import { UseAuth } from "@/hooks/UseAuth";
import { StoreContext, StoreContextType } from "@/GlobalState/store";
import { setAccountType } from "@/helpers/setAccountType";

const Navbar: React.FC = () => {
  const context = useContext<StoreContextType>(StoreContext);
  const toggleModal = context.actions.toggleProductModal;
  const sidebarToggle = context.actions.toggleSidebar;
  const { toggleToBeVendor } = context.actions;
  const { sidebarOpen, userData, accountType } = context.state;
  const userId = userData?._id;

  const [profileType, setProfileType] = useState<string>("");

  //Function to set account type
  const initAccountType = () => {
    const accountTypeCache: string = JSON.parse(
      localStorage.getItem("accountType") as string
    );

    //Function to set profile type by checking cache value
    setAccountType(accountTypeCache, setProfileType);
  };

  //Listens for account type changes on localstorage and sets it accordingly
  useEffect(() => {
    window.addEventListener("storage", initAccountType);

    return () => {
      window.removeEventListener("storage", initAccountType);
    };
  }, []);

  //Sets the account type on page load
  useEffect(() => {
    initAccountType();
  }, []);

  return (
    <nav className="nav-w fixed top-0 z-[99] max-sidebar-bk:h-[60px] h-[80px] flex justify-between items-center pr-[18px] bg-[#fff] max-sm:h-[45px]">
      {/* <UseAuth/> */}
      <figure className="relative w-[115px] h-[40px] ml-[22px] max-sidebar-bk:ml-[14px] sidebar-bk:hidden">
        <Image src={"/assets/images/logo.svg"} alt={"Vendornia logo"} fill />
      </figure>
      <form className="max-sidebar-bk:hidden w-fit h-[60%] flex justify-start items-center rounded-[20px] bg-[#cbcbcb] pl-[15px]">
        <figure className="w-[15px] h-[15px] mr-[10px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 104 104"
            fill="none"
            className="h-full w-full"
          >
            <path
              d="M84.5041 42.2438C84.5041 51.5659 81.4774 60.1771 76.3787 67.1636L102.096 92.8958C104.635 95.4345 104.635 99.5573 102.096 102.096C99.5564 104.635 95.4328 104.635 92.8936 102.096L67.1767 76.3638C60.1889 81.4818 51.576 84.4876 42.2521 84.4876C18.9119 84.4876 0 65.5795 0 42.2438C0 18.9082 18.9119 0 42.2521 0C65.5923 0 84.5041 18.9082 84.5041 42.2438ZM42.2521 71.4895C46.0934 71.4895 49.8972 70.7331 53.4461 69.2633C56.995 67.7936 60.2197 65.6394 62.9359 62.9237C65.6522 60.2079 67.8068 56.9839 69.2769 53.4357C70.7469 49.8874 71.5035 46.0844 71.5035 42.2438C71.5035 38.4032 70.7469 34.6002 69.2769 31.052C67.8068 27.5037 65.6522 24.2797 62.9359 21.564C60.2197 18.8483 56.995 16.694 53.4461 15.2243C49.8972 13.7546 46.0934 12.9981 42.2521 12.9981C38.4107 12.9981 34.607 13.7546 31.058 15.2243C27.5091 16.694 24.2844 18.8483 21.5682 21.564C18.8519 24.2797 16.6973 27.5037 15.2273 31.052C13.7572 34.6002 13.0006 38.4032 13.0006 42.2438C13.0006 46.0844 13.7572 49.8874 15.2273 53.4357C16.6973 56.9839 18.8519 60.2079 21.5682 62.9237C24.2844 65.6394 27.5091 67.7936 31.058 69.2633C34.607 70.7331 38.4107 71.4895 42.2521 71.4895Z"
              fill="#585858"
              className="h-full w-full"
            />
          </svg>
        </figure>
        <input
          type="text"
          placeholder="Find anything..."
          className="placeholder:text-[#585858] 
          h-full w-[23vw] max-w-[400px] rounded-r-[20px] font-semibold outline-none pr-[15px] bg-[inherit] text-[#1c1933]"
        />
      </form>

      <section className="flex items-center justify-between max-sm:hidden">
        <span className="max-sm:hidden mr-[20px] max-tablet:text-[10px]">
          <b>14,700</b> customers{" "}
          {accountType == "Vendor" ? "are searching." : "need you."}
        </span>

        {/* If user is a vendor, show button to post a product */}
        {profileType == "Vendor" && (
          <section onClick={toggleModal}>
            <SingleProductBtn text={"Post a product"} />
          </section>
        )}

        {/* If user is no vendor, show this */}
        {profileType == "Customer" && (
          <>
            {/* Show to unregistered user */}
            {!userId && (
              <>
                {/* Navigate to signup page */}
                {/* Tells the state that you want to be a vendor after signup */}
                <a href={"/Signup"} onClick={toggleToBeVendor}>
                  <SingleProductBtn text={"Start selling today"} />
                </a>
              </>
            )}

            {/* Show to registered user */}
            {userId && (
              //Navigate to onboarding page
              <Link href={"/Onboarding"}>
                <SingleProductBtn text={"Start selling today"} />
              </Link>
            )}
          </>
        )}
        <figure className="relative w-[35px] h-[35px] cursor-pointer max-sidebar-bk:hidden">
          <Image src={userIcon} alt={"User icon"} fill />
        </figure>
      </section>
    </nav>
  );
};

export default Navbar;
