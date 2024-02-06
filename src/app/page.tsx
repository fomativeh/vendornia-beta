"use client";
import { fetchAllHomepageProducts } from "@/APIs/product";
import AddProduct from "@/Components/AddProduct/AddProduct";
import BottomNav from "@/Components/BottomNav/BottomNav";
import MoreBtn, { MoreBtnLight } from "@/Components/MoreBtn/MoreBtn";
import Navbar from "@/Components/Nabvar/Navbar";
import PopularVendorCard from "@/Components/PopularVendorCard/PopularVendorCard";
import ProductCategory from "@/Components/ProductCategory/ProductCategory";
import SearchBar from "@/Components/SearchBar/SearchBar";
import MobileSidebar from "@/Components/Sidebar/MobileSidebar";
import Sidebar from "@/Components/Sidebar/Sidebar";
import { StoreContext, StoreContextType } from "@/GlobalState/store";
import { arrangeProductsInGroups } from "@/helpers/arrangeProductsInGroups";
import { UseAuth } from "@/hooks/UseAuth";
import { handleApiRes } from "@/utils/handleApiRes";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export type arrangedProductsType = {
  category: string;
  products: any[];
};

export default function Home() {
  const context = useContext<StoreContextType>(StoreContext);
  const { state } = context;
  const productModalOpen = state.productModalOpen;
  const [allProducts, setAllProducts] = useState<any[]>([]);

  const [arrangedProducts, setArrangedProducts] = useState<
    arrangedProductsType[]
  >([]);

  const loadAllProducts = async () => {
    const loadingToast = toast.loading("Loading products");
    try {
      const loadProductsRes = await fetchAllHomepageProducts();
      toast.dismiss(loadingToast);
      const loadedProducts = handleApiRes(loadProductsRes, toast);
      if (loadedProducts) {
        setAllProducts(loadedProducts);
      }
    } catch (error) {
      toast.error("An error occured. Please retry.");
      console.log(error);
    }
  };

  useEffect(() => {
    loadAllProducts();
  }, []);

  useEffect(() => {
    if (allProducts.length > 0) {
      arrangeProductsInGroups(allProducts, setArrangedProducts);
    }
  }, [allProducts]);
  return (
    <main className="flex flex-col justify-start items-end min-h-screen bg-[#ffffff] w-full">
      <Toaster
        toastOptions={{
          className: "",
          style: {
            backgroundColor: "#00007F",
            color: "#fff",
          },
        }}
      />
      <UseAuth />
      <Navbar />
      {/* <SearchBar /> */}
      <Sidebar />
      <MobileSidebar />
      <BottomNav />
      {productModalOpen && <AddProduct />}
      <section
        className={`page-content flex flex-col justify-start items-center relative pb-[70px] pt-[80px] ${
          productModalOpen && `hidden`
        }`}
      >
        {/* BANNER SECTION */}
        <section className="banner-wrap w-full flex justify-between items-center h-[300px] max-sm:hidden">
          {/* Banner */}
          <section className="banner-1 w-[60%] h-full bg-[#b9b9fb] rounded-[20px] flex items-center justify-center p-[25px]">
            <section className="w-[40%] h-full flex flex-col justify-center items-start mr-[30px]">
              <h1 className="text-[27px] font-bold text-[#101010]">
                Find all the products you need.
              </h1>
              <p className="mb-[20px] text-white font-semibold text-[20px]">
                Our vendors sell everything.
              </p>
              <button className="border-none bg-[#00007F] text-[#fff] py-[15px] px-[25px] rounded-[10px] font-semibold">
                See our vendors
              </button>
            </section>
            <figure className="relative w-[45%] h-full">
              <Image
                alt={"Shop illustration"}
                src={"/assets/banners/vendor-cart.svg"}
                fill
              />
            </figure>
          </section>

          {/*Popular Vendors */}
          <section className="popular relative w-[35%] h-full bg-[#1B1B4E] mr-[20px] rounded-[20px] flex flex-col justify-start items-start px-[20px] py-[12px]">
            {/* Coming soon banner */}
            <section className="rounded-[inherit] absolute top-0 left-0 w-full h-full bg-[#191818be] flex justify-center items-center">
              <section className="p-[20px] rounded-[20px] bg-themeBlue w-[70%] min-w-[250px] z-[9]">
                <h1 className="text-[#ffffff] font-bold m-0 mb-[20px] ">
                  Coming soon
                </h1>
                <p className="text-[#c5c5f4]">
                  Keep sharing your store with customers and friends!
                </p>
              </section>{" "}
            </section>

            <section className="flex justify-start items-center mb-[5px]">
              <h2 className="text-[#fff] font-bold">Most visited vendors</h2>
              <MoreBtnLight text="See more" />
            </section>
            <section className="w-full h-[fit] flex justify-start items-center flex-wrap">
              <PopularVendorCard />
              <PopularVendorCard />
              <PopularVendorCard />
              <PopularVendorCard />
            </section>
          </section>
        </section>

        {/*  */}
        {arrangedProducts?.length > 0 &&
          arrangedProducts.map(
            (eachGroup: arrangedProductsType, index: number) => {
              return (
                <ProductCategory
                  vendorPage={false}
                  key={index}
                  items={eachGroup.products}
                  productsCategory={eachGroup.category}
                />
              );
            }
          )}
      </section>
    </main>
  );
}
