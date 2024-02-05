import Image from "next/image";
import React from "react";
import addReviewIcon from "../../../../public/assets/icons/addReview.svg";
import seeReviewsIcon from "../../../../public/assets/icons/seeReviews.svg";

const IconButton = ({
  bg,
  addReview,
  seeReviews,
}: {
  bg?: string;
  addReview?: boolean;
  seeReviews?: boolean;
}) => {
  return (
    <button
      className={`border-none flex justify-center items-center px-[15px] sm:px-[16px] py-[9px] rounded-[20px] ${
        bg && bg.length !== 0 ? `bg-[${bg}]` : `bg-themeBlue`
      } text-white`}
    >
      <span className="mr-[10px] sm:mr-[11px] text-[14px] sm:text-[17px] font-bold">
        {addReview ? `Add yours` : `See all reviews`}
      </span>
      {addReview ? (
        <figure className="w-[20px] h-[25px] relative">
          <Image src={addReviewIcon} alt={"Review icon"} fill />
        </figure>
      ) : (
        <figure className="w-[22px] h-[25px] relative">
          <Image src={seeReviewsIcon} alt={"Review icon"} fill />
        </figure>
      )}
    </button>
  );
};

export default IconButton;
