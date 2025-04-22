/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import Image from "next/image";
import { CallToActionData } from "./types/CallToActionData";
import ButtonActions from "../ButtonActions";
import { classNames } from "@/_utils/helpers";

interface CallToActionProps {
  data: CallToActionData;
}

const CallToActionType3: React.FC<CallToActionProps> = ({ data }) => {
  const {
    title = "Default Title",
    subtitle = "Default Subtitle",
    tagLine = "Default Tagline",
    buttons,
    imgUrl = "default-image.jpg",
    isTagline,
    textColor,
    backgroundColor
  } = data;

  return (
    <div className="bg-neutral-800 relative">
      <div className="mx-auto max-w-[1440px] lg:flex lg:items-center lg:justify-between">
      <div className="flex flex-col lg:flex-row min-h-[464px]">
          <div className="flex flex-col justify-center gap-10 w-full lg:h-full  px-6 py-20 lg:p-20" style={{backgroundColor}}>
            <div className="flex flex-col gap-6 text-left">
              {isTagline === "on" &&(
                <span className="text-base uppercase font-bold text-neutral-400" style={{color: textColor}}>
                  {tagLine}
                </span>
              )}
              <h1 className="text-5xl leading-h4 text-gray-50" style={{color: textColor}}>{title}</h1>
              <h6 className="leading-6 text-neutral-400" style={{color: textColor}}>{subtitle}</h6>
            </div>

            <ButtonActions buttons={buttons}/>
          </div>

          <img
            alt="CTA Image"
            src={imgUrl}
            className="w-full lg:w-1/2 object-cover h-[300px] lg:h-auto"
          />

        </div>
      </div>
    </div>
  );
};

export default CallToActionType3;
