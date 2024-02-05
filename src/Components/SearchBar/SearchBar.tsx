import React, { useContext } from "react";
import searchIcon from "../../../public/assets/icons/search.svg";
import Image from "next/image";
// import { useAppStore } from "@/GlobalState/store";
import SingleProductBtn from "../Buttons/SingleProductBtn/SingleProductBtn";
import Link from "next/link";
import { StoreContext, StoreContextType } from "@/GlobalState/store";

const SearchBar = () => {
  const context = useContext<StoreContextType>(StoreContext);
  const { actions, state } = context;
  const { userData } = state;
  const { toggleSearchModal, toggleProductModal, toggleToBeVendor } = actions;

  return (
    <section
      className="smallDesktop:top-[80px] max-smallDesktop:top-[50px] left-0 fixed w-full flex flex-col justify-center items-center z-[9] bg-[#fff]
     max-sidebar-bk:bg-[#000]"
    >
      <section className="max-sidebar-bk:hidden smallDesktop:mb-[15px] w-[92vw] max-w-[400px] flex justify-between items-center rounded-[30px] h-[40px] shadow-3">
        <input
          type="text"
          placeholder="Find anything..."
          className="bg-white border-none pl-[12px] pr-[4px] h-full w-[85%] rounded-l-[30px] outline-none"
          onFocus={toggleSearchModal}
        />
        <section className="w-[15%] mr-[-2px] h-full flex justify-center items-center">
          <figure className="w-[22px] h-[22px] relative">
            <Image src={searchIcon} alt={"Search icon"} fill />
          </figure>
        </section>
      </section>

      {userData && (
        <>
          {userData?.isVendor && (
            <span className="ml-[5px] text-[#8181f3] sm:hidden py-[4px] block font-medium text-[14px]">
              Customers need you.{" "}
              <b className="underline text-[#fff]" onClick={toggleProductModal}>
                Post a product.
              </b>
            </span>
          )}

          {!userData?.isVendor && (
            <>
              <a
                href={userData?._id ? "/Onboarding" : "/Signup"}
                className="ml-[5px] text-[#8181f3] sm:hidden py-[4px] block font-medium text-[14px]"
                onClick={toggleToBeVendor}
              >
                Users are searching.{" "}
                <b className="underline text-[#fff]">Start selling today!</b>
              </a>
            </>
          )}
        </>
      )}
    </section>
  );
};

export default SearchBar;
