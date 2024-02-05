"use client";
import AddProduct from "@/Components/AddProduct/AddProduct";
import BottomNav from "@/Components/BottomNav/BottomNav";
import EditProduct from "@/Components/EditProduct/EditProduct";
import Navbar from "@/Components/Nabvar/Navbar";
import SearchModal from "@/Components/SearchModal/SearchModal";
import Sidebar from "@/Components/Sidebar/Sidebar";
import { StoreContext, StoreContextType } from "@/GlobalState/store";
import Dropdown from "@/ScopedComponents/vendors/Dropdown";
import VendorCard from "@/ScopedComponents/vendors/VendorCard";
import { UseAuth } from "@/hooks/UseAuth";
import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Toaster } from "react-hot-toast";

const VendorSearch = ({ setFilterModalOpen }: { setFilterModalOpen: any }) => {
  return (
    <section className="flex justify-between items-center rounded-[20px] sidebar-bk:hidden flex-grow mx-[12px] h-[42px] bg-[#cbcbcb] max-sm:w-full max-sm:mx-[7px] max-sm:mt-[10px]">
      <input
        type="text"
        className="max-sm:w-[90%] w-full h-full rounded-[inherit] px-[12px] bg-[inherit] outline-none placeholder:text-[#6e6e6e] placeholder:font-medium"
        placeholder="Find a vendor..."
      />

      <section
        className="bg-[#fff] w-[35px] h-[35px] rounded-[50px] cursor-pointer p-[8px] mr-[5px] sm:hidden"
        onClick={() => setFilterModalOpen(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
          viewBox="0 0 512 512"
        >
          <path
            fill="#00007f"
            d="M0 416c0 17.7 14.3 32 32 32l54.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 448c17.7 
    0 32-14.3 32-32s-14.3-32-32-32l-246.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 384c-17.7 
    0-32 14.3-32 32zm128 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM320 256a32 32 0 1 1 64 
    0 32 32 0 1 1 -64 0zm32-80c-32.8 0-61 19.7-73.3 48L32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l246.7 
    0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48l54.7 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-54.7 
    0c-12.3-28.3-40.5-48-73.3-48zM192 128a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm73.3-64C253 35.7 224.8 
    16 192 16s-61 19.7-73.3 48L32 64C14.3 64 0 78.3 0 96s14.3 32 32 32l86.7 0c12.3 28.3 40.5 48 73.3 
    48s61-19.7 73.3-48L480 128c17.7 0 32-14.3 32-32s-14.3-32-32-32L265.3 64z"
          />
        </svg>
      </section>
    </section>
  );
};

const MobileSellPrompt = () => {
  return (
    <section className="w-full flex justify-start pl-[12px] items-center sm:hidden fixed top-[45px] bg-[#000] z-[99]">
      {/* For vendor */}
      <span className="ml-[5px] text-[#8181f3] sm:hidden py-[4px] block font-medium text-[14px]">
        Customers need you.{" "}
        <b className="underline text-[#fff]">Post a product.</b>
      </span>

      {/* Users */}
      {/* <a
        href={"/Onboarding"}
        className="ml-[5px] text-[#8181f3] sm:hidden py-[4px] block font-medium text-[14px]"
      >
        Users are searching.{" "}
        <b className="underline text-[#fff]">Start selling today!</b>
      </a> */}
    </section>
  );
};

type DropdownWrapperProps = {
  setCurrentFilter: any;
  setCurrentSort: any;
};

const DropDownWrapper = ({
  setCurrentFilter,
  setCurrentSort,
}: DropdownWrapperProps) => {
  return (
    <section className="flex justify-start items-center ml-[20px] max-sidebar-bk:ml-[0px] max-sm:hidden">
      {/* Filter */}
      <section className="flex justify-start items-center bg-themeBlue rounded-[10px] px-[10px] py-[8px]">
        <span className="text-[#fff] font-semibold text-[14px]">Filter</span>
        <figure className="mx-[7px] w-[16px] h-[16px] relative">
          <Image src={"/assets/icons/filter.svg"} alt={"Fiter icon"} fill />
        </figure>

        <Dropdown type="Filter" setCurrentValue={setCurrentFilter} />
      </section>

      {/* Sort */}
      <section className="flex justify-start items-center bg-themeBlue rounded-[10px] px-[10px] py-[8px] ml-[20px] max-sidebar-bk:ml-[12px]">
        <span className="text-[#fff] font-semibold text-[14px]">Sort</span>
        <figure className="mx-[7px] w-[18px] h-[18px] relative">
          <Image src={"/assets/icons/sort.svg"} alt={"Sort icon"} fill />
        </figure>

        <Dropdown type="Sort" setCurrentValue={setCurrentSort} />
      </section>
    </section>
  );
};

type FilterModalProps = DropdownWrapperProps & {
  setFilterModalOpen: any;
};

const FilterModal = ({
  setCurrentFilter,
  setCurrentSort,
  setFilterModalOpen,
}: FilterModalProps) => {
  return (
    <section
      className="absolute w-[100vw] h-[100vh] bg-[#2d2d2d87] flex justify-center items-end z-[999999] sm:hidden"
      onClick={() => setFilterModalOpen(false)}
    >
      <section
        className="flex flex-col justify-start items-center bg-[#fff] w-full p-[20px]  h-[40%]"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <section className="w-full py-[10px] flex justify-between items-center mb-[26px]">
          <span className="m-0 text-[20px] font-medium">Page Settings</span>
          <section className="bg-[#000] w-[30px] h-[30px] flex justify-center items-center rounded-[50px] cursor-pointer" onClick={()=>setFilterModalOpen(false)}>
            <figure className="relative w-[18px] h-[18px]">
              <Image src={"/assets/icons/close-white.svg"} alt={"Clear icon"} fill />
            </figure>
          </section>
        </section>

        {/* Filter */}
        <section className="flex justify-start items-center bg-themeBlue rounded-[10px] px-[10px] py-[8px] mb-[10px]">
          <span className="text-[#fff] font-semibold text-[14px]">Filter</span>
          <figure className="mx-[7px] w-[16px] h-[16px] relative">
            <Image src={"/assets/icons/filter.svg"} alt={"Fiter icon"} fill />
          </figure>

          <Dropdown type="Filter" setCurrentValue={setCurrentFilter} />
        </section>

        {/* Sort */}
        <section className="flex justify-start items-center bg-themeBlue rounded-[10px] px-[10px] py-[8px]">
          <span className="text-[#fff] font-semibold text-[14px]">Sort</span>
          <figure className="mx-[7px] w-[18px] h-[18px] relative">
            <Image src={"/assets/icons/sort.svg"} alt={"Sort icon"} fill />
          </figure>

          <Dropdown type="Sort" setCurrentValue={setCurrentSort} />
        </section>
      </section>
    </section>
  );
};

const Vendors = () => {
  const context = useContext<StoreContextType>(StoreContext);
  const createModalOpen = context?.state?.productModalOpen;
  const editModalOpen = context?.state?.editModalOpen;
  const searchModalOpen = context?.state?.searchModal;
  const [currentFilter, setCurrentFilter] = useState<string>("");
  const [currentSort, setCurrentSort] = useState<string>("");
  const [filterModalOpen, setFilterModalOpen] = useState<boolean>(false);

  const disableScrolling = () => {
    document.body.style.overflowY = "hidden";
  };

  const enableScrolling = () => {
    document.body.style.overflowY = "scroll";
  };

  useEffect(() => {
    if (filterModalOpen) {
      return disableScrolling();
    }

    enableScrolling();
  }, [filterModalOpen]);

  return (
    <main className="w-full min-h-screen flex flex-col justify-start items-end bg-primary_bg">
      <UseAuth />
      <Navbar />
      <Sidebar />
      <MobileSellPrompt />
      <BottomNav />
      <Toaster />
      {filterModalOpen && (
        <FilterModal
          setCurrentFilter={setCurrentFilter}
          setCurrentSort={setCurrentSort}
          setFilterModalOpen={setFilterModalOpen}
        />
      )}
      {/* <SearchBar /> */}
      {createModalOpen && <AddProduct />}
      {editModalOpen && <EditProduct />}
      {searchModalOpen && <SearchModal />}

      <section
        className={`page-content flex flex-col justify-start items-start  pt-[130px] ${
          (createModalOpen || editModalOpen || searchModalOpen) && `hidden`
        }`}
      >
        <section
          className="max-sidebar-bk:pl-[15px] w-full fixed  max-sm:pl-[0px]
        max-sidebar-bk:left-[0px] left-[230px] max-sm:top-[69px] max-sidebar-bk:top-[60px]
        top-[80px] flex justify-start items-center pb-[12px] mb-[12px] z-[99] bg-[#fff]"
        >
          {/* Hidden on mobile devices */}
          <section className="max-sidebar-bk:hidden flex justify-start items-center bg-[#000] rounded-[10px] px-[17px] py-[14px]">
            <h2 className="m-0 text-[#fff] font-semibold text-[14px]">
              Browse our vendors
            </h2>
            <figure className="ml-[8px] w-[16px] h-[16px] relative">
              <Image
                src={"/assets/icons/Store-light.svg"}
                alt={"Store icon"}
                fill
              />
            </figure>
          </section>

          {/* Filters section*/}
          <DropDownWrapper
            setCurrentFilter={setCurrentFilter}
            setCurrentSort={setCurrentSort}
          />

          <VendorSearch setFilterModalOpen={setFilterModalOpen} />
        </section>
        <section className="w-full flex justify-start max-sidebar-bk:justify-center items-center flex-wrap">
          <VendorCard />
          <VendorCard />
          <VendorCard />
          <VendorCard />
          <VendorCard />
          <VendorCard />
          <VendorCard />
          <VendorCard />
          <VendorCard />
          <VendorCard />
          <VendorCard />
          <VendorCard />
          <VendorCard />
          <VendorCard />
          <VendorCard />
          <VendorCard />
          <VendorCard />
          <VendorCard />
          <VendorCard />
          <VendorCard />
          <VendorCard />
          <VendorCard />
          <VendorCard />
          <VendorCard />
        </section>
      </section>
    </main>
  );
};

export default Vendors;
