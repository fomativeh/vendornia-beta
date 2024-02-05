import { ReactionCount } from "@/ScopedComponents/product/ReactionCount";
import ReviewCard from "@/ScopedComponents/product/ReviewCard";
import { reactionIconsType } from "@/app/Product/[id]/page";
import { getShadow } from "@/helpers/getShadow";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import MoreBtn from "../MoreBtn/MoreBtn";

type ReviewSectionProps = {
  handleReviewSubmit: (e: any) => Promise<void>;
  reactionIcons: any[];
  reaction: string | null;
  handleReaction: (data: string) => void;
  comment: string;
  setComment: (data: string) => void;
  reviewBG: string;
  productData: any;
};

const ReviewSection = ({
  handleReviewSubmit,
  reactionIcons,
  reaction,
  handleReaction,
  comment,
  setComment,
  reviewBG,
  productData,
}: ReviewSectionProps) => {
  const [placeholder, setPlaceholder] = useState<string>("Share your review.");
  useEffect(() => {
    if (reaction === "like") {
      setPlaceholder("Tell people why you like this product.");
    } else if (reaction === "dislike") {
      setPlaceholder("Tell people why you dislike this product.");
    } else if (reaction === "love") {
      setPlaceholder("Tell people why you love this product.");
    } else if (reaction === "warn") {
      setPlaceholder("Share your warning about this product.");
    } else {
      setPlaceholder("Share your review.");
    }
  }, [reaction]);
  return (
    <section className="w-full flex flex-col justify-start items-start max-tablet:px-0 px-[10px]">
      <h2 className="text-themeBlue font-bold text-[25px]">Reviews</h2>
      <section className="w-full mt-[12px] flex flex-col justify-start items-start mb-[20px]">
        <section className="w-full flex flex-col justify-start items-start">
          <section className="w-full flex justify-start items-center mb-[10px]">
            <span className="font-bold">Feedbacks(200)</span>
            <MoreBtn text={"See all"} />
          </section>
          <section className="w-full flex justify-start items-center flex-wrap">
            <ReactionCount type="love" count={20} />
            <ReactionCount type="like" count={20} />
            <ReactionCount type="dislike" count={20} />
            <ReactionCount type="warn" count={20} />
          </section>
        </section>

        <section className="w-full flex flex-wrap justify-center items-center">
          {productData?.reviews?.length > 0 &&
            productData?.reviews?.map((eachReview: any, i: number) => {
              return (
                <ReviewCard
                  reactionIcons={reactionIcons}
                  key={i}
                  authorUsername={eachReview.authorUsername}
                  comment={eachReview.comment}
                  reaction={eachReview.reaction}
                  date={eachReview.createdAt}
                />
              );
            })}
        </section>

        <form
          onSubmit={handleReviewSubmit}
          className="mt-[20px] max-tablet:w-full p-[12px] w-full rounded-[12px] shadow-2 flex flex-col justify-start items-center shadow"
        >
          <section className="flex w-full flex-col justify-start items-start">
            <span className="max-sm:text-[12px] text-[15px] font-semibold mb-[10px]">
              Add yours
            </span>
            <section className="w-full flex justify-start items-center">
              {reactionIcons.map((eachIcon: reactionIconsType, i: number) => {
                const currentIconType = eachIcon.type;
                return (
                  <section
                    key={i}
                    className={`p-[8px] rounded-[50px] mr-[10px] bg-[#fff] cursor-pointer hover:rotate-45 transition-all
                              ${
                                eachIcon.type == reaction &&
                                `${getShadow(currentIconType) + "-lg"}`
                              }`}
                    onClick={() => handleReaction(eachIcon.type)}
                  >
                    <figure className="relative w-[25px] h-[25px]">
                      <Image
                        src={eachIcon.icon + ".svg"}
                        alt={eachIcon.type + " icon"}
                        fill
                      />
                    </figure>
                  </section>
                );
              })}
            </section>
          </section>

          <textarea
            className="mt-[15px] w-full min-w-full max-h-[150px] h-[70px] min-h-[50px] border-[#000] outline-none border-[1px] border-solid rounded-[10px] text-[14px]
                  max-w-full pl-[10px] pt-[10px] placeholder:text-[12px] placeholder:text-[#676767]"
            placeholder={placeholder}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <button
            type="submit"
            style={{ backgroundColor: reviewBG }}
            className={`w-full mt-[10px] rounded-[12px] text-[#fff] h-[40px]`}
          >
            Share review
          </button>
        </form>
      </section>
    </section>
  );
};

export default ReviewSection;
