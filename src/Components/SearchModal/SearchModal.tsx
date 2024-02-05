import React, { useEffect, useRef, useState, ChangeEvent, useContext } from "react";
import Image from "next/image";
import backIcon from "../../../public/assets/icons/back-arrow.svg";
import searchIcon from "../../../public/assets/icons/search.svg";
import clearIcon from "../../../public/assets/icons/clear.svg";
import { StoreContext, StoreContextType } from "@/GlobalState/store";
// import { useAppStore } from "@/GlobalState/store";

const SearchModal = () => {
  const context = useContext<StoreContextType>(StoreContext)
  const {actions} = context
  const toggleSearchModal = actions.toggleSearchModal
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [query, setQuery] = useState<string>("");
  const [showClearIcon, setShowClearIcon] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setShowClearIcon(!!value);
  };

  const handleClearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      setQuery("");
      inputRef.current.focus();
      setShowClearIcon(false);
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  

  return (
    <div className="absolute w-full h-full z-[10] top-0 left-0">
      <div className="w-full h-full bg-[#000000ef] flex justify-center items-center relative">
        <span
          className="absolute top-[50px] right-[70px] text-[#fff] font-bold text-[35px] cursor-pointer hidden tablet:block"
          onClick={toggleSearchModal}
        >
          X
        </span>
        <div className="w-full tablet:w-[50vw] max-w-[500px] tablet:h-[70vh] h-full bg-[#fff] flex flex-col justify-start items-center pt-[10px]">
          <div className="w-full flex justify-start items-center pl-[15px] pr-[10px] h-[65px]">
            <div
              className="w-[30px] h-[30px] relative mr-[10px] tablet:hidden cursor-pointer"
              onClick={toggleSearchModal}
            >
              <Image src={backIcon} alt={"Back icon"} fill />
            </div>

            <div className="flex flex-grow justify-between items-center h-[70%] rounded-[50px] shadow-3 pl-[15px] pr-[10px]">
              <div className="w-[17px] h-[17px] relative mr-[10px]">
                <Image src={searchIcon} alt={"Search icon"} fill />
              </div>
              <input
                type="text"
                className="h-full border-none flex-grow pr-[20px] outline-none rounded-r-[inherit]"
                placeholder="Find anything..."
                value={query}
                onChange={handleInputChange}
                ref={inputRef}
              />

              {showClearIcon && (
                <div
                  className="w-[22px] h-[22px] flex justify-center items-center rounded-[50px] shadow-3 cursor-pointer"
                  onClick={handleClearInput}
                >
                  <div className="w-[10px] h-[10px] relative">
                    <Image src={clearIcon} alt={"Clear icon"} fill />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
