import { formatPrice } from "@/helpers/formatPrice";
import Image from "next/image";
import React from "react";

const SingleItemCard = ({ productData }: { productData: any }) => {
  return (
    <section
      className="cursor-pointer
          hover:border-[1px] hover:border-[#00007F] m-[10px]
           w-[170px] flex flex-col justify-start items-center rounded-[14px] shadow-2 max-sm:mr-[10px]"
    >
      <figure className="w-full pt-[80%] relative rounded-t-[inherit]">
        <Image
          src={productData?.images[0]}
          alt={"Prouct image"}
          className="rounded-[inherit]"
          fill
        />
      </figure>

      <section className="w-[86%] flex flex-col justify-start items-start mt-[5px]">
        <span className="text-[#263238] font-semibold max-X2:text-[14px] max-sm:text-[12px]">
          {productData?.title}
        </span>

        <span className="my-[8px] text-[12px] text-[#00007F] font-bold">
          #{formatPrice(productData?.price)}
        </span>
      </section>
    </section>
  );
};

export default SingleItemCard;
