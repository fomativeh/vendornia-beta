import React from "react";

const SingleProductBtn = ({ text, fill }: { text: string, fill?:boolean }) => {
  return (
    <button
      className={`px-[15px] sm:px-[16px] py-[9px] sm:py-[12px] ${fill && `w-full`}
    rounded-[20px] bg-themeBlue text-[#fff] hover:bg-[white] 
    text-[14px] sm:text-[17px] font-bold hover:text-themeBlue hover:border-[1px] hover:border-themeBlue cursor-pointer`}
    >
      {text}
    </button>
  );
};

export default SingleProductBtn;
