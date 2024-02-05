import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const DropModal = ({
    dropOpen,
    setDropOpen,
    setCurrentTag,
    tags,
    ref,
  }: {
    dropOpen: boolean;
    setDropOpen: any;
    setCurrentTag: any;
    tags: string[];
    ref: any;
  }) => {
    return (
      <section
        ref={ref}
        className="shadow-2 w-fit min-w-[100px] z-[999] absolute left-0 top-[38px] bg-themeBlue rounded-[10px] flex flex-col justify-start items-start"
      >
        {tags.map((e, i) => {
          return (
            <span
              key={i}
              onClick={() => {
                setDropOpen(!dropOpen);
                setCurrentTag(e);
              }}
              className={` ${i == 0 && `rounded-t-[inherit] pt-[5px]`} ${
                i == tags.length - 1 && `rounded-b-[inherit] pb-[5px]`
              }  block w-full text-[#fff] hover:bg-[#fff] hover:text-themeBlue cursor-pointer py-[3px] pl-[8px]`}
            >
              {e}
            </span>
          );
        })}
      </section>
    );
  };
  
const Dropdown = ({
    type,
    setCurrentValue,
  }: {
    type: string;
    setCurrentValue: any;
  }) => {
    let tags =
      type == "Filter"
        ? ["All", "Verified", "Unverified"]
        : ["Created", "Popularity"];
  
    const [dropOpen, setDropOpen] = useState<boolean>(false);
    const [currentTag, setCurrentTag] = useState<string>(
      type == "Filter" ? "All" : "Created"
    );
  
    const dropdownRef = useRef<HTMLDivElement>(null);
  
    const handleDocumentClick = useCallback( (event: MouseEvent) => {
      // Check if the dropdown is open and if the click is outside the dropdown
      if (
        dropOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropOpen(false);
      }
    },[dropOpen, dropdownRef, setDropOpen])
  
    useEffect(() => {
      document.addEventListener("click", handleDocumentClick);
  
      return () => {
        document.removeEventListener("click", handleDocumentClick);
      };
    }, [handleDocumentClick, dropOpen]);
  
    const handleDropdownClick = () => {
      setDropOpen(!dropOpen);
    };
  
    // Initialize the global (filter or sort) value
    setCurrentValue(currentTag);
  
    // Set the global (filter or sort) value whenever a dropdown list item is selected
    useEffect(() => {
      setCurrentValue(currentTag);
    }, [currentTag, setCurrentValue]);
  
    return (
      <section
        ref={dropdownRef}
        onClick={handleDropdownClick}
        className="relative flex items-center justify-start bg-[#fff] rounded-[20px] py-[4px] px-[5px] cursor-pointer"
      >
        <span className="text-[14px] font-semibold text-themeBlue">
          {currentTag}
        </span>
        <section className="bg-themeBlue p-[4px] rounded-[50px] ml-[5px]">
          <figure className="w-[12px] h-[12px] relative">
            <Image
              src={"/assets/icons/drop-icon-white.svg"}
              alt={"Dropdown icon"}
              fill
            />
          </figure>
        </section>
        {dropOpen && (
          <DropModal
            ref={dropdownRef}
            tags={tags}
            dropOpen={dropOpen}
            setDropOpen={setDropOpen}
            setCurrentTag={setCurrentTag}
          />
        )}
      </section>
    );
  };

  export default Dropdown