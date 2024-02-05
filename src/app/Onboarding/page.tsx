"use client";
import React, {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
  useContext,
} from "react";
import uploadIcon from "@/../public/assets/icons/upload.svg";
import cartIcon from "@/../public/assets/icons/cart.svg";
import Image from "next/image";
import handleImageUpload from "@/helpers/handleImageUpload";
import { StoreContext, StoreContextType } from "@/GlobalState/store";
import toast, { Toaster } from "react-hot-toast";
import { removeNonNumericCharacters } from "@/helpers/removeNonNumeric";
import { parseUsername } from "@/helpers/parseUsername";
import { useRouter } from "next/navigation";
import { createVendor } from "@/APIs/vendor";
import { handleApiRes } from "@/utils/handleApiRes";
import { UseAuth } from "@/hooks/UseAuth";

type inputProps = {
  label: string;
  placeholder: string;
  value: string;
  textarea?: boolean;
  setValue: Dispatch<SetStateAction<string>>;
};

const InputWrap = ({ children, label }: { children: any; label?: string }) => {
  return (
    <section className="w-full flex flex-col justify-start items-start mb-[30px]">
      {label && label.length > 0 && (
        <label htmlFor={label} className="font-bold mb-[5px]">
          {label}
        </label>
      )}
      {children}
    </section>
  );
};

const OnboardInputs = ({
  label,
  placeholder,
  value,
  setValue,
  textarea,
}: inputProps) => {
  return (
    <InputWrap label={label}>
      {textarea ? (
        <textarea
          placeholder={placeholder}
          id={label}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="placeholder:text-[#605e5ea8] placeholder:text-[14px] mt-[4px] border-[2px] border-[#000] outline-none rounded-[15px] pl-[12px] pt-[12px] w-full max-w-full min-w-full min-h-[100px] max-h-[120px]"
        ></textarea>
      ) : (
        <input
          type="text"
          placeholder={placeholder}
          id={label}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="placeholder:text-[#605e5ea8] placeholder:text-[14px] mt-[4px] border-[2px] border-[#000] outline-none rounded-[15px] pl-[12px] w-full h-[40px]"
        />
      )}
    </InputWrap>
  );
};

