"use client";
import { fetchSingleVendor } from "@/APIs/vendor";
import AddProduct from "@/Components/AddProduct/AddProduct";
import Navbar from "@/Components/Nabvar/Navbar";
import Sidebar from "@/Components/Sidebar/Sidebar";
import { StoreContext } from "@/GlobalState/store";
import { usePathname } from "next/navigation";
import React, {
  useEffect,
  useState,
  useRef,
  useContext,
  useCallback,
} from "react";
import whatsappIcon from "../../../../public/assets/icons/whatsapp.svg";
import shareIcon from "../../../../public/assets/icons/share-vendor.svg";
import toast, { Toaster } from "react-hot-toast";
import BottomNav from "@/Components/BottomNav/BottomNav";
import { arrangeCollections } from "@/helpers/arrangeCollections";
import { UseAuth } from "@/hooks/UseAuth";
import { handleApiRes } from "@/utils/handleApiRes";
import { arrangeProductGroups } from "@/helpers/arrangeProductGroups";
import SearchBar from "@/Components/SearchBar/SearchBar";
import TabHeader from "@/ScopedComponents/vendor/TabHeader";
import MyProducts from "@/ScopedComponents/vendor/MyProducts";
import MyStore from "@/ScopedComponents/vendor/MyStore";
import VendorTopSection from "@/ScopedComponents/vendor/VendorTopSection";
import Subscriptions from "@/ScopedComponents/vendor/Subscriptions";
import CustomerView from "@/ScopedComponents/vendor/CustomerView";
import EditProduct from "@/Components/EditProduct/EditProduct";
import SearchModal from "@/Components/SearchModal/SearchModal";

