"use client";

import React from "react";
import Image from "next/image";
import { FooterData, Navigation } from "./types/FooterData";
import { classNames } from "@/_utils/helpers";
import { useProject } from "@providers/ProjectContext";

interface FooterProps {
  data: FooterData;
}

const FooterType1: React.FC<FooterProps> = ({ data }) => {
  const {
    logo,
    slogan,
    socials,
    navigation,
    polices,
    copyRight,
    showContentFlags,
  } = data;

  const { projectId } = useProject();

  const columns = 3;
  const splitNavigation = Array.from({ length: columns }, (_, i) =>
    navigation.filter((_, index) => index % columns === i)
  );

  return (
    <div className="z-30 bg-gray-50">
      <footer aria-labelledby="footer-heading">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="px-6 py-10 lg:px-20">
          <div className="flex flex-col xl:flex-row xl:flex-wrap xl:items-start gap-8 xl:gap-20">
            <div className="flex flex-col space-y-6 flex-shrink-0 xl:max-w-sm xl:flex-1">
              <Image src={logo} alt="Logo" width={230} height={48} />
                {showContentFlags.slogan === "on" && (
                  <p className="text-base font-normal text-neutral-500 break-words max-w-full xl:max-w-full">
                    {slogan}
                  </p>
                )}
              {showContentFlags.socials === "on" && (
                <div className="flex space-x-4">
                  {socials.map((item) => (
                    <a
                      key={item.name}
                      href={item.url}
                      target="_blank"
                      className="text-neutral-400 hover:text-neutral-500"
                    >
                      <span className="sr-only">{item.name}</span>
                      <i
                        className={classNames(
                          "pi text-neutral-500 text-[24px]",
                          item.icon
                        )}
                      />
                    </a>
                  ))}
                </div>
              )}
            </div>
            <div className="w-full xl:flex-[2] grid grid-cols-1 md:grid-cols-3 gap-8">
              {splitNavigation.map((column, colIndex) => (
                <ul key={colIndex} role="list" className="space-y-4">
                  {column.map((item, index) => (
                    <li key={index}>
                      <a
                        href={`/viewer/${projectId}${item.href}`}
                        className="text-base font-normal text-neutral-500 hover:text-neutral-800"
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
          {polices.length > 0 && (
            <div className="mt-10 flex flex-wrap justify-center gap-6 border-t border-neutral-800/10 pt-6">
              {polices.map((item, index) => (
                <a
                  key={index}
                  href={item.url}
                  className="text-base font-normal text-neutral-500 hover:text-neutral-800"
                >
                  {item.title}
                </a>
              ))}
            </div>
          )}
          {showContentFlags.copyRight == "on" && (
            <div className="mt-10 border-t border-neutral-800/10 pt-6">
              <p className="text-center text-base font-normal text-neutral-500">
                {copyRight}
              </p>
            </div>
          )}
        </div>
      </footer>
    </div>
  );
};

export default FooterType1;
