import Image from "next/image";

const VendorCard = () => {
  const t = ["shoes", "bags", "clothes", "phones"];
  return (
    <section
      className="cursor-pointer basis-[250px] h-fit flex-grow max-w-[400px] max-sidebar-bk:basis-[180px] max-sidebar-bk:max-w-[300px]
      flex justify-between items-center bg-[#fff] shadow-2 vendor-card hover:border-themeBlue border-[#c0c0c000] border-[1px] m-[10px] rounded-[10px] max-sidebar-bk:flex-col max-sidebar-bk:justify-start"
    >
      <figure className="w-[50%] max-sidebar-bk:w-full h-[120px]  relative rounded-[10px]">
        <Image
          src={"/assets/images/woman.jpg"}
          alt={"Vendor logo"}
          fill
          className="rounded-[inherit]"
        />
      </figure>
      <section className="w-[50%] max-sidebar-bk:w-full flex flex-col justify-start items-start py-[8px] px-[10px] max-h-[120px]">
        <span className="text-themeBlue text-[14px] font-bold w-full mb-[7px]">
         {"Joy's classic collections"}
        </span>
        <span className="text-[11px] font-semibold">
          We sell all kinds of shoes, bags, etc.
        </span>
        <section className="w-full flex flex-wrap justify-start items-center mt-[5px]">
          {t.map((e, i) => {
            return (
              <span
              key={i}
                className="text-[#452a89]
            text-[10px] font-medium m-[2px]
           "
              >
                #{e}
              </span>
            )
          })}
        </section>
      </section>
    </section>
  );
};

export default VendorCard;
