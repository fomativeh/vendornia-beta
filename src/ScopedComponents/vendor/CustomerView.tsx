import React, { useContext } from "react";
import TopProductsCard from "./TopProductsCard";
import Image from "next/image";
import { StoreContext, StoreContextType } from "@/GlobalState/store";
import ProductCard from "@/Components/ProductCard/ProductCard";
import ProductCategory from "@/Components/ProductCategory/ProductCategory";
import SingleItemCard from "./SingleItemCard";

type props = {
  collections: any[];
  unCategorized: any[];
  productGroups: any[];
  collectionsRef: any;
  sellerId: string;
};

type collectionsType = {
  category: string;
  categoryImage: string;
};

const CustomerView = ({
  collections,
  collectionsRef,
  productGroups,
  sellerId,
  unCategorized,
}: props) => {
  const context = useContext<StoreContextType>(StoreContext);
  const { actions } = context;
  const toggleProductModal = actions.toggleProductModal;
  return (
    <>
      {collections?.length > 0 && (
        <section className="ml-[15px] w-fit max-w-full rounded-[10px] flex flex-col justify-start items-start mt-[10px] mb-[25px]">
          {/* <span className="text-[#fff] font-semibold text-[15px] my-[5px] bg-[#000] p-[5px] px-[12px] rounded-[7px]">
            Our Collections
          </span> */}
          <section className="w-full mt-[4px] flex flex-wrap justify-start items-center">
            {collections.map((eachCollection: collectionsType, i: number) => {
              return (
                <TopProductsCard
                  key={i}
                  category={eachCollection.category}
                  categoryImage={eachCollection.categoryImage}
                />
              );
            })}
          </section>
        </section>
      )}

      {unCategorized.length > 0 && (
        <section className="mt-[10px] w-[92%] flex flex-col justify-start items-start ml-[15px]">
          <span className="text-[18px] font-bold m-0">Single items</span>
          <section className="my-[12px] w-full flex justify-start items-start flex-wrap">
            {unCategorized.map((eachProduct: any, i: number) => {
              return <SingleItemCard key={i} productData={eachProduct} />;
            })}
          </section>
        </section>
      )}

      <section className="flex flex-col justify-start items-center w-[95%] pb-[50px]">
        {productGroups.length > 0 &&
          productGroups.map((eachProductGroup: any, i: number) => {
            console.log(eachProductGroup);
            return (
              <div
                key={i}
                id={`${eachProductGroup.category}`}
                className="w-full"
                ref={collectionsRef}
              >
                <ProductCategory
                  key={i}
                  vendorPage={true}
                  productsCategory={eachProductGroup.category}
                  sellerId={sellerId}
                  items={eachProductGroup.products}
                />
              </div>
            );
          })}
      </section>

      {unCategorized.length == 0 && productGroups.length == 0 && (
        <section className="w-full flex justify-center items-center mb-[95px]">
          <section className="flex justify-center items-center bg-[#000] rounded-[15px] px-[50px] py-[30px]">
            <figure className="relative w-[200px] h-[250px] mr-[60px]">
              <Image
                alt={"Empty cart"}
                fill
                src={"/assets/images/empty-cart.svg"}
              />
            </figure>
            <section className="flex flex-col justify-start items-center">
              <span className="text-[#fff] mb-[22px] font-bold text-[20px]">
                You have no products yet.
              </span>
              <button
                onClick={toggleProductModal}
                className="border-none bg-[#fff] text-[#000] hover:bg-[blue] px-[20px] py-[12px] rounded-[12px] font-bold hover:text-[#fff]"
              >
                Post your frst item.
              </button>
            </section>
          </section>
        </section>
      )}
    </>
  );
};

export default CustomerView;
