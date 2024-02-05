import { getShadow } from "@/helpers/getShadow";
import Image from "next/image";

export const ReactionCount = ({ type, count }: { type: string; count: number }) => {
    const setVerb = (type: string) => {
      switch (type) {
        case "like":
          return "liked";
          break;
        case "dislike":
          return "disliked";
          break;
        case "love":
          return "loved";
          break;
        default:
          return "warned";
      }
    };
    const verb = setVerb(type);
  
    const shadow = getShadow(type);
    return (
      <section
        className={`flex justify-start items-center my-[5px] mr-[10px] rounded-[12px] shadow-2 p-[10px] ${shadow}`}
      >
        <figure className="relative w-[18px] h-[18px] mr-[7px]">
          <Image
            src={`/assets/icons/${type}-active.svg`}
            alt={"Reaction icon"}
            fill
          />
        </figure>
        <span className="text-[12px] font-semibold text-silver">
          {count + " people " + verb}
        </span>
      </section>
    );
  };