import React, { useContext, useState, useEffect } from "react";
import ItemRow from "./ItemRow";
import { StoreContext } from "@/GlobalState/store";
import { fetchVendorProducts } from "@/APIs/vendor";
import { handleApiRes } from "@/utils/handleApiRes";
import toast from "react-hot-toast";
import { capitalizeFirstLetter } from "fomautils";
import Image from "next/image";
import { firstLetterLowerCase } from "@/helpers/firstLetterLowercase";

type props = {
  toggleProductModal: () => void;
};
const MyProducts = ({ toggleProductModal }: props) => {
  const context = useContext(StoreContext);
  const { state } = context;
  const { actions } = context;
  const [isSearching, setIsSearchIng] = useState<boolean>(false);
  const [matchedSearch, setMatchedSearch] = useState<any[]>([]);
  // const { products } = ;
  const fetchProductsForVendorTab = async () => {
    try {
      const fetchProductsRes: any = await fetchVendorProducts(
        state.userData._id
      );
      const productsData = handleApiRes(fetchProductsRes, toast);
      if (productsData) {
        actions.updateVendorDetails({ products: productsData });
      }
    } catch (error) {
      console.log(error);
      toast.error("Couldn't load your products. Please reload and retry.");
    }
  };

  const allProducts = state.userData?.vendorDetails?.products;
  const [productsRendered, setProductsRendered] = useState<any[]>([
    ...state.userData?.vendorDetails?.products,
  ]);
  const [filter, setFilter] = useState<string>("All");
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    setIsSearchIng(false);
    setQuery("");
    if (filter !== "All") {
      return setProductsRendered(
        allProducts.filter((e: any) => e.category.includes(filter))
      );
    }

    setProductsRendered([...state.userData?.vendorDetails?.products]);
  }, [filter, allProducts, state.userData?.vendorDetails?.products]);

  useEffect(() => {
    setProductsRendered([...state.userData?.vendorDetails?.products]);
  }, [state.userData?.vendorDetails?.products]);

  const computeCategories = () => {
    let allCategories: string[] = [];
    allProducts.forEach((each: any, i: number) => {
      allCategories.push(each.category);
    });

    allCategories = [...new Set(allCategories)];
    return allCategories;
  };
  const categories = computeCategories();

  useEffect(() => {
    if (query.length == 0) {
      setIsSearchIng(false);
      return setMatchedSearch([]);
    }

    setIsSearchIng(true);
    setMatchedSearch(productsRendered.filter((e) => e.title.includes(query)));
  }, [productsRendered, query]);

  return (
    <section className="w-full flex flex-col justify-start items-center">
      <section className="w-full max-tablet:flex-col flex justify-start items-center h-[100px] max-tablet:h-fit max-tablet:mt-[15px] max-tablet:mb-[20px]">
        {/* Search field (full width below 640px, 60% width above 640px)*/}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="max-tablet:w-full placeholder:text-[#4e4e4e] max-tablet:text-[15px] w-[60%] h-[50px] max-tablet:h-[40px] outline-none max-tablet:pl-[12px] px-[15px] border-[2px] border-[#4e4e4e] rounded-[10px] focus:border-[blue]"
          placeholder={`Search through ${firstLetterLowerCase(filter)}...`}
        />

        {/* Filter(hidden below 640px) */}
        <section className="max-tablet:hidden flex flex-col justify-start items-start ml-[20px] w-[120px] mr-[20px]">
          <label
            htmlFor="filter-products"
            className="mb-[5px] text-[14px] font-bold"
          >
            Filter Products
          </label>
          <select
            name="filter-products"
            id="filter-products"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full cursor-pointer border border-[blue] rounded-[10px] outline-none p-[5px] text-[14px] font-bold"
          >
            <option value="All">All</option>
            {categories.map((each: string, i: number) => {
              return (
                <option key={i} value={each}>
                  {capitalizeFirstLetter(each)}
                </option>
              );
            })}
          </select>
        </section>

        {/* Add product button(Hidden below 640px) */}
        <button
          onClick={toggleProductModal}
          className={`max-tablet:hidden px-[15px] sm:px-[16px] py-[9px] sm:py-[12px] rounded-[20px] bg-themeBlue text-[#fff] hover:bg-[white] text-[14px] sm:text-[17px] font-medium hover:text-[blue] hover:border-[1px] hover:border-[blue] cursor-pointer`}
        >
          New Product
        </button>
        

        {/* Filter, and Add button(Only visible below 640px) */}

        <section className="w-full flex mt-[20px] justify-between items-center tablet:hidden">
        <section className="w-[48%] flex flex-col justify-start items-start">
          <label
            htmlFor="filter-products"
            className="mb-[5px] text-[14px] font-bold"
          >
            Filter Products
          </label>
          <select
            name="filter-products"
            id="filter-products"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full cursor-pointer border border-[blue] rounded-[10px] outline-none p-[5px] text-[14px] font-bold"
          >
            <option value="All">All</option>
            {categories.map((each: string, i: number) => {
              return (
                <option key={i} value={each}>
                  {capitalizeFirstLetter(each)}
                </option>
              );
            })}
          </select>
        </section>

        {/* Add product button(Hidden below 640px) */}
        <button
          onClick={toggleProductModal}
          className={`rounded-[14px] bg-[blue] text-[#fff] hover:bg-[white] text-[14px] h-[50px]
          w-[45%]
           sm:text-[17px] font-medium hover:text-[blue] hover:border-[1px] hover:border-[blue] cursor-pointer`}
        >
          New Product
        </button>
        </section>
      </section>

      <section className="w-full flex flex-col justify-start items-center">
        <header className="w-full flex items-center justify-evenly mt-[14px]">
          <span className="w-[23%] font-semibold">Name</span>
          <span className="w-[23%] font-semibold">Image</span>
          <span className="w-[23%] font-semibold">Price</span>
          <span className="w-[23%] font-semibold">Actions</span>
        </header>
        <section className="w-full flex flex-col justify-start items-center">
          {productsRendered &&
            productsRendered?.length > 0 &&
            !isSearching &&
            productsRendered?.map((each: any, i: number) => {
              return (
                <ItemRow
                  key={i}
                  productData={each}
                  fetchProductsForVendorTab={fetchProductsForVendorTab}
                />
              );
            })}

          {matchedSearch?.length > 0 &&
            isSearching &&
            matchedSearch?.map((each: any, i: number) => {
              return (
                <ItemRow
                  key={i}
                  productData={each}
                  fetchProductsForVendorTab={fetchProductsForVendorTab}
                />
              );
            })}

          {isSearching && matchedSearch?.length == 0 && (
            <section className="w-full flex justify-center items-center my-[35px]">
              <section className="px-[30px] py-[14px] rounded-[20px] bg-[#000] flex justify-between items-center">
                <figure className="w-[140px] h-[140px] relative mr-[22px]">
                  <Image
                    fill
                    alt={"Product unavailable"}
                    src={"/assets/images/missing.png"}
                  />
                </figure>

                <section className="flex flex-col justify-start items-center">
                <span className="text-[#fff] mb-[17px] font-bold text-[14px]">{"You don't have that product."}</span>
                <button onClick={toggleProductModal} className="border-none bg-[#fff]
                 text-[#000] hover:bg-themeBlue px-[14px] py-[7px] 
                 rounded-[9px] text-[14px] font-medium hover:text-[#fff]">Create it now.</button>
                </section>
              </section>
            </section>
          )}
        </section>
      </section>
    </section>
  );
};

export default MyProducts;
