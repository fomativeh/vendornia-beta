import { formatPrice } from "@/helpers/formatPrice";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";

type ProductCardProps = {
  image: string;
  title: string;
  price: string;
  vendorName: string;
  vendorPage: Boolean;
  id:string
};
const ProductCard = ({
  image,
  title,
  price,
  vendorName,
  vendorPage,
  id
}: ProductCardProps) => {
  return (
    <Link href={`/Product/${id}`}
      className="cursor-pointer border-[#fff] border-[1px] 
          hover:border-[1px] hover:border-[#00007F] m-[5px]
           w-fit h-fit flex flex-col justify-start items-center rounded-[14px] shadow-2 max-sm:mr-[10px] p-[10px]"
    >
      <figure className="min-w-[110px] max-w-[160px] w-[25vw] h-[25vw] min-h-[110px] max-h-[160px] relative rounded-[inherit]">
        <Image
          src={image}
          alt={"Product image"}
          className="rounded-[inherit]"
          fill
        />
      </figure>

      <section className="min-w-[110px] max-w-[160px] w-[25vw] flex flex-col justify-start items-start mt-[10px]">
        <span className="text-[#263238] font-semibold max-X2:text-[14px] max-sm:text-[12px]">
          {title}
        </span>

        <span className= {`${vendorPage? `mt-[6px]`:`my-[6px]`} text-[14px] text-[#00007F] font-bold`}>
          #{formatPrice(price)}
        </span>

        {!vendorPage && (
          <section className="w-full flex justify-start items-center">
            <figure className="relative w-[15px] h-[15px] mr-[5px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 72 68"
                fill="none"
                className="h-full w-full"
              >
                <path
                  d="M70.3501 13.7859L62.7676 1.73984C62.0928 0.664062 60.8886 0 59.605 0H12.3899C11.1063 0 9.90207 0.664062 9.22719 1.73984L1.63149 13.7859C-2.28545 20.0016 1.18157 28.6477 8.49938 29.6437C9.0287 29.7102 9.57125 29.75 10.1006 29.75C13.5544 29.75 16.6244 28.2359 18.7284 25.8984C20.8325 28.2359 23.9025 29.75 27.3563 29.75C30.8101 29.75 33.8801 28.2359 35.9842 25.8984C38.0882 28.2359 41.1583 29.75 44.6121 29.75C48.0791 29.75 51.1359 28.2359 53.2399 25.8984C55.3572 28.2359 58.414 29.75 61.8678 29.75C62.4103 29.75 62.9397 29.7102 63.469 29.6437C70.8133 28.6609 74.2935 20.0148 70.3633 13.7859H70.3501ZM64.0115 33.8539H63.9983C63.2969 33.9469 62.5824 34 61.8546 34C60.2137 34 58.639 33.7477 57.1701 33.2961V51H14.8247V33.2828C13.3426 33.7477 11.7547 34 10.1138 34C9.38599 34 8.65818 33.9469 7.95683 33.8539H7.9436C7.40105 33.7742 6.87173 33.6813 6.35565 33.5484V51V59.5C6.35565 64.1883 10.1535 68 14.8247 68H57.1701C61.8413 68 65.6392 64.1883 65.6392 59.5V51V33.5484C65.1099 33.6813 64.5805 33.7875 64.0115 33.8539Z"
                  fill="#5a5a5a"
                  className="w-full h-full"
                />
              </svg>
            </figure>
            <span className="text-[12px] font-semibold max-sm:text-[10px]">
              {vendorName}
            </span>
          </section>
        )}
      </section>
    </Link>
  );
};

export default ProductCard;
