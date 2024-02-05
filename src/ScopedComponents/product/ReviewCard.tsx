import { getShadow } from "@/helpers/getShadow";
import Image from "next/image";

type props = {
  comment: string;
  authorUsername: string;
  reaction: string;
  date: string;
  reactionIcons: any;
};
const ReviewCard = ({
  comment,
  authorUsername,
  reaction,
  date,
  reactionIcons,
}: props) => {
  const icon = reactionIcons.filter(
    (eachReaction: any) => eachReaction.type == reaction
  )[0];
  return (
    <section
      className={`w-full 
      ${`${getShadow(icon.type) + "-lg"}`}
      bg-[#fefefe] flex flex-col
     max-sm:max-w-[350px] justify-start items-center p-[16px] rounded-[12px] my-[10px] max-sm:mx-[15px]`}
    >
      <section className="w-full flex justify-between items-center mb-[16px]">
        <section className="flex justify-start items-center">
          <section
            className={`p-[6px] rounded-[50px] mr-[10px] bg-[#fff] cursor-pointer hover:rotate-45 transition-all
                              ${`${getShadow(icon.type) + "-lg"}`}`}
          >
            <figure className="relative w-[20px] h-[20px]">
              <Image src={icon.icon + ".svg"} alt={icon.type + " icon"} fill />
            </figure>
          </section>
          <span className="max-w-[150px] break-words font-bold">
            {authorUsername}
          </span>
        </section>
        <span className="text-[14px]">24/12/23</span>
      </section>

      <span className="w-full text-[15px]">{comment}</span>
    </section>
  );
};

export default ReviewCard;
