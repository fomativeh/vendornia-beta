import { scrollToSection } from "@/helpers/scrollToSection";
import Image from "next/image";

const TopProductsCard = ({
  category,
  categoryImage,
}: {
  category: string;
  categoryImage: string;
}) => {
  return (
    <section
      className="block max-tablet:w-[95px] max-tablet:w-[95px] h-[120px] w-[120px] mr-[15px] rounded-[20px]"
      onClick={() => scrollToSection(`${category}`, 70)}
    >
      <figure className="relative w-full h-full rounded-[10px]">
        <Image
          src={categoryImage}
          alt={"Collection image"}
          fill
          className="rounded-[inherit]"
        />
        <section
          className="rounded-[inherit] 
          cursor-pointer absolute w-full h-full top-0 left-0 bg-[#0000005f] flex justify-center items-center"
        >
          <span className="bg-[#fff] text-[#000] px-[10px] font-bold py-[4px] text-[12px] rounded-[15px]">
            {category}
          </span>
        </section>
      </figure>
    </section>
  );
};

export default TopProductsCard;