const VendorProfile = () => {
  const context = useContext(StoreContext);
  const { userData } = context.state;
  const { setUserData } = context.actions;
  const createModalOpen = context?.state?.productModalOpen;
  const editModalOpen = context?.state?.editModalOpen;
  const searchModalOpen = context?.state?.searchModal;
  const toggleProductModal = context.actions.toggleProductModal;
  let accessToken: any = null;
  if (typeof window !== "undefined") {
    accessToken = JSON.parse(localStorage.getItem("accessToken") as string);
  }
  const [view, setView] = useState<string>("Customer");
  const [productGroups, setProductGroups] = useState<any>([]);
  const [unCategorized, setUncategorized] = useState<any>([]);
  const [currentTab, setCurrentTab] = useState<string>("My store");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [dashboardStoreName, setDashboardStoreName] = useState<string>("");
  const [dashboardDescription, setDashboardDescription] = useState<string>("");
  const [dashboardWebsite, setDashboardWebsite] = useState<string>("");
  const [dashboardWhatsapp, setDashboardWhatsapp] = useState<string>("");
  const [dashboardLogo, setDashboardLogo] = useState<string>("");
  const [dashboardBanner, setDashboardBanner] = useState<string>("");
  const [initialLoading, setInitialLoading] = useState<boolean>(false);
  // const [tabSet, setTabSet] = useState<boolean>(false);

  const setDashboardStoreDetails = useCallback(
    (vendorData: any) => {
      setDashboardStoreName(vendorData.storeName);
      setDashboardDescription(vendorData.storeDescription);
      setDashboardWhatsapp(vendorData.whatsapp);
      setDashboardLogo(vendorData.logo);
      setDashboardBanner(vendorData.banner);
    },
    [
      setDashboardStoreName,
      setDashboardDescription,
      setDashboardWhatsapp,
      setDashboardLogo,
      setDashboardBanner,
    ]
  );

  const cancelChanges = () => {
    setDashboardStoreDetails(userData?.vendorDetails);
    setIsEditing(false);
  };

  const contentChanged = useCallback(() => {
    if (
      dashboardStoreName == userData?.vendorDetails?.storeName &&
      dashboardDescription == userData?.vendorDetails?.storeDescription &&
      dashboardWhatsapp == userData?.vendorDetails?.whatsapp &&
      dashboardBanner == userData?.vendorDetails?.banner &&
      dashboardLogo == userData?.vendorDetails?.logo
    ) {
      return false;
    }

    return true;
  }, [
    userData?.vendorDetails?.banner,
    userData?.vendorDetails?.logo,
    userData?.vendorDetails?.storeDescription,
    userData?.vendorDetails?.storeName,
    userData?.vendorDetails?.whatsapp,
    dashboardStoreName,
    dashboardDescription,
    dashboardWhatsapp,
    dashboardBanner,
    dashboardLogo,
  ]);

  useEffect(() => {
    if (initialLoading) {
      if (contentChanged()) {
        return setIsEditing(true);
      }
      setIsEditing(false);
    }
  }, [
    dashboardBanner,
    dashboardDescription,
    dashboardLogo,
    dashboardStoreName,
    dashboardWhatsapp,
    contentChanged,
    initialLoading,
  ]);

  const message =
    "Hi, I'm from your store on Vendornia, and I'd like to inquire about a product.";

  const defaultImg: string =
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60";
  const pathname = usePathname();
  const sellerId = pathname.split("/")[2];

  type collectionsType = {
    category: string;
    categoryImage: string;
  };

  const [collections, setCollections] = useState<collectionsType[]>([]);

  const fetchVendorData = useCallback(async () => {
    try {
      const fetchVendorDataRes: any = await fetchSingleVendor({
        sellerId,
        accessToken,
      });

      const vendorProfileData = handleApiRes(fetchVendorDataRes, toast);
      if (vendorProfileData) {
        //Update global state with fetched vendor details
        context?.actions.setUserData({ vendorDetails: vendorProfileData });

        //Initialize store details for vendor view
        setDashboardStoreDetails(vendorProfileData);

        //Arrange collections atop vendor store
        setCollections(arrangeCollections(vendorProfileData.products));

        //Collate products according to category
        arrangeProductGroups(
          vendorProfileData.products,
          setProductGroups,
          setUncategorized
        );
        setInitialLoading(true);
      }
    } catch (error) {
      console.log(error);
    }
  }, [
    accessToken,
    context,
    sellerId,
    setCollections,
    setDashboardStoreDetails,
    setProductGroups,
    setUncategorized,
  ]);

  //Re-render store details whenever a product is updated from vendor view
  useEffect(() => {
    let vendorProducts = userData?.vendorDetails?.products;
    setCollections(arrangeCollections(vendorProducts));
    arrangeProductGroups(vendorProducts, setProductGroups, setUncategorized);
  }, [userData?.vendorDetails?.products]);

  const initVendorTab = () => {
    const currentTabCache = localStorage.getItem("currentVendorTab");
    if (
      !currentTabCache ||
      currentTabCache == null ||
      currentTabCache == undefined
    ) {
      return setCurrentTab("My products");
    }
    setCurrentTab(currentTabCache);
  };

  useEffect(() => {
    if (userData?._id) {
      //Initialize vendor tab
      initVendorTab();
      //Fetch vendor data on page load
      fetchVendorData();
    }
  }, [userData?._id, fetchVendorData]);

  useEffect(() => {
    localStorage.setItem("currentVendorTab", currentTab);
  }, [currentTab]);

  const collectionsRef = useRef<HTMLDivElement>(null);

  return (
    <main className="w-full min-h-screen flex flex-col justify-start items-end bg-primary_bg">
      <UseAuth />
      <Navbar />
      <Sidebar />
      <BottomNav />
      <Toaster />
      {/* <SearchBar /> */}
      {createModalOpen && <AddProduct />}
      {editModalOpen && <EditProduct />}
      {searchModalOpen && <SearchModal />}

      <section
        className={`page-content flex flex-col justify-start items-start pt-[90px] ${
          (createModalOpen || editModalOpen || searchModalOpen) && `hidden`
        }`}
      >
        {userData?.vendorDetails && (
          <>
            {/* Top section */}
            <VendorTopSection
              userData={userData}
              view={view}
              setView={setView}
              message={message}
              whatsappIcon={whatsappIcon}
              shareIcon={shareIcon}
              defaultImg={defaultImg}
            />

            {/* Customer view */}
            {view == "Customer" && (
              <CustomerView
                collections={collections}
                unCategorized={unCategorized}
                collectionsRef={collectionsRef}
                productGroups={productGroups}
                sellerId={sellerId}
              />
            )}

            {/* Vendor view */}
            {view == "Yours" && (
              <section className="pb-[50px] max-mobile:w-full w-[90%] flex flex-col justify-start items-center rounded-[10px] shadow-2 my-[30px] px-[20px] py-[15px] h-fit">
                <TabHeader
                  currentTab={currentTab}
                  setCurrentTab={setCurrentTab}
                />

                {/* Products section */}
                {currentTab == "My products" && (
                  <MyProducts toggleProductModal={toggleProductModal} />
                )}

                {currentTab == "My store" && (
                  <>
                    {/* My store section */}
                    <MyStore
                      dashboardBanner={dashboardBanner}
                      dashboardDescription={dashboardDescription}
                      dashboardLogo={dashboardLogo}
                      dashboardStoreName={dashboardStoreName}
                      dashboardWhatsapp={dashboardWhatsapp}
                      isEditing={isEditing}
                      context={context}
                      userData={userData}
                      toast={toast}
                      setDashboardBanner={setDashboardBanner}
                      setDashboardStoreName={setDashboardStoreName}
                      setDashboardDescription={setDashboardDescription}
                      setDashboardLogo={setDashboardLogo}
                      setDashboardStoreDetails={setDashboardStoreDetails}
                      setDashboardWhatsapp={setDashboardWebsite}
                      setIsEditing={setIsEditing}
                      cancelChanges={cancelChanges}
                    />
                  </>
                )}

                {/* Subscriptions section */}
                {currentTab == "Subscriptions" && (
                  <>
                    <Subscriptions />
                  </>
                )}
              </section>
            )}
          </>
        )}
      </section>
    </main>
  );
};

export default VendorProfile;
