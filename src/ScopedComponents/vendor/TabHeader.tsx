import { StoreContext, StoreContextType } from "@/GlobalState/store";
import { useContext } from "react";

type props = {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
};
const TabHeader = ({ currentTab, setCurrentTab }: props) => {
  const context = useContext<StoreContextType>(StoreContext);
  const { userData } = context.state;
  const vendorProducts = userData.vendorDetails.products;
  return (
    <header className="w-full flex justify-start items-center h-[50px]">
      {vendorProducts && vendorProducts?.length > 0 && (
        <section
          className="flex flex-col justify-start items-center mr-[20px] cursor-pointer hover:text-[#747474]"
          onClick={() => setCurrentTab("My products")}
        >
          <span className="text-[17px] max-tablet:text-[3vw] font-medium mb-[5px] max-mobile:mb-[1vw]">My products</span>
          <div
            className={`w-[55px] max-tablet:w-[7vw] h-[2px] max-mobile:h-[2px] rounded-[12px] bg-[blue] opacity-0 ${
              currentTab == "My products" ? `opacity-100` : `opacity-0`
            }`}
          ></div>
        </section>
      )}

      <section
        className="flex flex-col justify-start items-center mr-[20px] cursor-pointer hover:text-[#747474]"
        onClick={() => setCurrentTab("My store")}
      >
        <span className="text-[17px] max-tablet:text-[3vw] font-medium mb-[5px] max-mobile:mb-[1vw]">My store</span>
        <div
          className={`w-[55px] max-tablet:w-[7vw] h-[2px] max-mobile:h-[2px] rounded-[12px] bg-[blue] opacity-0 ${
            currentTab == "My store" ? `opacity-100` : `opacity-0`
          }`}
        ></div>
      </section>

      {/* <section
                className="flex flex-col justify-start items-center mr-[20px] cursor-pointer hover:text-[#747474]"
                onClick={() => setCurrentTab("Promotions")}
              >
                <span className="text-[17px] font-medium  mb-[8px]">
                  Promotions
                </span>
                <div
                  className={`w-[55px] h-[3px] bg-[blue] opacity-0 ${
                    currentTab == "Promotions" ? `opacity-100` : `opacity-0`
                  }`}
                ></div>
              </section> */}

      <section
        className="flex flex-col justify-start items-center mr-[20px] cursor-pointer hover:text-[#747474]"
        onClick={() => setCurrentTab("Subscriptions")}
      >
        <span className="text-[17px] max-tablet:text-[3vw] font-medium  mb-[5px] max-mobile:mb-[1vw]">Subscriptions</span>
        <div
          className={`w-[55px] max-tablet:w-[7vw] h-[2px] max-mobile:h-[2px] rounded-[12px] bg-[blue] opacity-0 ${
            currentTab == "Subscriptions" ? `opacity-100` : `opacity-0`
          }`}
        ></div>
      </section>
    </header>
  );
};

export default TabHeader;
