import React from "react";
import loginIcon from "../../../../public/assets/icons/login.svg";
import signupIcon from "../../../../public/assets/icons/signup.svg";
import googleIcon from "../../../../public/assets/icons/google.svg";

import Image from "next/image";

const AuthBtn = ({ fit, role, action }: { fit?: boolean; role: string, action?:any }) => {
  const getSrc = () => {
    switch (role) {
      case "signup":
        return {
          icon: signupIcon,
          message: "Join the family",
          alt: "Signup icon",
        };
        break;

      case "signin":
        return { icon: loginIcon, message: "Get back in", alt: "Login icon" };
        break;

      default:
        return { icon: googleIcon, message: "Get in with google", alt: "Google icon" };
    }
  };

  return (
    <button
      className={`flex justify-center items-center bg-[#000] hover:bg-[#303030] text-[#fff] rounded-[12px] py-[12px] mt-[15px] ${
        fit ? `w-fit` : `w-full px-[20px]`
      }`}
      onClick={action}
    >
      <span className="mr-[7px]">
        {getSrc()?.message}
      </span>
      <figure className="relative w-[34px] h-[25px]">
        <Image
          src={getSrc()?.icon}
          alt={getSrc()?.alt as string}
          fill
        />
      </figure>
    </button>
  );
};

export default AuthBtn;
