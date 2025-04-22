"use client";

import React from "react";
import { Disclosure, Popover } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { classNames } from "@/_utils/helpers";
import Featured from "../Featured";
import { SubLink } from "../../types/NavbarData";
import { NavbarData } from "../../types/NavbarData";
import { navbarData } from "@components/meta";

interface HeaderProps {
  title: string;
  subLinks: SubLink[];
  isMobile: boolean;
}

interface SubComponentProps {
  title: string;
  groupedSubLinks: { [key: string]: SubLink[] };
}

/**
 * SubLink component is used to render sub links in the navbar
 * @param param0 = { title, subLinks }
 * @returns
 */
const SubLinkMobile: React.FC<SubComponentProps> = ({
  title,
  groupedSubLinks,
}) => {
  return (
    <Disclosure as="div" className="-mx-3">
      {({ open }) => (
        <>
          <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-8 text-gray-900">
            {title}
            <ChevronDownIcon
              className={classNames(
                open ? "rotate-180" : "",
                "h-5 w-5 flex-none"
              )}
              aria-hidden="true"
            />
          </Disclosure.Button>
          <Disclosure.Panel className="mt-2 space-y-2">
            {Object.entries(groupedSubLinks).map(
              ([pageGroup, subLinks], index) => (
                <div className="flex flex-col gap-4 py-2 pl-6 pr-3" key={index}>
                  <span className="text-sm font-normal text-neutral-500">
                    {pageGroup}
                  </span>
                  {subLinks.map(({ title, href }, index) => (
                    <a
                      key={index}
                      className="block rounded-lg pl-3  text-sm font-semibold text-gray-800"
                      href={href}
                    >
                      <span>{title}</span>
                    </a>
                  ))}
                </div>
              )
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

/**
 * SubLink component is used to render sub links in the navbar
 * @param param0 = { title, groupedSubLinks }
 * @returns
 */
const SubLinkWeb: React.FC<SubComponentProps> = ({
  title,
  groupedSubLinks,
}) => {
  return (
    <Popover>
      {({ open }) => (
        <>
          <Popover.Button className="flex items-center gap-x-1 text-base font-semibold leading-8 text-gray-900 hover:text-primary-700 transition-all duration-300 ease-in-out focus:border-0 focus:outline-0 focus:text-primary-700">
            {title}
            <ChevronDownIcon
              className={classNames(
                open ? "rotate-180" : "",
                "h-5 w-5 flex-none transition-all duration-300 ease-out"
              )}
              aria-hidden="true"
            />
          </Popover.Button>
          <Popover.Panel className="absolute inset-x-0 top-0 mt-[86px] z-[1000] w-screen bg-gray-50 shadow-sm border border-gray-200">
            <div className="mx-auto grid grid-cols-2">
              <div className="grid grid-cols-2 px-6 py-6 lg:px-10 xl:gap-x-20 gap-y-6">
                {Object.entries(groupedSubLinks).map(
                  ([pageGroup, subLinks], index) => (
                    <div className="flex flex-col gap-4" key={index}>
                      <span className="text-sm font-normal text-neutral-500">
                        {pageGroup}
                      </span>
                      <div className="flex flex-col gap-6">
                        {subLinks.map(({ title, subTitle, icon, href }) => (
                          <div
                            className="flex gap-2 hover:bg-gray-200 p-2 rounded-md"
                            key={index}
                          >
                            {icon && <i className={classNames("pi", icon)}></i>}
                            <a
                              key={title}
                              href={href}
                              className="flex flex-col gap-1 min-w-[175px] hover:text-primary-700 transition-all duration-300 ease-in-out"
                            >
                              <span className="text-sm leading-[14px] font-semibold text-neutral-800">
                                {title}
                              </span>
                              {subTitle && (
                                <span className="text-xs font-normal text-neutral-500">
                                  {subTitle}
                                </span>
                              )}
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </div>

              <Featured data={navbarData.featuredData || []} />
            </div>
          </Popover.Panel>
        </>
      )}
    </Popover>
  );
};

/**
 * SubLink component is used to render sub links in the navbar
 * @param param0 = { title, subLinks, isMobile }
 * @returns
 */
const SubLinkType2: React.FC<HeaderProps> = ({ title, subLinks, isMobile }) => {
  const groupedSubLinks: { [key: string]: SubLink[] } = {};

  subLinks.forEach((subLink) => {
    const pageGroup = subLink.pageGroup || "Default";
    if (!groupedSubLinks[pageGroup]) {
      groupedSubLinks[pageGroup] = [];
    }
    groupedSubLinks[pageGroup].push(subLink);
  });

  return (
    <>
      {isMobile ? (
        <SubLinkMobile title={title} groupedSubLinks={groupedSubLinks} />
      ) : (
        <SubLinkWeb title={title} groupedSubLinks={groupedSubLinks} />
      )}
    </>
  );
};

export default SubLinkType2;
