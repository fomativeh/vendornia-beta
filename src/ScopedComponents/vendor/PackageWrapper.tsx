import Image from "next/image";

type PackageProps = {
    planName: string;
    color: string;
    price: string;
    features: string[];
  };
  
  const PackageWrapper = ({ planName, color, price, features }: PackageProps) => {
    const pickPlanImage = () => {
      switch (planName) {
        case "Gold":
          return "feature-gold";
          break;
        case "Diamond":
          return "feature-diamond";
          break;
  
        case "Silver":
          return "feature-silver";
          break;
      }
    };
    return (
      <section
        className={`max-mobile:w-[100%] w-[250px] py-[20px] rounded-[20px] flex flex-col justify-start items-center m-[25px]`}
        style={{ backgroundColor: `${color}` }}
      >
        <header className="flex justify-start items-center px-[10px] py-[7px] rounded-[30px] bg-[#fff] text-center font-bold">
          <span className={`text-[14px] mr-[10px]`} style={{ color: `${color}` }}>
            {planName}
          </span>
          <span
            className={`text-[#fff] text-[12px] py-[5px] px-[8px] rounded-[30px]`}
            style={{ backgroundColor: `${color}` }}
          >
            {price}/month
          </span>
        </header>
        <span className="mt-[20px] text-[20px] font-bold text-[#fff] w-[80%] text-center">
          Features
        </span>
  
        <section className="w-[80%] mt-[10px] flex flex-col justify-start items-start">
          {features &&
            features?.length > 0 &&
            features.map((eachFeature: string, index: number) => {
              return (
                <section
                  className="w-full flex justify-start items-center my-[5px]"
                  key={index}
                >
                  <figure className="w-[27px] min-w-[27px] min-h-[27px] h-[27px] relative mr-[10px]">
                    <Image
                      src={`/assets/icons/${pickPlanImage()}.svg`}
                      alt={"Plan feature icon"}
                      fill
                    />
                  </figure>
                  <span className="text-[#fff] font-semibold text-[14px]">
                    {eachFeature}
                  </span>
                </section>
              );
            })}
        </section>
  
        <button
          className="w-[90%] py-[10px] rounded-[8px] bg-[#fff] border-none mt-[20px] font-semibold"
          style={{ color: color }}
        >
          Subscribe
        </button>
      </section>
    );
  };

  export default PackageWrapper