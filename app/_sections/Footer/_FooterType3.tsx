"use client";

import React from "react";
import Image from "next/image";
import { FooterData, Navigation } from "./types/FooterData";
import { classNames } from "@/_utils/helpers";
import { useProject } from "@providers/ProjectContext";


interface FooterProps {
  data: FooterData;
}

const FooterType3: React.FC<FooterProps> = ({ data }) => {
  const {
    logo,
    slogan,
    socials,
    navigation,
    polices,
    copyRight,
    showContentFlags,
  } = data;

  const {projectId} = useProject();

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
      <div>
      <div className="flex flex-col gap-8 px-6 py-10 lg:px-20 xl:flex-row xl:gap-20 xl:flex-nowrap">
        <div className="flex flex-col space-y-6 flex-shrink-0 xl:max-w-[480px] w-full xl:w-auto min-w-0 pb-6 border-b xl:border-r xl:border-b-0 xl:pr-20 border-neutral-800/10">
          <Image src={logo} alt="Logo" width={230} height={48} />
            {showContentFlags.slogan === "on" && (
              <p className="text-base font-normal text-neutral-500 w-full break-words max-w-full overflow-hidden text-ellipsis">
                {slogan}
              </p>
            )}
            {showContentFlags.copyRight === "on" && (
              <p className="text-base font-normal text-neutral-500">
                {copyRight}
              </p>
            )}
          </div>
          <div className="flex-1 min-w-0 grid grid-cols-2 xl:grid-cols-3 gap-8">
            {splitNavigation.map((column, colIndex) => (
              <div key={colIndex}>
                <ul role="list" className="space-y-4">
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
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-6 justify-between px-6 lg:px-20 py-6 bg-neutral-800">
          <div className="flex flex-wrap flex-shrink-0 gap-4 lg:justify-center min-w-[200px] w-full">
            {polices.map((item, index) => (
              <a
                key={index}
                href={item.url}
                className="text-base font-normal text-gray-50 hover:text-neutral-500"
              >
                {item.title}
              </a>
            ))}
          </div>
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
                      "pi text-gray-50 text-[24px]",
                      item.icon
                    )}
                  />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  </div>
);
};

export default FooterType3;
