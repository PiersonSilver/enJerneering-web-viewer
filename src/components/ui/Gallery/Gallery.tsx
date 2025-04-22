"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { createPortal } from "react-dom";
import Slider, { Settings } from "react-slick";

import { GalleryControls, SliderControls } from "./GalleryControls";
import { PagingItemMedia } from "./PagingItem";
import { GalleryItem } from "./GalleryItem";
import { twMerge } from "tailwind-merge";
import { useGallery } from "./store";
import { PropsWithChildren, useEffect, useRef } from "react";
import { ScrollArea, ScrollBar } from "@internalComponents/ScrollArea";

export const Gallery = () => {
  const { media, sliderRef, isOpen, setActiveIndex } = useGallery((state) => ({
    media: state.media,
    sliderRef: state.sliderRef,
    isOpen: state.isOpen,
    setActiveIndex: state.setActiveIndex,
  }));

  const settings: Settings = {
    customPaging: (i) => {
      if (!media?.[i]) {
        return <></>;
      }

      return (
        <a className="brightness-50 transition-all">
          <PagingItemMedia media={media?.[i]} />
        </a>
      );
    },
    dots: true,
    appendDots: (dots) => <Dots>{dots}</Dots>,
    infinite: false,
    lazyLoad: "ondemand",
    arrows: false,
    fade: true,
    beforeChange: (_, nextSlideIndex) => {
      if (nextSlideIndex >= 0) {
        setActiveIndex(nextSlideIndex);
      }
    },
  };

  return createPortal(
    <div className={"fixed inset-0 z-10"} hidden={!isOpen}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
      <div className="flex flex-col relative h-screen">
        <Slider {...settings} ref={sliderRef}>
          {media.map((mediaItem, idx) => (
            <GalleryItem media={mediaItem} key={idx} />
          ))}
        </Slider>
        <GalleryControls />
        <SliderControls />
      </div>
    </div>,
    document.body
  );
};

const Dots = ({ children }: PropsWithChildren) => {
  const dotsRef = useRef<HTMLUListElement>(null);

  // useEffect(() => {
  //   const config: MutationObserverInit = {
  //     childList: true,
  //     attributes: true,
  //     subtree: true,
  //   };

  //   const callback: MutationCallback = (mutationList) => {
  //     for (const mutation of mutationList) {
  //       const target = mutation.target;

  //       if (mutation.type !== "attributes" || !(target instanceof Element)) {
  //         return;
  //       }

  //       const isActive = target.classList.contains("slick-active");

  //       if (isActive) {
  //         target.scrollIntoView({ inline: "center", behavior: "smooth" });
  //       }
  //     }
  //   };

  //   if (!dotsRef.current) return;

  //   const observer = new MutationObserver(callback);
  //   observer.observe(dotsRef.current, config);

  //   return () => {
  //     observer.disconnect();
  //   };
  // }, []);

  return (
    <div className="absolute left-1/2 -translate-x-1/2 bottom-8 backdrop-blur-xl bg-black/30 rounded-2xl max-w-[70vw]">
      <ScrollArea>
        <ul
          className={twMerge(
            "flex justify-center flex-nowrap [&>li]:w-auto [&>li]:h-auto bottom-8",
            "gap-3 [&_.slick-active_a]:brightness-100 p-3",
            "[&_.slick-active_a>div]:ring-2 [&_.slick-active_a>div]:ring-offset-1"
          )}
          ref={dotsRef}
        >
          {children}
        </ul>
        <ScrollBar orientation="horizontal" className="h-0" />
      </ScrollArea>
    </div>
  );
};
