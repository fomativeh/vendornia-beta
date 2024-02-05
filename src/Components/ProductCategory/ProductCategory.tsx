import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard from "../ProductCard/ProductCard";
import MoreBtn from "../MoreBtn/MoreBtn";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktopXL: {
    breakpoint: { max: 3000, min: 1500 },
    items: 6,
  },
  desktopX: {
    breakpoint: { max: 1500, min: 1250 },
    items: 5,
  },

  desktop: {
    breakpoint: { max: 1250, min: 1024 },
    items: 4,
  },

  tablet: {
    breakpoint: { max: 1024, min: 640 },
    items: 3,
  },
};

const MobileCarousel = ({ products }: { products: any }) => {
  return (
    <section className="w-full sm:hidden overflow-x-auto flex justify-start items-center scroll-smooth no-scroll">
      {products?.length > 0 &&
        products.map((eachProduct: any, i: number) => {
          return (
            <ProductCard
              key={i}
              image={eachProduct.images[0]}
              price={eachProduct.price}
              title={eachProduct.title}
              vendorName={eachProduct.vendorName}
              vendorPage={true}
              id={eachProduct._id}
            />
          );
        })}
    </section>
  );
};

type ProductCategoryProps = {
  vendorPage: Boolean;
  productsCategory: string;
  sellerId?: string;
  items: any[];
};

const ProductCategory = ({
  vendorPage,
  productsCategory,
  sellerId,
  items,
}: ProductCategoryProps) => {
  return (
    <section className="w-full my-[20px] flex flex-col justify-start items-center px-[20px]">
      <section className="flex justify-start items-center mb-[12px] w-full">
        <span className="text-[#263238] font-bold text-[18px]">
          Our {productsCategory}
        </span>
        <MoreBtn text={"See all"} />
      </section>
      <section className="w-full max-sm:hidden">
        <Carousel
          responsive={responsive}
          autoPlay
          draggable
          swipeable
          autoPlaySpeed={3650}
          infinite
        >
          {items?.length > 0 &&
            items.map((eachItem, i) => {
              return (
                <ProductCard
                  key={i}
                  image={eachItem.images[0]}
                  price={eachItem.price}
                  title={eachItem.title}
                  vendorName={eachItem.vendorName}
                  vendorPage={vendorPage}
                  id={eachItem._id}
                />
              );
            })}
        </Carousel>
      </section>

      <MobileCarousel products={items} />
    </section>
  );
};

export default ProductCategory;
