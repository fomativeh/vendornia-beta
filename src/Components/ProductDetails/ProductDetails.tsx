import { formatPrice } from "@/helpers/formatPrice";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import SingleProductBtn from "../Buttons/SingleProductBtn/SingleProductBtn";

type ProductImageProps = {
  currentImage: string;
  setCurrentImage: (data: string) => void;
  image: string;
};
const ProductImage = ({
  currentImage,
  setCurrentImage,
  image,
}: ProductImageProps) => {
  return (
    <figure
      onClick={() => setCurrentImage(image)}
      className={`cursor-pointer w-[12%] pt-[12%] mr-[12px] relative ${
        currentImage == image && `border-[3px] border-themeBlue`
      }`}
    >
      <Image src={image} alt={"Product image"} fill />
    </figure>
  );
};

const ProductDetails = ({ productData }: { productData: any }) => {
  const [images, setImages] = useState<string[]>(productData?.images);
  const [currentImage, setCurrentImage] = useState<string>(images[0]);
  const [expand, setExpand] = useState<boolean>(false);

  return (
    <section className="max-tabletX:w-full w-[55%] flex flex-col justify-start items-center">
      <figure className="w-full h-[270px] relative rounded-[10px]">
        <Image
          src={currentImage}
          alt={"Product image"}
          fill
          className="rounded-[inherit]"
        />
      </figure>
      <section className="w-full flex justify-start items-center mt-[15px]">
        {images?.length > 0 &&
          images?.map((eachImage, i) => {
            return (
              <ProductImage
                key={i}
                image={eachImage}
                currentImage={currentImage}
                setCurrentImage={setCurrentImage}
              />
            );
          })}
      </section>

      <section className="w-full flex flex-col justify-start items-center">
        <section className="w-full flex justify-between items-center my-[20px]">
          <span className="text-[18px] text-themeBlue font-bold">
            NGN {formatPrice(productData?.price)}
          </span>
          <Link href={"/"} className="w-fit">
            <SingleProductBtn text={"Contact Seller"} />
          </Link>
        </section>

        <section className="w-full flex flex-col justify-start items-start">
          <p className="font-bold text-[18px]">{productData?.title}</p>
          <span className="text-[#525252] text-[15px] mt-[10px] h-fit overflow-y-hidden">
            {expand
              ? `${productData?.description}`
              : productData?.description?.slice(0, 250) + "..."}

            <b onClick={() => setExpand(!expand)} className="cursor-pointer">
              {expand ? " See less" : " See more"}
            </b>
          </span>
        </section>
        <section className="w-full my-[17px] flex justify-start items-center text-[14px]">
          <span className="font-medium mr-[8px]">Sold by:</span>
          <p
            onClick={(e) => {
              e.preventDefault();
              window.open(
                `http://localhost:3000/Vendor/${productData.sellerId}`,
                "_self"
              );
            }}
            className="underline cursor-pointer"
          >
            {productData?.vendorName?.length > 15
              ? productData?.vendorName?.slice(0, 25) + "..."
              : productData?.vendorName}
          </p>
        </section>
      </section>
    </section>
  );
};

export default ProductDetails;
