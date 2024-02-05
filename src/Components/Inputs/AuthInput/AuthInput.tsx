import React, { Dispatch } from "react";

type inputType = {
  value: string;
  setValue: Dispatch<React.SetStateAction<string>>
  type?: string;
  label: string;
};

const AuthInput = ({ value, setValue, type, label }: inputType) => {
  const placeholder = ()=>{
    switch (label){
      case "Username":
        return "ex:JamesCollections"
      break;
      case "Email":
        return "ex:example@domain.com"
      break;
      case "Password":
        return "ex:123456!@#$"
      break;
    }
  }
  return (
    <section className="w-full flex flex-col justify-start items-start my-[7px]">
      <label htmlFor={label} className="font-bold">{label}</label>
      <input
        type={type && type.length !== 0 ? type : "text"}
        placeholder={placeholder()}
        id={label}
        value={value}
        onChange={(e)=>setValue(e.target.value)}
        className="placeholder:text-[#c0c0c0a8] mt-[7px] border-[2px] border-[#000] outline-none rounded-[10px] pl-[12px] w-full h-[40px]"
      />
    </section>
  );
};

export default AuthInput;
