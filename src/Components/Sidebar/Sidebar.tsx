import { StoreContext, StoreContextType } from "@/GlobalState/store";
import Image from "next/image";
import Link from "next/link";
import { memo, useContext, useEffect, useState } from "react";

const Sidebar = ({ isMobile }: { isMobile?: boolean }) => {
  const context = useContext<StoreContextType>(StoreContext);
  const toggleModal = context.actions.toggleProductModal;
  const sidebarOpen = context?.state?.sidebarOpen;

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "scroll";
    }
  }, [sidebarOpen]);

  return (
    <nav
      className={`fixed left-0 w-[200px] h-[100vh] bg-[#fff] flex flex-col justify-between items-start pt-[30px] shadow-2 ${
        isMobile && sidebarOpen ? `block` : `max-sidebar-bk:hidden`
      } z-[9]`}
    >
      {/* LOGO */}
      <figure className="relative w-[135px] h-[40px] ml-[18px]">
        <Image src={"/assets/images/logo.svg"} alt={"Vendornia logo"} fill />
      </figure>

      <ul className="h-[80%] w-full list-none flex flex-col justify-start items-center mt-[35px]">
        <Link
          onMouseUp={(e) => {
            e.preventDefault(); // Prevent the default link behavior
          }}
          href={"/"}
          className="w-full flex justify-center mb-[10px]"
        >
          <li
            className="bg-[#fff] hover:bg-[#00007F] pl-[12px] w-[90%] flex justify-start items-center py-[12px] h-45px]
           hover:text-[#fff] text-[#000] cursor-pointer rounded-[5px] font-bold sidebar-li"
          >
            <figure className="relative w-[20px] h-[20px] mr-[8px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 83 74"
                fill="none"
                className="h-full w-full"
              >
                <path
                  d="M82.9782 36.9277C82.9782 39.5293 80.8166 41.5672 78.3667 41.5672H73.7552L73.8561 64.7211C73.8561 65.1113 73.8273 65.5016 73.7841 65.8918V68.2188C73.7841 71.4129 71.2045 74 68.0197 74H65.7139C65.5554 74 65.3969 74 65.2384 73.9855C65.0366 74 64.8349 74 64.6331 74H59.9495H56.4909C53.3061 74 50.7265 71.4129 50.7265 68.2188V64.75V55.5C50.7265 52.9418 48.6658 50.875 46.115 50.875H36.892C34.3413 50.875 32.2805 52.9418 32.2805 55.5V64.75V68.2188C32.2805 71.4129 29.701 74 26.5161 74H23.0575H18.4604C18.2443 74 18.0281 73.9855 17.8119 73.9711C17.639 73.9855 17.4661 74 17.2931 74H14.9874C11.8026 74 9.22301 71.4129 9.22301 68.2188V52.0312C9.22301 51.9012 9.22301 51.7566 9.23742 51.6266V41.5672H4.6115C2.01753 41.5672 0 39.5438 0 36.9277C0 35.627 0.432328 34.4707 1.44109 33.459L38.3908 1.15625C39.3995 0.144531 40.5524 0 41.5612 0C42.5699 0 43.7228 0.289062 44.5875 1.01172L81.393 33.459C82.5459 34.4707 83.1224 35.627 82.9782 36.9277Z"
                  fill="black"
                  className="w-full h-full sidebar-icon"
                />
              </svg>
            </figure>
            <span>Home</span>
          </li>
        </Link>
        <Link
          href={"/Vendors"}
          className="w-full flex justify-center mb-[10px]"
        >
          <li
            className="bg-[#fff] hover:bg-[#00007F] pl-[12px] w-[90%] flex justify-start items-center py-[12px] h-45px]
           hover:text-[#fff] text-[#000] cursor-pointer rounded-[5px] font-bold sidebar-li"
          >
            <figure className="relative w-[20px] h-[20px] mr-[8px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 72 68"
                fill="none"
                className="h-full w-full"
              >
                <path
                  d="M70.3501 13.7859L62.7676 1.73984C62.0928 0.664062 60.8886 0 59.605 0H12.3899C11.1063 0 9.90207 0.664062 9.22719 1.73984L1.63149 13.7859C-2.28545 20.0016 1.18157 28.6477 8.49938 29.6437C9.0287 29.7102 9.57125 29.75 10.1006 29.75C13.5544 29.75 16.6244 28.2359 18.7284 25.8984C20.8325 28.2359 23.9025 29.75 27.3563 29.75C30.8101 29.75 33.8801 28.2359 35.9842 25.8984C38.0882 28.2359 41.1583 29.75 44.6121 29.75C48.0791 29.75 51.1359 28.2359 53.2399 25.8984C55.3572 28.2359 58.414 29.75 61.8678 29.75C62.4103 29.75 62.9397 29.7102 63.469 29.6437C70.8133 28.6609 74.2935 20.0148 70.3633 13.7859H70.3501ZM64.0115 33.8539H63.9983C63.2969 33.9469 62.5824 34 61.8546 34C60.2137 34 58.639 33.7477 57.1701 33.2961V51H14.8247V33.2828C13.3426 33.7477 11.7547 34 10.1138 34C9.38599 34 8.65818 33.9469 7.95683 33.8539H7.9436C7.40105 33.7742 6.87173 33.6813 6.35565 33.5484V51V59.5C6.35565 64.1883 10.1535 68 14.8247 68H57.1701C61.8413 68 65.6392 64.1883 65.6392 59.5V51V33.5484C65.1099 33.6813 64.5805 33.7875 64.0115 33.8539Z"
                  fill="black"
                  className="w-full h-full sidebar-icon"
                />
              </svg>
            </figure>
            <span>Vendors</span>
          </li>
        </Link>

        <Link
          href={"/Vendors"}
          className="w-full flex justify-center mb-[10px]"
        >
          <li
            className="bg-[#fff] hover:bg-[#00007F] pl-[12px] w-[90%] flex justify-start items-center py-[12px] h-45px]
           hover:text-[#fff] text-[#000] cursor-pointer rounded-[5px] font-bold sidebar-li"
          >
            <figure className="relative w-[20px] h-[20px] mr-[8px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 187 150"
                fill="none"
                className="h-full w-full"
              >
                <path
                  d="M10.7525 56.25H176.248C182.179 56.25 187 51.416 187 45.4687C187 43.3301 186.357 41.25 185.188 39.4922L163.099 6.26953C160.499 2.34375 156.145 0 151.441 0H35.5592C30.8842 0 26.5014 2.34375 23.9009 6.26953L1.81156 39.4629C0.642812 41.25 0 43.3301 0 45.4395C0 51.416 4.82109 56.25 10.7525 56.25ZM18.7 65.625V112.5V135.938C18.7 143.701 24.982 150 32.725 150H98.175C105.918 150 112.2 143.701 112.2 135.938V112.5V65.625H93.5V112.5H37.4V65.625H18.7ZM149.6 65.625V140.625C149.6 145.811 153.778 150 158.95 150C164.122 150 168.3 145.811 168.3 140.625V65.625H149.6Z"
                  fill="black"
                  className="w-full h-full sidebar-icon"
                />
              </svg>
            </figure>
            <span>My Store</span>
          </li>
        </Link>

        <li
          className="bg-[#fff] hover:bg-[#00007F] pl-[12px] w-[90%] flex justify-start items-center py-[12px] h-45px]
           hover:text-[#fff] text-[#000] cursor-pointer rounded-[5px] font-bold sidebar-li"
          onClick={toggleModal}
        >
          <figure className="relative w-[20px] h-[20px] mr-[8px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 104 104"
              fill="none"
              className="h-full w-full"
            >
              <path
                d="M58.1176 6.42353C58.1176 2.87591 55.2417 0 51.694 0C48.1464 0 45.2705 2.87591 45.2705 6.42353V97.5765C45.2705 101.124 48.1464 104 51.694 104C55.2417 104 58.1176 101.124 58.1176 97.5765V6.42353Z"
                fill="black"
                className="w-full h-full sidebar-icon"
              />
              <path
                d="M6.42353 45.2701C2.87591 45.2701 0 48.146 0 51.6937C0 55.2413 2.87591 58.1172 6.42353 58.1172L97.5765 58.1172C101.124 58.1172 104 55.2413 104 51.6937C104 48.146 101.124 45.2701 97.5765 45.2701L6.42353 45.2701Z"
                fill="black"
                className="w-full h-full sidebar-icon"
              />
            </svg>
          </figure>
          <span>New Product</span>
        </li>
      </ul>

      <section className="w-full flex justify-center mb-[30px]">
        <button className="w-[90%] bg-[#000000] text-[#fff] flex justify-start items-center py-[12px] rounded-[5px] pl-[12px] font-bold">
          <figure className="relative w-[20px] h-[20px] mr-[8px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 161 141"
              fill="none"
              className="h-full w-full"
            >
              <path
                d="M118.832 23.2587L157.447 61.9078C159.711 64.1739 161 67.2897 161 70.5C161 73.7103 159.711 76.8261 157.447 79.0922L118.832 117.741C116.819 119.756 114.115 120.857 111.285 120.857C105.405 120.857 100.625 116.073 100.625 110.188V90.6429H60.375C54.8092 90.6429 50.3125 86.1422 50.3125 80.5714V60.4286C50.3125 54.8578 54.8092 50.3571 60.375 50.3571H100.625V30.8123C100.625 24.9268 105.405 20.1429 111.285 20.1429C114.115 20.1429 116.819 21.2759 118.832 23.2587ZM50.3125 20.1429H30.1875C24.6217 20.1429 20.125 24.6435 20.125 30.2143V110.786C20.125 116.356 24.6217 120.857 30.1875 120.857H50.3125C55.8783 120.857 60.375 125.358 60.375 130.929C60.375 136.499 55.8783 141 50.3125 141H30.1875C13.5215 141 0 127.467 0 110.786V30.2143C0 13.5335 13.5215 0 30.1875 0H50.3125C55.8783 0 60.375 4.50067 60.375 10.0714C60.375 15.6422 55.8783 20.1429 50.3125 20.1429Z"
                fill="#fff"
              />
            </svg>
          </figure>
          <span>Logout</span>
        </button>
      </section>
    </nav>
  );
};

export default memo(Sidebar);
