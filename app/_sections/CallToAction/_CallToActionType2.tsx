"use client";

import React from "react";
import { CallToActionData } from "./types/CallToActionData";
import ButtonActions from "../ButtonActions";
import Image from "next/image";

interface CallToActionProps {
  data: CallToActionData;
}

const CallToActionType2: React.FC<CallToActionProps> = ({ data }) => {
  const {
    title,
    subtitle,
    tagLine,
    buttons,
    imgUrl = "default-image.jpg",
    isTagline,
    textColor,
  } = data;

  return (
    <div className="flex justify-center bg-neutral-800 relative">
      <div className="absolute inset-0 z-0">
        <Image
          src={imgUrl}
          layout="fill"
          objectFit="cover"
          quality={100}
          alt="Background Image"
        />
        {/* Tint Overlay */}
        <div className="absolute inset-0 bg-gray-500 opacity-50"></div>{" "}
        {/* Gray tint */}
      </div>
      <div className="max-auto w-full max-w-[1440px] px-6 py-20 lg:p-20 gap-6 md:flex lg:items-center lg:justify-start lg:gap-16 z-10 relative">
        <div className="flex flex-col items-start justify-center gap-6 lg:mt-0 lg:h-full">
          <div className="flex flex-col gap-6">
            {isTagline === "on" && (
              <span className="text-neutral-400 text-base uppercase font-bold" style={{color: textColor}}>
                {tagLine}
              </span>
            )}
            <h1 className="text-5xl leading-h4 text-gray-50" style={{color: textColor}}>{title}</h1>
            <h6 className="leading-6 text-neutral-400" style={{color: textColor}}>{subtitle}</h6>
          </div>

          <ButtonActions buttons={buttons}/>
        </div>
      </div>
    </div>
  );
};

export default CallToActionType2;
