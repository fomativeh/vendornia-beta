import React from "react";
import Image from "next/image";
import VendorButton from "./VendorButton";
import Link from "next/link";

type props = {
  userData: any;
  view: string;
  setView: (data: any) => void;
  message: string;
  whatsappIcon: string;
  shareIcon: string;
  defaultImg: string;
};

const VendorTopSection = ({
  userData,
  view,
  setView,
  message,
  whatsappIcon,
  shareIcon,
  defaultImg,
}: props) => {
  return (
    <section className="w-full h-fit relative mb-[15px]">
      <section className="w-full max-tablet:h-[150px] h-[220px] bg-[#000] relative">
        <figure className="relative w-full h-full">
          <Image
            src={
              userData?.vendorDetails?.banner
                ? userData?.vendorDetails?.banner
                : defaultImg
            }
            alt={"Vendor banner"}
            fill
          />
        </figure>

        <section className="absolute bottom-[-50px] max-tablet:left-[20px] left-[50px]">
          <figure className="relative max-tablet:mb-[12px] max-sm:w-[120px] max-sm:h-[120px] border-[5px] border-[#fff]  w-[200px] h-[200px] rounded-[50%]">
            <Image
              src={
                userData?.vendorDetails?.logo
                  ? userData?.vendorDetails?.logo
                  : defaultImg
              }
              alt={"Vendor logo"}
              fill
              className="rounded-[inherit]"
            />
          </figure>
        </section>
      </section>

      <section className="w-full flex justify-center items-center mt-[50px]">
        <section
          className="flex flex-col justify-start items-center cursor-pointer mr-[50px] hover:text-[#5c5c5c]"
          onClick={() => setView("Customer")}
        >
          <span className="font-bold mb-[5px]">Customer view</span>
          <div
            className={`${
              view == "Customer" && `opacity-[1]`
            } opacity-0 w-[40px] h-[2px] bg-themeBlue rounded-[10px]`}
          ></div>
        </section>

        <section
          className="flex flex-col justify-start items-center cursor-pointer hover:text-[#5c5c5c]"
          onClick={() => setView("Yours")}
        >
          <span className="font-bold mb-[5px]">Your view</span>
          <div
            className={`${
              view == "Yours" && `opacity-[1]`
            } opacity-0 w-[40px] h-[2px] bg-themeBlue rounded-[10px]`}
          ></div>
        </section>
      </section>

      {/* /Vendor view */}
      {/* {view == "Yours" && <section className="w-full"></section>} */}

      {/* /Segments below are shown on customer view */}

      {view == "Customer" && (
        <section
          className={`w-full h-fit flex flex-col justify-start items-start max-tablet:pl-[12px] pl-[15px] ${
            userData?.vendorDetails && `max-tablet:mt-[15px]`
          } ${
            userData?.vendorDetails && `mt-[15px]`
          } z-[3] relative max-sm:flex-col max-smallDesktop:items-start`}
        >
          <section className="w-full flex justify-start items-center">
            <h1 className="m-0 font-bold text-[20px] text-themeBlue">
              {userData?.vendorDetails?.storeName}
            </h1>
            {/* <figure className="w-[25px] h-[25px] ml-[5px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
                viewBox="0 0 292 306"
                fill="none"
              >
                <path
                  d="M279.894 175.331C275.169 168.799 272.625 160.939 272.625 152.872C272.625 144.806 275.169 136.946 279.894 130.414L289.576 117.015C290.76 115.379 291.539 113.485 291.849 111.488C292.159 109.492 291.991 107.45 291.359 105.531C290.721 103.632 289.653 101.907 288.238 100.49C286.824 99.0732 285.102 98.0034 283.206 97.3641L267.536 92.2599C259.86 89.7797 253.169 84.9207 248.429 78.384C243.689 71.8473 241.145 63.9712 241.165 55.8924V39.3036C241.164 37.2896 240.686 35.3045 239.772 33.5107C238.857 31.7169 237.532 30.1653 235.904 28.9829C234.277 27.8005 232.393 27.0209 230.406 26.7077C228.42 26.3945 226.388 26.5568 224.476 27.1811L208.679 32.2854C201.01 34.7711 192.752 34.7644 185.087 32.2663C177.422 29.7682 170.742 24.9065 166.001 18.3764L156.319 4.9778C155.083 3.42495 153.513 2.17106 151.727 1.30928C149.94 0.44751 147.983 0 146 0C144.017 0 142.06 0.44751 140.273 1.30928C138.487 2.17106 136.917 3.42495 135.681 4.9778L125.999 18.3764C121.258 24.9065 114.578 29.7682 106.913 32.2663C99.2476 34.7644 90.9902 34.7711 83.321 32.2854L67.5239 27.1811C65.6122 26.5568 63.58 26.3945 61.5937 26.7077C59.6074 27.0209 57.7233 27.8005 56.0955 28.9829C54.4677 30.1653 53.1425 31.7169 52.2282 33.5107C51.3139 35.3045 50.8364 37.2896 50.8349 39.3036V55.8924C50.8545 63.9712 48.3107 71.8473 43.5708 78.384C38.8309 84.9207 32.1401 89.7797 24.4639 92.2599L8.79416 97.3641C6.89839 98.0034 5.17594 99.0732 3.76151 100.49C2.34708 101.907 1.279 103.632 0.64079 105.531C0.00905102 107.45 -0.158682 109.492 0.151394 111.488C0.46147 113.485 1.24049 115.379 2.42434 117.015L12.1065 130.414C16.8309 136.946 19.3746 144.806 19.3746 152.872C19.3746 160.939 16.8309 168.799 12.1065 175.331L2.42434 188.73C1.24049 190.366 0.46147 192.26 0.151394 194.257C-0.158682 196.253 0.00905102 198.295 0.64079 200.214C1.279 202.113 2.34708 203.838 3.76151 205.255C5.17594 206.672 6.89839 207.742 8.79416 208.381L24.4639 213.485C32.1401 215.965 38.8309 220.824 43.5708 227.361C48.3107 233.898 50.8545 241.774 50.8349 249.853V266.441C50.8364 268.455 51.3139 270.44 52.2282 272.234C53.1425 274.028 54.4677 275.58 56.0955 276.762C57.7233 277.944 59.6074 278.724 61.5937 279.037C63.58 279.35 65.6122 279.188 67.5239 278.564L83.1936 273.46C90.8791 270.932 99.1678 270.917 106.862 273.417C114.557 275.918 121.258 280.803 125.999 287.369L135.681 300.767C136.87 302.389 138.424 303.708 140.217 304.617C142.01 305.526 143.991 306 146 306C148.009 306 149.99 305.526 151.783 304.617C153.576 303.708 155.13 302.389 156.319 300.767L166.001 287.369C170.75 280.813 177.452 275.934 185.143 273.435C192.835 270.935 201.12 270.944 208.806 273.46L224.476 278.564C226.388 279.188 228.42 279.35 230.406 279.037C232.393 278.724 234.277 277.944 235.904 276.762C237.532 275.58 238.857 274.028 239.772 272.234C240.686 270.44 241.164 268.455 241.165 266.441V249.853C241.145 241.774 243.689 233.898 248.429 227.361C253.169 220.824 259.86 215.965 267.536 213.485L283.206 208.381C285.102 207.742 286.824 206.672 288.238 205.255C289.653 203.838 290.721 202.113 291.359 200.214C291.991 198.295 292.159 196.253 291.849 194.257C291.539 192.26 290.76 190.366 289.576 188.73L279.894 175.331ZM206.004 136.373L142.305 200.176C139.916 202.568 136.677 203.912 133.299 203.912C129.92 203.912 126.681 202.568 124.292 200.176L86.0728 161.894C84.856 160.717 83.8855 159.309 83.2178 157.752C82.5501 156.195 82.1987 154.521 82.184 152.827C82.1693 151.132 82.4916 149.452 83.1322 147.884C83.7727 146.315 84.7187 144.891 85.9149 143.693C87.111 142.494 88.5334 141.547 90.0991 140.905C91.6647 140.264 93.3423 139.941 95.0338 139.956C96.7254 139.97 98.3971 140.322 99.9514 140.991C101.506 141.66 102.911 142.632 104.087 143.851L133.26 173.111L187.952 118.33C190.354 116.005 193.572 114.719 196.913 114.748C200.253 114.777 203.448 116.119 205.81 118.485C208.172 120.851 209.512 124.052 209.541 127.397C209.57 130.743 208.286 133.966 205.965 136.373H206.004Z"
                  fill="#00007F"
                />
              </svg>
            </figure> */}
          </section>

          <span className="w-full text-left break-words my-[5px] max-w-[94%]">
            {userData?.vendorDetails?.storeDescription}
          </span>

          <section className="flex text-[14px] text-[#3f3f3f] mt-[5px]">
            <span className="mr-[12px]">
              <b className="text-[#000]">Reviews</b> 200
            </span>
            <span>
              <b className="text-[#000]">Total Products</b>{" "}
              {userData?.vendorDetails?.products?.length || 0}
            </span>
          </section>
          {/* <Link
            href="/trust"
            className="bg-[#000] py-[4px] text-[12px] text-[#fff] px-[10px] mt-[5px]"
          >
            <span className="mr-[5px]">Trusted and recommended.</span>
            <span className="text-[#c4c0fb] underline">See why.</span>
          </Link> */}

          {userData && (
            <section className="w-full flex start items-center mt-[10px]">
              <section
                onClick={() =>
                  window.open(
                    `https://wa.me/${
                      userData?.vendorDetails?.whatsapp
                    }?text=${encodeURIComponent(message)}`,
                    "_blank"
                  )
                }
                className="mr-[5px]"
              >
                <VendorButton
                  text={"Contact Vendor"}
                  alt={"Contact icon"}
                  icon={whatsappIcon}
                />
              </section>

              {/* <TelegramShareButton url="https://www.facebook.com" > */}
              <VendorButton
                text={"Share Store"}
                alt={"Share icon"}
                icon={shareIcon}
              />
              {/* </TelegramShareButton> */}
            </section>
          )}
        </section>
      )}
    </section>
  );
};

export default VendorTopSection;
