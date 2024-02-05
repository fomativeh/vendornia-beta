import Image from "next/image";
import React from "react";

const PopularVendorCard = () => {
  return (
    <section
      className="w-[100px] h-[100px] m-[10px] rounded-[10px] flex flex-col 
          justify-start items-center py-[7px] cursor-pointer border-[#fff] border-[2px] hover:bg-[#fff] pvc"
    >
      <figure className="vAvatar w-[40px] h-[40px] relative  border-[2px] rounded-[50px] border-[#fff]">
        <Image
          src={"/assets/images/woman.jpg"}
          alt={"Vendor logo"}
          fill
          className="rounded-[inherit]"
        />
      </figure>
      <span className="vn font-bold text-[10px] text-[#9797f9] mt-[5px] block text-center w-[80%]">
       {"Joy's collections"}
      </span>
      <span className="text-[9px] text-[#fff] font-medium mt-[5px] vc">
        {"19,500 visits"}
      </span>
    </section>
  );
};

export default PopularVendorCard;
