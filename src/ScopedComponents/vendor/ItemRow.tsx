import { deleteProduct } from "@/APIs/product";
import { StoreContext, StoreContextType } from "@/GlobalState/store";
import { formatPrice } from "@/helpers/formatPrice";
import { handleApiRes, handleEmptyRes } from "@/utils/handleApiRes";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { useContext } from "react";

const ItemRow = ({
  productData,
  fetchProductsForVendorTab,
}: {
  productData: any;
  fetchProductsForVendorTab: () => void;
}) => {
  const context = useContext<StoreContextType>(StoreContext);
  const toggleEditModal = context.actions.toggleEditModal;
  const setProductToEdit = context.actions.setProductToEdit

  const handleEdit = () => {
    setProductToEdit(productData)
    toggleEditModal();
  };

  const handleDelete = async () => {
    try {
      const loadingToast = toast.loading("Deleting product. Please wait...");
      const deleteProductRes = await deleteProduct(productData._id);
      toast.dismiss(loadingToast);
      const deleteRes = handleEmptyRes(deleteProductRes, toast);
      if (deleteRes) {
        toast.success("Product deleted.");
        fetchProductsForVendorTab();
      }
    } catch (error) {
      toast.error("Couldn't delete that product. Please retry.");
    }
  };
  return (
    <section className="w-full flex justify-evenly items-center my-[15px] py-[5px] text-[#464646]">
      <Link
        href={`/Products/${productData._id}`}
        className="w-[23%] text-[14px] text-left hover:underline font-semibold "
      >
        {productData.title}
      </Link>
      <Link
        href={`/Products/${productData._id}`}
        className="w-[23%] flex justify-start items-center"
      >
        <figure className="w-[70px] h-[50px] relative">
          <Image
            src={productData.images[0]}
            fill
            alt={"Product image"}
            className="rounded-[7px]"
          />
        </figure>
      </Link>
      <Link
        href={`/Products/${productData._id}`}
        className="w-[23%] text-[14px] text-left hover:underline font-semibold"
      >
        #{formatPrice(productData?.price)}
      </Link>
      <section className="w-[23%] flex justify-start items-center z-[3]">
        <button
          onClick={handleEdit}
          className="w-[45%] border-[2px] rounded-[16px] h-[40px] mr-[20px] text-[14px] border-[#c8c838] text-[#c8c838] hover:text-[#fff] hover:bg-[#c8c838]"
        >
          Edit
        </button>
        {/* <button className="w-[30%] border-[2px] rounded-[16px] h-[35px] text-[14px] border-[green] text-[green] hover:text-[#fff] hover:bg-[green]">
            Promote
          </button> */}
        <button
          onClick={handleDelete}
          className="w-[45%] border-[2px] rounded-[16px] h-[40px] mr-[20px] text-[14px] border-[red] text-[red] hover:text-[#fff] hover:bg-[red]"
        >
          Delete
        </button>
      </section>
    </section>
  );
};

export default ItemRow;
