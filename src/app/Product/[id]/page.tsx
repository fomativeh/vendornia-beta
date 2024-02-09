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
import { getProductIdFromRoute } from "@/helpers/getProductIdFromRoute";
export type reactionIconsType = {
  type: string;
  icon: string;
};

export async function generateMetadata({ params }: { params: { id: string } }) {
  const singleProductDataRes: any = await fetchSingleProduct(params.id);

  let productData = singleProductDataRes.data.data;
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
          width: 1200, // Adjusted width for 1.91:1 aspect ratio
          height: 630, 
        },
      ],
    },

    pin: {
      media: productData.images[0],
      description: productData.title,
    },

    // Additional metadata for Telegram
    telegram: {
      title: productData.title,
      description: productData.description,
      image: productData.images[0],
    },


  };
}

const ProductPage = () => {
  return <ProductComponent />;
};

export default ProductPage;
