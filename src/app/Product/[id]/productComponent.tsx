"use client"

import { fetchSingleProduct } from '@/APIs/product';
import BottomNav from '@/Components/BottomNav/BottomNav';
import Navbar from '@/Components/Nabvar/Navbar';
import ProductDetails from '@/Components/ProductDetails/ProductDetails';
import ReviewSection from '@/Components/ReviewSection/ReviewSection';
import Sidebar from '@/Components/Sidebar/Sidebar';
import { StoreContext, StoreContextType } from '@/GlobalState/store';
import { UseAuth } from '@/hooks/UseAuth';
import { handleApiRes, handleEmptyRes } from '@/utils/handleApiRes';
import { usePathname } from 'next/navigation';
import React, { useCallback, useContext, useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { reactionIconsType } from './page';
import { getBg } from '@/helpers/getBg';
import { addReview } from '@/APIs/review';

const ProductComponent = () => {
   const context = useContext<StoreContextType>(StoreContext);
  const { userData } = context.state;
  const pathname = usePathname();
  const productId = pathname.split("/")[2];
  const [productData, setProductData] = useState<any>(null);
  const pageTitle = "My product";
  const pageUrl = "hello";
  const pageDescription = "Describe your page here";
  const heroImageUrl = +"/hero-image.jpg";
  const image = "kk";

  const fetchProductData = useCallback(async () => {
    try {
      const singleProductDataRes: any = await fetchSingleProduct(productId);
      const productData = handleApiRes(singleProductDataRes, toast);
      if (productData) {
        setProductData(productData);
      }
    } catch (error) {
      console.log(error);
    }
  }, [productId]);

  useEffect(() => {
    // setMetaTags("My vendornia site", "Just a test description", document.location.href, "https://res.cloudinary.com/vendornia/image/upload/v1702456523/o4qn2yzzmwfqg3yxh2kx.jpg")
    fetchProductData();
  }, []);

  const reactionIcons: reactionIconsType[] = [
    { type: "love", icon: "/assets/icons/love-active" },
    { type: "like", icon: "/assets/icons/like-active" },
    { type: "dislike", icon: "/assets/icons/dislike-active" },
    { type: "warn", icon: "/assets/icons/warn-active" },
  ];
  const [reaction, setReaction] = useState<string | null>(null);
  const [comment, setComment] = useState<string>("");
  const [reviewBG, setReviewBG] = useState<string>("#000");

  useEffect(() => {
    setReviewBG(getBg(reaction as string));
  }, [reaction]);

  const handleReaction = (type: string) => {
    setReaction(type);
  };

  const validateReview = () => {
    if (!reaction) {
      toast.error("Please pick a reaction.");
      return false;
    }

    if (comment == "") {
      toast.error("Please write your review before sharing.");
      return false;
    }

    return true;
  };

  const handleReviewSubmit = async (e: any) => {
    e.preventDefault();
    if (!validateReview()) return;
    const reviewData = {
      authorEmail: userData?.email,
      authorUsername: userData?.username,
      productId,
      comment,
      reaction: reaction as string,
    };

    try {
      const loadingToast = toast.loading("Sending your review. Please wait...");
      const addReviewRes = await addReview(reviewData);
      toast.dismiss(loadingToast);
      const newReviewData = handleEmptyRes(addReviewRes, toast);
      if (newReviewData) {
        toast.success("Review sent.");
        setComment("");
        setReaction(null);
        fetchProductData();
      }
    } catch (error) {
      toast.error("An error occured");
      console.log(error);
    }
  };

  return (
    <main className="w-full min-h-screen bg-primary_bg flex flex-col justify-start items-end ">
      <UseAuth />
      <Navbar />
      <Sidebar />
      <BottomNav />
      <Toaster
        toastOptions={{
          className: "",
          style: {
            backgroundColor: "#000",
            color: "#fff",
          },
        }}
      />

      {productData && (
        <section className="page-content flex flex-col justify-start items-center pt-[100px]">
          <section className="w-[95%] flex max-tabletX:flex-col justify-between max-tabletX:justify-start items-start">
            {/* Product details section */}
            <ProductDetails productData={productData} />

            {/* Review section */}
            <section className="max-tabletX:w-full w-[40%] flex flex-col justify-start items-start">
              <ReviewSection
                comment={comment}
                handleReaction={handleReaction}
                handleReviewSubmit={handleReviewSubmit}
                productData={productData}
                reaction={reaction}
                reactionIcons={reactionIcons}
                reviewBG={reviewBG}
                setComment={setComment}
              />
            </section>
          </section>

          <section className="w-full max-sidebar-bk:w-[100%]">
            {/* <ProductCategory />
            <ProductCategory />
            <ProductCategory /> */}
          </section>
        </section>
      )}
    </main>
  );
}

export default ProductComponent