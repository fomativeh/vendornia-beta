// "use client";
import Navbar from "@/Components/Nabvar/Navbar";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useContext, useCallback } from "react";
import { usePathname } from "next/navigation";
import IconButton from "@/Components/Buttons/IconButton/IconButton";
import SingleProductBtn from "@/Components/Buttons/SingleProductBtn/SingleProductBtn";
import ProductCategory from "@/Components/ProductCategory/ProductCategory";
import Sidebar from "@/Components/Sidebar/Sidebar";
import { fetchSingleProduct } from "@/APIs/product";
import { formatPrice } from "@/helpers/formatPrice";
import { handleApiRes, handleEmptyRes } from "@/utils/handleApiRes";
import toast, { Toaster } from "react-hot-toast";
import { UseAuth } from "@/hooks/UseAuth";
import BottomNav from "@/Components/BottomNav/BottomNav";
import { type } from "os";
import { addReview } from "@/APIs/review";
import { StoreContext, StoreContextType } from "@/GlobalState/store";
import ReviewCard from "@/ScopedComponents/product/ReviewCard";
import { getShadow } from "@/helpers/getShadow";
import { ReactionCount } from "@/ScopedComponents/product/ReactionCount";
import { getBg } from "@/helpers/getBg";
import ReviewSection from "@/Components/ReviewSection/ReviewSection";
import ProductDetails from "@/Components/ProductDetails/ProductDetails";
import MetaTag from "@/Components/Metadata/Metadata";
import Head from "next/head";
import { Metadata, ResolvingMetadata } from "next";
import { setMetaTags } from "@/utils/setMetaTags";
import ProductComponent from "./productComponent";
export type reactionIconsType = {
  type: string;
  icon: string;
};

export async function generateMetadata() {
  const singleProductDataRes: any = await fetchSingleProduct(
    "65796cceefe0bbeed0ad0ded"
  );

  let productData = singleProductDataRes.data.data;
  console.log(productData.title);
  return {
    title: productData.title,
    description: productData.description,
    openGraph: {
      title: productData.title,
      description: productData.description,
      url: "https://vendornia-beta.vercel.app",
      siteName: "Vendornia",
      images: [
        {
          url: productData.images[0],
          width: 800,
          height: 600,
        },
      ],
    },
  };
}

const ProductPage = () => {
  return <ProductComponent />;
};

export default ProductPage;
