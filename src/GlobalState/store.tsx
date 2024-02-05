import React, { createContext, useContext, useState, ReactNode } from "react";

type StoreType = {
  productModalOpen: boolean;
  editModalOpen: boolean;
  searchModal: boolean;
  sidebarOpen: boolean;
  userData: any;
  productToEdit: any;
  products: any[];
  vendors: any[];
  isLoading: boolean;
  toBeVendor: boolean;
  accountType: string;
};

export type StoreContextType = {
  state: StoreType;
  actions: {
    toggleProductModal: () => void;
    toggleSearchModal: () => void;
    toggleSidebar: () => void;
    setUserData: (data: any) => void;
    updateVendorDetails: (data: any) => void;
    toggleIsLoading: () => void;
    clearProductToEdit: () => void;
    toggleEditModal: () => void;
    setProductToEdit: (data: any) => void;
    toggleToBeVendor: () => void;
    setAccountType: (data: string) => void;
  };
};

export const StoreContext = createContext<StoreContextType>({
  state: {
    productModalOpen: false,
    editModalOpen: false,
    searchModal: false,
    sidebarOpen: false,
    isLoading: false,
    userData: null,
    productToEdit: {},
    products: [],
    vendors: [],
    toBeVendor: false,
    accountType: "",
  },
  actions: {
    toggleProductModal: () => {},
    toggleSearchModal: () => {},
    toggleSidebar: () => {},
    setUserData: (data: any) => {},
    updateVendorDetails: (data: any) => {},
    toggleIsLoading: () => {},
    clearProductToEdit: () => {},
    toggleEditModal: () => {},
    setProductToEdit: (data: any) => {},
    toggleToBeVendor: () => {},
    setAccountType: (data: string) => {},
  },
});

type StoreProviderProps = {
  children: ReactNode;
};

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const [state, setState] = useState<StoreType>({
    productModalOpen: false,
    editModalOpen: false,
    searchModal: false,
    sidebarOpen: false,
    isLoading: false,
    userData: null,
    productToEdit: {},
    products: [],
    vendors: [],
    toBeVendor: false,
    accountType: "",
  });

  const actions = {
    toggleProductModal: () =>
      setState((prev) => ({
        ...prev,
        productModalOpen: !prev.productModalOpen,
      })),
    toggleToBeVendor: () =>
      setState((prev) => ({
        ...prev,
        toBeVendor: !prev.toBeVendor,
      })),
    setProductToEdit: (data: any) =>
      setState((prev) => ({
        ...prev,
        productToEdit: data,
      })),
    setAccountType: (data: string) =>
      setState((prev) => ({ ...prev, accountType: data })),
    toggleEditModal: () =>
      setState((prev) => ({
        ...prev,
        editModalOpen: !prev.editModalOpen,
      })),
    toggleSearchModal: () =>
      setState((prev) => ({ ...prev, searchModal: !prev.searchModal })),
    toggleSidebar: () =>
      setState((prev) => ({ ...prev, sidebarOpen: !prev.sidebarOpen })),
    toggleIsLoading: () =>
      setState((prev) => ({ ...prev, isLoading: !prev.isLoading })),
    setUserData: (data: any) =>
      setState((prev) => ({
        ...prev,
        userData: { ...prev.userData, ...data },
      })),
    updateVendorDetails: (data: any) =>
      setState((prev) => ({
        ...prev,
        userData: {
          ...prev.userData,
          vendorDetails: { ...prev.userData.vendorDetails, ...data },
        },
      })),
    clearProductToEdit: () => {
      setState((prev) => ({
        ...prev,
        productToEdit: {},
      }));
    },
  };

  return (
    <StoreContext.Provider value={{ state, actions }}>
      {children}
    </StoreContext.Provider>
  );
};
