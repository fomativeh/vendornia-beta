import "./styles.scss";

const MoreBtn = ({ text}: { text: string;}) => {
  return (
    <button className="border-[#fff] border-[1px]
    dark flex justify-start items-center ml-[10px] cursor-pointer font-semibold text-[#fff] bg-[#00007F] px-[12px] py-[8px] rounded-[20px]">
      <span className="mr-[5px]">{text}</span>
      <figure className="w-[14px] h-[12px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          viewBox="0 0 13 12"
          fill="none"
        >
          <path
            d="M12.7066 6.70664C13.0973 6.31602 13.0973 5.68164 12.7066 5.29102L7.70664 0.291016C7.31602 -0.0996094 6.68164 -0.0996094 6.29102 0.291016C5.90039 0.681641 5.90039 1.31602 6.29102 1.70664L10.5848 6.00039L6.29414 10.2941C5.90352 10.6848 5.90352 11.3191 6.29414 11.7098C6.68477 12.1004 7.31914 12.1004 7.70977 11.7098L12.7098 6.70977L12.7066 6.70664ZM1.70664 11.7066L6.70664 6.70664C7.09727 6.31602 7.09727 5.68164 6.70664 5.29102L1.70664 0.291016C1.31602 -0.0996094 0.681641 -0.0996094 0.291016 0.291016C-0.0996094 0.681641 -0.0996094 1.31602 0.291016 1.70664L4.58477 6.00039L0.294141 10.2941C-0.0964844 10.6848 -0.0964844 11.3191 0.294141 11.7098C0.684766 12.1004 1.31914 12.1004 1.70977 11.7098L1.70664 11.7066Z"
            fill="white"
            className="icon"
          />
        </svg>
      </figure>
    </button>
  );
};

export const MoreBtnLight = ({
  text,
}: {
  text: string;
}) => {
  return (
    <button className="hover:bg-[#d1d1d1] transition-all flex justify-start items-center border-none ml-[10px] cursor-pointer font-semibold bg-[#fff] text-themeBlue px-[12px] py-[8px] rounded-[20px]">
      <span className="mr-[5px]">{text}</span>
      <figure className="w-[14px] h-[12px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          viewBox="0 0 13 12"
          fill="none"
        >
          <path
            d="M12.7066 6.70664C13.0973 6.31602 13.0973 5.68164 12.7066 5.29102L7.70664 0.291016C7.31602 -0.0996094 6.68164 -0.0996094 6.29102 0.291016C5.90039 0.681641 5.90039 1.31602 6.29102 1.70664L10.5848 6.00039L6.29414 10.2941C5.90352 10.6848 5.90352 11.3191 6.29414 11.7098C6.68477 12.1004 7.31914 12.1004 7.70977 11.7098L12.7098 6.70977L12.7066 6.70664ZM1.70664 11.7066L6.70664 6.70664C7.09727 6.31602 7.09727 5.68164 6.70664 5.29102L1.70664 0.291016C1.31602 -0.0996094 0.681641 -0.0996094 0.291016 0.291016C-0.0996094 0.681641 -0.0996094 1.31602 0.291016 1.70664L4.58477 6.00039L0.294141 10.2941C-0.0964844 10.6848 -0.0964844 11.3191 0.294141 11.7098C0.684766 12.1004 1.31914 12.1004 1.70977 11.7098L1.70664 11.7066Z"
            fill="#00007F"
          />
        </svg>
      </figure>
    </button>
  );
};

export default MoreBtn;
