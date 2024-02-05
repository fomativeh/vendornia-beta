import handleImageUpload from "@/helpers/handleImageUpload";
import { handleStoreUpdate } from "@/helpers/handleStoreUpdate";
import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";

type props = {
  dashboardStoreName: string;
  dashboardDescription: string;
  dashboardWhatsapp: string;
  dashboardBanner: string;
  dashboardLogo: string;
  userData: any;
  isEditing: boolean;
  setDashboardStoreDetails: (data: any) => void;
  context: any;
  setIsEditing: (data: boolean) => void;
  toast: any;
  setDashboardLogo: Dispatch<SetStateAction<string>>;
  setDashboardBanner: Dispatch<SetStateAction<string>>;
  setDashboardWhatsapp: Dispatch<SetStateAction<string>>;
  setDashboardDescription: Dispatch<SetStateAction<string>>;
  setDashboardStoreName: Dispatch<SetStateAction<string>>;
  cancelChanges: () => void;
};

const AnalyticsCard = ({ title, value }: { title: string; value: number }) => {
  return (
    <section
      className="m-[20px] w-[170px] h-[120px] max-mobile:w-[80%] max-tablet:w-[60%] shadow-2 
rounded-[12px] flex flex-col justify-center items-center"
    >
      <span className="text-[#8282ff] font-semibold text-[15px]">
       {title}
      </span>
      <span className="mt-[20px] text-[17px] font-bold text-[#000] w-full text-center">
        {value}
      </span>
    </section>
  );
};
const MyStore = ({
  dashboardBanner,
  dashboardDescription,
  dashboardLogo,
  dashboardStoreName,
  dashboardWhatsapp,
  isEditing,
  context,
  userData,
  toast,
  setDashboardBanner,
  setDashboardStoreName,
  setDashboardDescription,
  setDashboardLogo,
  setDashboardStoreDetails,
  setDashboardWhatsapp,
  setIsEditing,
  cancelChanges,
}: props) => {
  const updateStore = () => {
    handleStoreUpdate({
      dashboardStoreName,
      dashboardDescription,
      dashboardWhatsapp,
      dashboardBanner,
      dashboardLogo,
      userData,
      setDashboardStoreDetails,
      context,
      setIsEditing,
      toast,
    });
  };
  return (
    <section className="w-full flex flex-col justify-start items-center">
      {/* Analytics section */}
      <section className="w-full flex flex-col justify-start items-center pt-[30px]">
        <h2 className="m-0 mb-[15px] font-semibold text-[18px] w-full text-left">
          Analytics
        </h2>
        <section className="w-full flex justify-center items-center flex-wrap">
          <AnalyticsCard title="Store Visits" value={200}/>
          <AnalyticsCard title="Total Contacts" value={200}/>
          <AnalyticsCard title="Total Reviews" value={200}/>

        </section>
      </section>

      {/* Store details section */}
      <section className="w-full flex flex-col justify-start items-center pt-[30px] mt-[15px]">
        <h2 className="m-0 mb-[20px] font-semibold text-[18px] w-full text-left">
          Store details
        </h2>
        <section className="w-full flex flex-col justify-start items-start">
          <section className="w-full flex flex-col justify-start items-start">
            <label htmlFor="store-name" className="mb-[12px] cursor-pointer">
              Store Name
            </label>
            <input
              type="text"
              id="store-name"
              value={dashboardStoreName}
              onChange={(e) => setDashboardStoreName(e.target.value)}
              className="max-mobile:w-full w-[300px] sm:w-[60%] h-[40px] 
    border-[2px] px-[12px] border-[#000] outline-none focus:border-[blue] rounded-[10px]"
            />
          </section>

          <section className="w-full flex flex-col justify-start items-start mt-[30px]">
            <label htmlFor="store-d" className="mb-[12px] cursor-pointer">
              Description
            </label>
            <textarea
              id="store-d"
              value={dashboardDescription}
              onChange={(e) => setDashboardDescription(e.target.value)}
              className="max-mobile:w-full w-[300px] max-mobile:max-w-full max-w-[320px] sm:w-[60%] h-[100px] min-h-[80px] max-h-[180px] sm:max-w-[70%] 
    border-[2px] px-[12px] pt-[10px] border-[#000] outline-none focus:border-[blue] rounded-[10px]"
            ></textarea>
          </section>

          <section className="flex flex-col justify-start items-center w-full mt-[30px]">
            <label htmlFor="contact" className="w-full text-left mb-[20px]">
              Contact channel
            </label>
            <section className="w-full flex justify-start items-center">
              <section className="flex justify-start items-center mr-[20px]">
                <input
                  type="radio"
                  name="contact-channel"
                  id="whatsapp-option"
                  className="mr-[7px]"
                />
                <label htmlFor="whatsapp-option" className="cursor-pointer">
                  Whatsapp
                </label>
              </section>

              <section className="flex justify-start items-center">
                <input
                  type="radio"
                  name="contact-channel"
                  id="website-option"
                  className="mr-[7px]"
                />
                <label htmlFor="website-option" className="cursor-pointer">
                  Website
                </label>
              </section>
            </section>
          </section>

          <section className="w-full flex flex-col justify-start items-start mt-[30px]">
            <label htmlFor="whatsapp" className="mb-[12px] cursor-pointer">
              Whatsapp
            </label>
            <input
              type="text"
              id="whatsapp"
              value={dashboardWhatsapp}
              onChange={(e) => setDashboardWhatsapp(e.target.value)}
              className="max-mobile:w-full w-[300px] sm:w-[60%] h-[40px] 
    border-[2px] px-[12px] border-[#000] outline-none focus:border-[blue] rounded-[10px]"
            />
          </section>
          {/* 
    <section className="w-full flex flex-col justify-start items-start mt-[30px]">
      <label
        htmlFor="website"
        className="mb-[12px] cursor-pointer"
      >
        Website
      </label>
      <input
        type="text"
        id="website"
        className="w-[300px] sm:w-[60%] h-[40px] 
    border-[2px] px-[12px] border-[#000] outline-none focus:border-[blue] rounded-[10px]"
      />
    </section> */}

          <section className="w-full flex flex-col justify-start items-start mt-[30px]">
            <span className="mb-[12px] cursor-pointer">Logo</span>
            <section className="w-full flex justify-start items-center">
              <figure className="w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] rounded-[50%] relative">
                <Image
                  src={dashboardLogo}
                  alt={"..."}
                  fill
                  className="rounded-[inherit]"
                />
              </figure>
              <label
                htmlFor="logo-file"
                className="cursor-pointer ml-[20px] flex justify-start items-center bg-[#000] px-[16px] py-[8px] rounded-[7px]"
              >
                <figure className="w-[18px] h-[18px] relative">
                  <Image
                    src={"/assets/icons/upload.svg"}
                    fill
                    alt={"Upload icon"}
                  />
                </figure>
                <span className="text-[17px] text-[#fff] ml-[6px]">Change</span>
              </label>
              <input
                type="file"
                accept="image/*"
                id="logo-file"
                className="hidden"
                onChange={(e) => handleImageUpload(e, setDashboardLogo)}
              />
            </section>
          </section>

          <section className="w-full flex flex-col justify-start items-start mt-[30px]">
            <span className="mb-[12px] cursor-pointer">Banner</span>
            <section className="w-full flex justify-start max-tablet:flex-col items-center max-tablet:items-start">
              <figure className="w-[250px] max-tablet:w-full max-tablet:mb-[20px] max-tablet:mt-[10px] h-[250px] sm:w-[80%] relative">
                <Image src={dashboardBanner} alt={"..."} fill />
              </figure>
              <label
                htmlFor="banner-file"
                className="cursor-pointer ml-[20px] max-tablet:ml-[0] flex justify-start items-center bg-[#000] px-[16px] py-[8px] rounded-[7px]"
              >
                <figure className="w-[18px] h-[18px] relative">
                  <Image
                    src={"/assets/icons/upload.svg"}
                    fill
                    alt={"Upload icon"}
                  />
                </figure>
                <span className="text-[17px] text-[#fff] ml-[6px]">Change</span>
              </label>
              <input
                type="file"
                accept="image/*"
                id="banner-file"
                className="hidden"
                onChange={(e) => handleImageUpload(e, setDashboardBanner)}
              />
            </section>
          </section>

          {isEditing && !context.state.isLoading && (
            <section className="w-full flex justify-start items-center mb-[10px] mt-[20px]">
              <button
                onClick={updateStore}
                className="px-[20px] py-[9px] rounded-[7px] hover:border-[#ffbc2d] border-[#fff] border-[2px] bg-[#ffbc2d] mr-[20px] text-[#fff] hover:bg-[#fff] hover:text-[#ffbc2d]"
              >
                Update
              </button>
              <button
                onClick={() => cancelChanges()}
                className="px-[20px] py-[9px] rounded-[7px] hover:border-[red] border-[#fff] border-[2px] bg-[red] text-[#fff] hover:bg-[#fff] hover:text-[red]"
              >
                Cancel changes
              </button>
            </section>
          )}
        </section>
      </section>
    </section>
  );
};

export default MyStore;
