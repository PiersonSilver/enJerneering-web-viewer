"use client";

import React from "react";
import { Disclosure, Popover } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { classNames } from "@/_utils/helpers";
import { SubLink } from "../../types/NavbarData";

interface HeaderProps {
  title: string;
  subLinks: SubLink[];
  isMobile: boolean;
}

interface SubLinkComponentProps {
  title: string;
  subLinks: SubLink[];
}

/**
 * SubLink component is used to render sub links in the navbar
 * @param param0 = { title, subLinks }
 * @returns
 */
const SubLinkMobile: React.FC<SubLinkComponentProps> = ({
  title,
  subLinks,
}) => (
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
          {subLinks.map(({ title, href }: SubLink, index) => (
            <a
              key={index}
              className="block rounded-lg py-2 pl-6 pr-3 text-sm font-normal text-gray-500"
              href={href}
            >
              {title}
            </a>
          ))}
        </Disclosure.Panel>
      </>
    )}
  </Disclosure>
);

/**
 * SubLink component is used to render sub links in the navbar
 * @param param0 = { title, subLinks }
 * @returns
 */
const SubLinkWeb: React.FC<SubLinkComponentProps> = ({ title, subLinks }) => (
  <Popover className="relative flex-shrink-0">
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

        <Popover.Panel className="absolute -left-8 top-full z-[1000] w-screen max-w-[620px] rounded-md bg-gray-50 shadow-sm border border-gray-200">
          <div className="grid grid-cols-3 gap-4 p-6">
            {subLinks.map(({ title, href }: SubLink, index) => (
              <a
                key={index}
                href={href}
                className="text-sm font-normal text-gray-500 hover:bg-gray-200 p-2 rounded-md min-w-[175px] hover:text-primary-700 transition-all duration-300 ease-in-out"
              >
                {title}
              </a>
            ))}
          </div>
        </Popover.Panel>
      </>
    )}
  </Popover>
);

/**
 * SubLink component is used to render sub links in the navbar
 * @param param0 = { title, subLinks, isMobile }
 * @returns
 */
const SubLinkType1: React.FC<HeaderProps> = ({ title, subLinks, isMobile }) => {
  return (
    <>
      {isMobile ? (
        <SubLinkMobile title={title} subLinks={subLinks} />
      ) : (
        <SubLinkWeb title={title} subLinks={subLinks} />
      )}
    </>
  );
};

export default SubLinkType1;
