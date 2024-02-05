"use client";
import uploadIcon from "@/../public/assets/icons/upload.svg";
import publishIcon from "@/../public/assets/icons/publish.svg";
import { handleMultipleUpload } from "@/helpers/handleImageUpload";
import Image from "next/image";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useContext,
} from "react";
import toast from "react-hot-toast";
import { createProduct, updateProduct } from "@/APIs/product";
import { handleApiRes, handleEmptyRes } from "@/utils/handleApiRes";
import { fetchAllCategories } from "@/APIs/category";
import { StoreContext, StoreContextType } from "@/GlobalState/store";
import { fetchVendorProducts } from "@/APIs/vendor";

type inputType = {
  type?: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  label: string;
  placeholder: string;
};

const Input = ({ type, value, placeholder, setValue, label }: inputType) => {
  return (
    <section className="w-full flex flex-col justify-start items-start my-[12px]">
      <label htmlFor={label} className="mb-[7px] font-bold">
        {label}
      </label>
      {type && type == "textarea" ? (
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          id={label}
          className="w-full border-[2px] border-[#000] pt-[10px] pl-[10px] rounded-[12px] max-w-full min-w-full min-h-[90px] h-[120px] max-h-[200px]"
          placeholder={placeholder}
        />
      ) : (
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type={label == "Price" ? "number" : "text"}
          id={label}
          className="w-full border-[2px] border-[#000] pl-[10px] rounded-[12px] h-[45px]"
          placeholder={placeholder}
        />
      )}
    </section>
  );
};

const EditProduct = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [customCategory, setCustomCategory] = useState<string>("");
  const componentRef = useRef<HTMLDivElement>(null);
  const context = useContext<StoreContextType>(StoreContext);
  const { state } = context;
  const { actions } = context;
  const { userData } = state;
  const currentProduct = state.productToEdit;
  const toggleModal = context.actions.toggleEditModal;
  const modalOpen = context.state.productModalOpen;
  const accessToken = JSON.parse(localStorage.getItem("accessToken") as string);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);

  const fetchProductsForVendorTab = async () => {
    try {
      const fetchProductsRes = await fetchVendorProducts(state.userData._id);
      const productsData = handleApiRes(fetchProductsRes, toast);
      actions.updateVendorDetails({ products: productsData });
    } catch (error) {
      console.log(error);
      toast.error("Couldn't load your products. Please reload and retry.");
    }
  };

  useEffect(() => {
    if (modalOpen) {
      window.scrollTo(0, 0);
    }
  }, [modalOpen]);

  const validateForm = () => {
    if (!title || !description || !price) {
      toast.error("Please fill all fields.");
      return false;
    }

    if (!category && !customCategory) {
      toast.error("Please select or specify a category.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      const chosenCategory = category.trim() !== "" ? category : customCategory;
      const updateData = {
        sellerId: userData._id,
        description,
        title,
        price,
        category:chosenCategory,
        accessToken
      }
      const productId = currentProduct._id;

      try {
        const loadingToast = toast.loading("Updating product. Please wait...");
        const updateProductRes = await updateProduct(updateData, productId);
        toast.dismiss(loadingToast);
        const updateRes = handleEmptyRes(updateProductRes, toast);

        //Clear form
        if (updateRes) {
          toast.success("Product updated.");
          toggleModal();
          fetchProductsForVendorTab();
        }
      } catch (error) {
        toast.error("Couldn't update this product. Please retry.");
      }
    }
  };

  const fetchCategories = async () => {
    try {
      const fetchCategoriesRes = await fetchAllCategories();
      // console.log(fetchCategoriesRes)
      const categoriesData = handleApiRes(fetchCategoriesRes, toast);
      if (categoriesData) {
        setAvailableCategories(categoriesData);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const setFormValues = useCallback(() => {
    setTitle(currentProduct.title);
    setDescription(currentProduct.description);
    setPrice(currentProduct.price);
    setCategory(currentProduct.category);
  },[currentProduct.title, currentProduct.description, currentProduct.price, currentProduct.category])

  useEffect(() => {
    setFormValues();
  }, [currentProduct, setFormValues]);

  return (
    <section className="min-w-full min-h-full absolute top-0 left-0 flex justify-center items-center bg-[#000000] z-[99] pt-[77px] overflow-y-auto">
      <span
        className="absolute top-[50px] right-[70px] text-[#fff] font-bold text-[35px] cursor-pointer hidden smallDesktop:block"
        onClick={toggleModal}
      >
        X
      </span>
      <section
        className="flex p-[25px] rounded-[30px] bg-[#fff] w-[95%] max-w-[450px] mb-[150px]"
        ref={componentRef}
      >
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="w-full flex flex-col justify-start items-start"
        >
          <section className="mb-[10px] w-full flex justify-between items-center">
            <h1 className="text-[blue] font-bold m-0 text-[20px]">
              Edit product
            </h1>
            <span
              className="font-bold text-[20px] smallDesktop:hidden cursor-pointer"
              onClick={toggleModal}
            >
              X
            </span>
          </section>
          <Input
            value={title}
            setValue={setTitle}
            label={"Title"}
            placeholder={"ex: Gucci bag, uk used"}
          />
          <Input
            value={description}
            setValue={setDescription}
            label={"Description"}
            type="textarea"
            placeholder={"Write description..."}
          />

          <Input
            value={price}
            setValue={setPrice}
            label={"Price"}
            placeholder={"ex:25000"}
          />

          {availableCategories && availableCategories?.length > 0 && (
            <section className="w-full flex flex-col justify-start items-start my-[12px]">
              <label htmlFor="category" className="mb-[7px] font-bold">
                Product Category
              </label>
              <select
                name="category"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#000] cursor-pointer font-bold outline-none text-[#fff] py-[10px] rounded-[12px] px-[10px]"
              >
                <option value="">Select a category</option>
                {availableCategories.map((eachCategory, i) => (
                  <option key={i} value={eachCategory}>
                    {eachCategory[0].toUpperCase() +
                      eachCategory.substring(1).toLowerCase()}
                  </option>
                ))}
              </select>
            </section>
          )}

          {category == "" && (
            <Input
              value={customCategory}
              setValue={setCustomCategory}
              label={
                "Enter desired category below if not available in the list above."
              }
              placeholder={"Write your own category..."}
            />
          )}
          <section className="w-full flex justify-between items-center mt-[12px]">
            <button
              type="submit"
              className="border-[none] text-[#fff] w-[47%] h-[44px] rounded-[12px] bg-[#000]"
            >
              Update
            </button>
            <button
              onClick={toggleModal}
              type="reset"
              className="border-[none] text-[#fff] w-[47%] h-[44px] rounded-[12px] bg-[#000]"
            >
              Cancel
            </button>
          </section>
        </form>
      </section>
    </section>
  );
};

export default EditProduct;
