/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import ModalVideo from "../ModalVideo";
import { MainContentData } from "./types/MainContentData";
import { StaticImageData } from "next/image";

interface MainContentProps {
  data: MainContentData;
}

const MainContentType3: React.FC<MainContentProps> = ({ data }) => {
  const {
    title,
    subtitle,
    videoUrl = "",
    videoThumb,
    textColor,
    backgroundColor,
  } = data;

  return (
    <div style={{backgroundColor}}>
      <div className="mx-auto max-w-[1440px] px-6 py-20 lg:p-20">
        <div className="mx-auto w-full lg:mx-0 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-800 sm:text-4xl" style={{ color: textColor }}>
            {title}
          </h2>
          <p className="mt-4 text-base text-neutral-500" style={{ color: textColor }}>{subtitle}</p>
        </div>
        <div className="flex justify-center w-full mt-10">
          <ModalVideo
            thumb={videoThumb as unknown as StaticImageData}
            thumbWidth={1280}
            thumbHeight={460}
            thumbAlt="video thumbnail"
            video={videoUrl}
            videoWidth={1920}
            videoHeight={1080}
          />
        </div>
      </div>
    </div>
  );
};

export default MainContentType3;
