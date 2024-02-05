import { memo, useContext, useEffect, useState } from "react";
import homeIcon from "../../../public/assets/icons/Home.svg";
import searchIcon from "../../../public/assets/icons/search_nav.svg";
import vendorIcon from "../../../public/assets/icons/vendor_nav.svg";
import profileIcon from "../../../public/assets/icons/profile.svg";
import storeIcon from "../../../public/assets/icons/myStore.svg";
import addProductIcon from "../../../public/assets/icons/addProduct.svg";
import Image from "next/image";
import Link from "next/link";
import { StoreContext, StoreContextType } from "@/GlobalState/store";
import { usePathname } from "next/navigation";
import { getLinkAndIcon } from "@/helpers/getLinkAndIcon";
import { isEmptyString } from "@/helpers/isEmptyString";
import { setAccountType } from "@/helpers/setAccountType";

const BottomNav = () => {
  const pathname = usePathname();
  const context = useContext<StoreContextType>(StoreContext);
  const { actions, state } = context;
  const toggleSearchModal = actions.toggleSearchModal;
  const toggleProductModal = actions.toggleProductModal;

  const { userData, searchModal, productModalOpen, accountType } = state;

  const [profileType, setProfileType] = useState<string>("");
  const [profileRouteAndIcon, setProfileRouteAndIcon] = useState<any>(null);

  //Sets the profile routes and icons each time the profile type changes
  //Vendor icon and "/vendor" route for users, "/profile" route for registered customers, and "/signup" for unregistered customers
  useEffect(() => {
    setProfileRouteAndIcon(
      getLinkAndIcon(profileType, userData, storeIcon, profileIcon)
    );
  }, [profileType, userData]);

  //Function to set account type
  const initAccountType = () => {
    const accountTypeCache: string = JSON.parse(
      localStorage.getItem("accountType") as string
    );
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
    <section
      className={`fixed ${
        (productModalOpen || searchModal) && `hidden`
      } ${!userData && `hidden`} bottom-[-2px] left-0 w-full z-[999] sidebar-bk:hidden bg-[#000] h-[60px] flex justify-between px-[20px] items-center`}
    >
      {/* Renders this on other pages */}
      <Link href={"/"}>
        {pathname.charAt(1) !== "" && (
          <section className="flex flex-col justify-start items-center">
            <figure className="w-[20px] h-[20px] relative">
              <Image src={homeIcon} fill alt={"Home icon"} />
            </figure>
            <span className="mt-[4px] text-[12px] text-[#fff]">Home</span>
          </section>
        )}

        {/* Renders this on the homepage */}
        {pathname.charAt(1) == "" && (
          <section className="flex justify-center items-center bg-[#fff] rounded-[10px] px-[10px] py-[12px]">
            <figure className="w-[20px] h-[20px] relative">
              <Image
                src={"/assets/icons/Home-nav-active.svg"}
                fill
                alt={"Home icon"}
              />
            </figure>
          </section>
        )}
      </Link>

      <section
        className="flex flex-col justify-start items-center"
        onClick={() => {
          toggleSearchModal();
          window.scrollTo(0, 0);
        }}
      >
        <figure className="w-[20px] h-[20px] relative">
          <Image src={searchIcon} fill alt={"Search icon"} />
        </figure>
        {!searchModal && (
          <span className="mt-[4px] text-[12px] text-[#fff]">Product</span>
        )}
      </section>

      {profileType == "Vendor" && (
        <>
          {!productModalOpen && (
            <section
              className="flex flex-col justify-start items-center"
              onClick={toggleProductModal}
            >
              <figure className="w-[20px] h-[20px] relative">
                <Image src={addProductIcon} fill alt={"Add product icon"} />
              </figure>

              <span className="mt-[4px] text-[12px] text-[#fff]">Sell</span>
            </section>
          )}

          {productModalOpen && (
            <section className="flex justify-center items-center bg-[#fff] rounded-[10px] px-[10px] py-[12px]">
              <figure className="w-[20px] h-[20px] relative">
                <Image
                  src={"/assets/icons/addProduct-active.svg"}
                  fill
                  alt={"Add product icon"}
                />
              </figure>
            </section>
          )}
        </>
      )}

      {/* Renders this other pages other than vendors page */}
      {pathname !== "/Vendors" && (
        <Link href={"/Vendors"}>
          <section className="flex flex-col justify-start items-center">
            <figure className="w-[20px] h-[20px] relative">
              <Image src={vendorIcon} fill alt={"Vendor icon"} />
            </figure>
            <span className="mt-[4px] text-[12px] text-[#fff]">Vendors</span>
          </section>
        </Link>
      )}

      {/* Renders this on vendors page */}
      {pathname === "/Vendors" && (
        <section className="flex justify-center items-center bg-[#fff] rounded-[10px] px-[10px] py-[12px]">
          <figure className="w-[20px] h-[20px] relative">
            <Image
              src={"/assets/icons/vendor_nav-active.svg"}
              fill
              alt={"Vendors icon"}
            />
          </figure>
        </section>
      )}

      {profileRouteAndIcon && (
        <Link href={profileRouteAndIcon?.profileLink as string}>
          <section className="flex flex-col justify-start items-center">
            <figure className="w-[20px] h-[20px] relative">
              <Image
                src={profileRouteAndIcon?.icon}
                fill
                alt={profileRouteAndIcon?.alt as string}
              />
            </figure>
            <span className="mt-[4px] text-[12px] text-[#fff]">
              {profileRouteAndIcon?.caption}
            </span>
          </section>
        </Link>
      )}
    </section>
  );
};

export default BottomNav;
