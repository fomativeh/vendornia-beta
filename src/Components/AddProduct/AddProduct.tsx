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
import { createProduct } from "@/APIs/product";
import { handleApiRes } from "@/utils/handleApiRes";
import { fetchAllCategories } from "@/APIs/category";
import { StoreContext, StoreContextType } from "@/GlobalState/store";

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

const AddProduct = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<any>([]);
  const [category, setCategory] = useState<string>("");
  const [customCategory, setCustomCategory] = useState<string>("");
  const componentRef = useRef<HTMLDivElement>(null);
  const context = useContext<StoreContextType>(StoreContext);
  const userData = context.state.userData;
  const toggleModal = context.actions.toggleProductModal;
  const modalOpen = context.state.productModalOpen;
  const accessToken = JSON.parse(localStorage.getItem("accessToken") as string);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);

  useEffect(() => {
    if (modalOpen) {
      window.scrollTo(0, 0);
    }
  }, [modalOpen]);

  const removeImage = (id: string) => {
    //For image files
    const imageIndex = images.indexOf(id);
    let imageFilesCopy = [...imageFiles];
    imageFilesCopy.splice(imageIndex, 1);
    setImageFiles([...imageFilesCopy]);

    //For base64 string(preview)
    setImages(images.filter((e) => e !== id));
  };

  // useEffect(()=>{console.log(imageFiles)},[imageFiles])

  const removeDuplicateImages = () => {
    setImages((prevImages) => {
      const seen: Record<string, boolean> = {};
      return prevImages.filter((image) => {
        if (!seen[image]) {
          seen[image] = true;
          return true;
        }
        toast.error("Duplicate image removed.", { duration: 2000 });
        return false;
      });
    });
  };

  const validateForm = () => {
    if (!title || !description || !price) {
      toast.error("Please fill all fields.");
      return false;
    }

    if (images.length === 0) {
      toast.error("A product image is required.");
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
      let formData = new FormData();
      formData.append("sellerId", userData._id);
      imageFiles.forEach((image: any, index: number) => {
        formData.append(`images`, image);
      });
      formData.append("description", description);
      formData.append("title", title);
      formData.append("price", price);
      formData.append("category", chosenCategory);
      formData.append("accessToken", accessToken);
      // const productDetails = {
      //   sellerId: userData._id,
      //   // images,
      //   description,
      //   title,
      //   price,
      //   category: chosenCategory,
      //   accessToken,
      // };

      try {
        const loadingToast = toast.loading("Creating product. Please wait...");
        const createProductRes = await createProduct(formData);
        toast.dismiss(loadingToast);
        const newProductData = handleApiRes(createProductRes, toast);
        formData = new FormData()
        if (newProductData) {
          window.open(
            `http://localhost:3000/Product/${newProductData?._id}`,
            "_self"
          );
        }
      } catch (error) {
        // console.log(error);
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
              Add a product
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

          <section className="w-full">
            <input
              type="file"
              id="Product-image(s)"
              accept="image/*"
              className="hidden"
              multiple={true}
              onChange={(e) => {
                const files = e.target.files;
                handleMultipleUpload(images, e, setImages);
                let filesArray = Array.from(files || []);
                //Remove duplicate image files
                filesArray.forEach((eachFile: any) => {
                  if (imageFiles.indexOf(eachFile) !== -1) {
                    filesArray = filesArray.filter(
                      (eachFileInArray: any) => eachFileInArray !== eachFile
                    );
                  }
                });
                setImageFiles([...imageFiles, ...filesArray]);
                removeDuplicateImages();
              }}
            />

            <label
              htmlFor="Product-image(s)"
              className="flex pl-[14px] py-[10px] text-[#fff] cursor-pointer justify-start items-center w-full h-[42px] bg-[#000] rounded-[15px] mt-[4px]"
            >
              <figure className="relative w-[25px] h-[25px] mr-[15px]">
                <Image src={uploadIcon} alt={"Upload image icon"} fill />
              </figure>
              <span className="text-[14px] font-bold">Add Product Images</span>
            </label>
          </section>

          <section className="my-[12px] w-full flex flex-wrap justify-start items-center">
            {images.map((e, i) => {
              return (
                <figure
                  className="relative w-full h-[140px] mr-[15px] grow basis-[100px] max-w-[250px] rounded-[20px] my-[17px]"
                  key={i}
                >
                  <div
                    onClick={() => removeImage(e)}
                    className="absolute top-[10px] right-[10px] text-[#fff] font-bold shadow bg-[#000] z-[2] px-[12px] py-[4px] rounded-[10px] cursor-pointer"
                  >
                    x
                  </div>
                  <Image
                    src={e}
                    alt={"Upload image icon"}
                    fill
                    className="rounded-[inherit]"
                  />
                </figure>
              );
            })}
          </section>

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
          <button
            type="submit"
            className="flex justify-center items-center w-full text-[#fff] font-bold bg-[#000] border-none rounded-[12px] my-[20px] h-[45px] max-sm:opacity-[1] hover:opacity-[1] opacity-[.56]"
          >
            <figure className="relative w-[25px] h-[25px] mr-[12px]">
              <Image src={publishIcon} alt={"Post product icon"} fill />
            </figure>
            <span>Post Product</span>
          </button>
        </form>
      </section>
    </section>
  );
};

export default AddProduct;
