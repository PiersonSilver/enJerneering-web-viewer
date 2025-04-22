"use client";

import React from "react";
import { MainContentData, SubHeading } from "./types/MainContentData";
import Image from "next/image";

interface MainContentProps {
  data: MainContentData;
}

const SubHeadingItem = ({ item }: { item: SubHeading }): JSX.Element => (
  <div className="flex p-2 gap-3.5 items-center">
    <Image
      src="/img/check-circle.svg"
      width={24}
      height={24}
      alt="check-icon"
    />
    <div className="flex flex-col gap-1">
      <span className="text-sm font-semibold text-neutral-800">
        {item.title}
      </span>
      <span className="text-sm font-normal text-neutral-500">
        {item.subtitle}
      </span>
    </div>
  </div>
);

const MainContentType1: React.FC<MainContentProps> = ({ data }) => {
  const {
    title,
    subtitle ,
    tagLine,
    imgUrl,
    subHeading,
    backgroundColor,
    textColor,
    isTagline
  } = data;


  // Pierson - add working colors and showings based on input data
  return (
    <div className="relative" style={{ backgroundColor }}>
      <div className="mx-auto max-w-[1440px] min-h-[624px] px-6 py-20 gap-10 lg:p-20 flex items-center justify-between flex-col-reverse lg:flex-row lg:gap-20">
        <div
          className="mx-auto max-w-screen-xl lg:mx-0 flex flex-col gap-10 w-full h-[466px] lg:w-1/2 rounded-2xl lg:shadow-xl bg-cover bg-center"
          style={{ backgroundImage: `url(${imgUrl})` }}
        ></div>
        <div className="mx-auto max-w-screen-xl mt-10 lg:h-full lg:w-1/2 lg:mt-0">
          <div className="flex flex-col gap-4 text-left">
          {isTagline === "on" && (
              <span className="text-base uppercase font-bold" style={{ color: textColor }}>
                {tagLine}
              </span>
          )}
            <h5 style={{ color: textColor }}>{title}</h5>
            <p className="text-base font-normal text-neutral-500" style={{ color: textColor }}>{subtitle}</p>
          </div>
          <div className="flex flex-col gap-1 mt-6">
            {subHeading?.map((item, index) => (
              <SubHeadingItem item={item} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContentType1;
