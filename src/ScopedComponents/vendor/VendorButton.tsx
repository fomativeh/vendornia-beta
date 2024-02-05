import Image from "next/image";

const VendorButton = ({
    text,
    alt,
    icon,
  }: {
    text: string;
    alt: string;
    icon: string;
  }) => {
    return (
      <button
        className={`border-none bg-themeBlue px-[10px] py-[8px] rounded-[5px] cursor-pointer text-[#fff] flex items-center ${
          text == "Contact Vendor" && `mr-[10px]`
        }`}
      >
        <span className="text-[#fff] font-bold mr-[7px] text-[12px]">{text}</span>
        <figure className="relative w-[18px] h-[18px]">
          <Image src={icon} alt={alt} fill />
        </figure>
      </button>
    );
  };
  
export default VendorButton