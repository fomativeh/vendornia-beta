import PackageWrapper from "./PackageWrapper";

const Subscriptions = () => {
  return (
    <section className="w-full flex flex-col justify-start items-start mt-[16px] max-mobile:mt-[2vw]">
      <section className="w-full flex justify-start items-center">
        <span className="font-medium max-mobile:text-[4vw]">Current plan</span>
        <span className="py-[8px] px-[12px] 
        max-mobile:px-[3vw] max-mobile:py-[2vw] rounded-[20px] 
        text-[14px] max-mobile:text-[3vw] bg-[#000] ml-[16px] max-mobile:ml-[3vw] text-[#fff]">
          None
        </span>
      </section>

      <section className="w-full flex flex-col justify-start items-start max-mobile:items-center  mt-[32px]">
        <span className="font-medium mb-[10px] max-mobile:mb-[0px] text-[20px] max-mobile:text-[5vw] max-mobile:font-semibold w-full text-center">
          Other options for you
        </span>
        <section className="max-mobile:w-[100%] w-full flex justify-center items-start flex-wrap">
          <PackageWrapper
            planName={"Silver"}
            color={"#666666"}
            price="#800"
            features={[
              "500 products monthly",
              "Product collections (recommended)",
              "Longer product description",
              "Edit product",
              "5 images per product",
            ]}
          />

          <PackageWrapper
            planName={"Diamond"}
            color={"#004080"}
            price="#1,500"
            features={[
              "1200 products monthly",
              "Product collections (recommended)",
              "Longer product description",
              "Edit product",
              "10 images per product",
              "Customized inquiry message",
            ]}
          />

          {/* <PackageWrapper
            planName={"Gold"}
            color={"#b8860b"}
            price="#3,000"
            features={[
              "Unlimited products",
              "Website contact",
              "Longer product description",
              "Edit product",
              "Multiple product images",
              "Customized inquiry message",
              "Customized contact message",
              "Store verification",
            ]}
          /> */}
        </section>
      </section>
    </section>
  );
};

export default Subscriptions;