const Onboarding = () => {
  const router = useRouter();
  const [storeName, setStoreName] = useState<string>("");
  const [storeDescription, setStoreDescription] = useState<string>("");
  const [logo, setLogo] = useState<string>("");
  const [banner, setBanner] = useState<string>("");
  const [logoFile, setLogoFile] = useState<any>(null);
  const [bannerFile, setBannerFile] = useState<any>(null);
  const [phone, setPhone] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const context = useContext<StoreContextType>(StoreContext);
  const { userData } = context.state;
  const { setUserData } = context.actions;
  const [username, setUserName] = useState<string>(userData?.username);
  useEffect(() => {
    setUserName(userData?.username);
  }, [userData]);
  let accessToken: any = null;
  if (typeof window !== "undefined") {
    accessToken = JSON.parse(localStorage.getItem("accessToken") as string);
  }

  useEffect(() => {
    setPhone((prevPhone) => removeNonNumericCharacters(prevPhone));
  }, [phone]);

  const getUserName = () => {
    if (username?.includes(" ")) {
      return username.split(" ")[0];
    }
    return username;
  };

  const validatePhone = () => {
    if (phone.trim() == "") {
      toast.error("Customers will need your whatsapp number.");
      return false;
    }

    if (phone.substring(1).includes("+")) {
      toast.error("Invalid phone number.");
      return false;
    }

    if (phone[0] !== "+") {
      toast.error("Start with area code. Ex: +234");
      return false;
    }

    return true;
  };

  const validateForm = () => {
    if (storeName.trim() == "") {
      toast.error("Please provide a store name.");
      return false;
    }

    if (storeDescription.trim() == "") {
      toast.error("Please describe what you sell.");
      return false;
    }

    if (logo.trim() == "") {
      toast.error("Vendors must have a logo.");
      return false;
    }

    if (!validatePhone()) {
      return false;
    }

    return true;
  };

  const handleSubmit = async (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (validateForm()) {
      const storeData = new FormData();
      storeData.append("sellerId", userData?._id);
      storeData.append("storeName", storeName);
      storeData.append("storeDescription", storeDescription);
      storeData.append("images", logoFile);
      if (banner?.trim() !== "" && bannerFile !== null) {
        storeData.append("images", bannerFile);
      }
      storeData.append("whatsapp", phone);
      storeData.append("accessToken", accessToken);

      try {
        const loadingToast = toast.loading(
          "Creating your store. Please wait..."
        );
        const createVendorRes = await createVendor(storeData);
        toast.dismiss(loadingToast);
        const vendorData = handleApiRes(createVendorRes, toast);
        if (vendorData) {
          toast.success("Your store is ready!");
          setUserData({ ...userData, ...vendorData });
          localStorage.setItem("sellerId", JSON.stringify(vendorData.sellerId));
          localStorage.setItem("accountType", JSON.stringify("Vendor"));
          router.push("Vendor");
        }
      } catch (error) {
        toast.error("Oops, an error occured. Please retry.");
      }
    }
  };

  return (
    <section className="w-full min-h-[100vh] overflow-y-hidden flex flex-col justify-start items-center relative overflow-x-hidden">
      <UseAuth />
      <Toaster />
      <div className="w-[200px] h-[200px] absolute top-[-130px] left-[-100px] bg-[blue] rounded-[50%]"></div>
      <div className="w-[200px] h-[200px] absolute bottom-[-130px] right-[-100px] bg-[#000] rounded-[50%]"></div>
      <section className="w-full sm:max-w-[450px] flex flex-col justify-start items-center mt-[80px] px-[30px] sm:px-0 pb-[125px]">
        <h1 className="font-bold text-[30px] m-0 mb-[8px] text-center">
          Welcome, {getUserName()}.
        </h1>
        <p className="text-center text-[14px] font-medium">
          Over 10,000 vendors sell on our platform.
        </p>
        <span className="font-extrabold mt-[40px] text-[25px] text-[blue]">
          Set up your store
        </span>

        <form
          onSubmit={handleSubmit}
          className="mt-[25px] w-[95%] flex flex-col justify-start items-center"
        >
          <OnboardInputs
            label={"Name"}
            placeholder={"ex: Phyna's Collections"}
            value={storeName}
            setValue={setStoreName}
          />
          <OnboardInputs
            label={"Describe what you sell"}
            placeholder={"ex: We sell accessories, clothings, etc..."}
            value={storeDescription}
            textarea={true}
            setValue={setStoreDescription}
          />
          <InputWrap label={"Brand logo"}>
            <input
              type="file"
              id="business-logo"
              accept="image/*"
              className="hidden"
              onChange={(e: any) => {
                handleImageUpload(e, setLogo);
                setLogoFile(e.target.files[0]);
              }}
            />
            <label
              htmlFor="business-logo"
              className="flex pl-[14px] text-[#fff] justify-start cursor-pointer items-center w-full h-[42px] border-[2px] bg-[#000] rounded-[15px] mt-[4px]"
            >
              <figure className="relative w-[25px] h-[25px] mr-[15px]">
                <Image src={uploadIcon} alt={"Upload image icon"} fill />
              </figure>
              <span className="text-[14px] font-bold">
                {logo.length > 0 ? "Change logo" : "Pick an logo image"}
              </span>
            </label>
          </InputWrap>
          {logo.length > 0 && (
            <figure className="w-[200px] h-[200px] relative rounded-[50%] mb-[20px]">
              <Image
                src={logo}
                alt={"Uploaded logo image"}
                fill
                className="rounded-[inherit]"
              />
            </figure>
          )}

          <InputWrap label={"Store Banner"}>
            <input
              type="file"
              id="Banner-image"
              accept="image/*"
              className="hidden"
              onChange={(e: any) => {
                handleImageUpload(e, setBanner);
                setBannerFile(e.target.files[0]);
              }}
            />
            <label
              htmlFor="Banner-image"
              className="flex pl-[14px] text-[#fff] justify-start items-center cursor-pointer w-full h-[42px] border-[2px] bg-[#000] rounded-[15px] mt-[4px]"
            >
              <figure className="relative w-[25px] h-[25px] mr-[15px]">
                <Image src={uploadIcon} alt={"Upload image icon"} fill />
              </figure>
              <span className="text-[14px] font-bold">
                {banner.length > 0 ? "Change banner" : "Pick a banner image"}
              </span>
            </label>
          </InputWrap>
          {banner.length > 0 && (
            <figure className="w-[100%] h-[180px] relative mb-[20px]">
              <Image src={banner} alt={"Uploaded banner image"} fill />
            </figure>
          )}

          <InputWrap>
            <label
              htmlFor={"Whatsapp contact(for your customers)"}
              className="font-bold mb-[5px]"
            >
              Whatsapp for your business
            </label>
            <input
              placeholder={"ex: +23481099999"}
              id={"Whatsapp contact(for your customers)"}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="placeholder:text-[#605e5ea8] placeholder:text-[14px] mt-[4px] border-[2px] border-[#000] outline-none rounded-[15px] pl-[12px] w-full h-[40px]"
            />
          </InputWrap>
          <OnboardInputs
            label={"Your website(Optional)"}
            value={website}
            setValue={setWebsite}
            placeholder={"ex: www.mystore.com"}
          />
          <button
            type="submit"
            className={`flex justify-center items-center bg-[#000] hover:bg-[#303030] text-[#fff] rounded-[12px] py-[10px] mt-[10px] ${`w-full px-[20px]`}`}
          >
            <span className="mr-[7px]">{"Start selling"}</span>
            <figure className="relative w-[25px] h-[25px]">
              <Image src={cartIcon} alt={"Cart icon"} fill />
            </figure>
          </button>
        </form>
      </section>
    </section>
  );
};

export default Onboarding;
