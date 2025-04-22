"use client";

import { useEffect, useState } from "react";
import { Dialog, Popover } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { classNames } from "@/_utils/helpers";
import { NavbarData, NavbarMenu } from "./types/NavbarData";
import SubLink from "./elements/SubLinks";
import ButtonActions from "@components/ButtonActions";
import { ButtonSettingsData } from "@components/types";
import { useProject } from "@providers/ProjectContext";
import React from "react";

interface NavbarProps {
  type: number;
  data: NavbarData;
}




const Logo = ({ logo }: { logo: string }): JSX.Element => {
  return (
    <div className="flex">
      <a href={`/`} className="-m-1.5 p-1.5">
        <img className="h-[50px] w-auto" src={logo} alt="logo" />
      </a>
    </div>
)};

const BarIcon = ({ onClick }: { onClick: () => void }): JSX.Element => (
  <div className="flex">
    <button
      type="button"
      className="inline-flex items-center justify-center rounded-md p-2.5 text-black"
      onClick={onClick}
    >
      <Bars3Icon className="h-8 w-8" aria-hidden="true" />
    </button>
  </div>
);

const CloseIcon = ({ onClick }: { onClick: () => void }): JSX.Element => (
  <button
    type="button"
    className="-m-2.5 rounded-md p-2.5 text-black"
    onClick={onClick}
  >
    <XMarkIcon className="h-8 w-8" aria-hidden="true" />
  </button>
);

const MobileNavBar = ({
  projectId,
  logo,
  menuList,
  buttons,
  setMobileMenuOpen,
  mobileMenuOpen,
  type,
}: {
  projectId: string;
  logo: string;
  menuList: NavbarMenu[];
  buttons: ButtonSettingsData[];
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mobileMenuOpen: boolean;
  type: number;
}): JSX.Element => (
  <Dialog
    as="div"
    className="lg:hidden"
    open={mobileMenuOpen}
    onClose={setMobileMenuOpen}
  >
    <div className="fixed inset-0 z-[1000]" />
    <Dialog.Panel className="fixed inset-y-0 right-0 z-[1000] w-full overflow-y-auto bg-gray-50 px-6 py-4 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
      <div className="flex items-center justify-between">
        <Logo logo={logo} />
        <CloseIcon onClick={() => setMobileMenuOpen(false)} />
      </div>
      <div className="mt-6 flow-root">
        <div className="-my-6 divide-y divide-gray-500/10">
          <div className="space-y-2 py-6">
            {menuList.map((menuItem, menuIndex) =>
              menuItem.subLinks ? (
                <SubLink
                  type={type}
                  title={menuItem.title}
                  subLinks={menuItem.subLinks}
                  isMobile={true}
                  key={menuIndex}
                />
              ) : (
                <a
                  key={menuIndex}
                  href={`/viewer/${projectId}${menuItem.href}`}
                  className="block py-2 text-base font-semibold leading-8 text-gray-900"
                >
                  {menuItem.title}
                </a>
              )
            )}
          </div>
          <div className="py-6">
            <ButtonActions buttons={buttons}/>
          </div>
        </div>
      </div>
    </Dialog.Panel>
  </Dialog>
);

const NavbarType1: React.FC<NavbarProps> = ({ type, data }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const { projectId } = useProject();

  const { logo, menuList, buttons, isCtaButton, justifyContent } = data;
  console.log("BUTTONS:" + buttons);

  return (
    <header className="bg-gray-50 z-50 relative">
      <nav
        className="mx-auto flex max-w-[1440px] items-center justify-between gap-10 pt-4 pb-5 lg:gap-20 lg:px-6 sm:px-6 px-8"
        aria-label="Global"
      >
        <Logo logo={logo} />

        <div className="flex flex-shrink-0 items-center gap-2 lg:hidden">
          <BarIcon onClick={() => setMobileMenuOpen(true)} />
        </div>
        <Popover.Group
          className={classNames(
            "hidden lg:flex lg:flex-1 lg:gap-x-6 xl:gap-x-12",
            justifyContent ? `justify-${justifyContent}` : "justify-start"
          )}
        >
          {menuList.map((menuItem, menuIndex) =>
            menuItem.subLinks ? (
              <SubLink
                type={type}
                title={menuItem.title}
                subLinks={menuItem.subLinks}
                isMobile={false}
                key={menuIndex}
              />
            ) : (
              <a
                key={menuIndex}
                href={`/viewer/${projectId}${menuItem.href}`}
                className="text-base font-semibold leading-8 text-gray-900 hover:text-primary-700 transition-all duration-300 ease-in-out"
              >
                {menuItem.title}
              </a>
            )
          )}
        </Popover.Group>
        {isCtaButton === "on" && (
          <div className="hidden lg:flex lg:justify-end">
            <ButtonActions buttons={buttons}/>
          </div>
        )}
      </nav>
      <MobileNavBar
        projectId={projectId}
        logo={logo}
        menuList={menuList}
        buttons={buttons}
        setMobileMenuOpen={setMobileMenuOpen}
        mobileMenuOpen={mobileMenuOpen}
        type={type}
      />
    </header>
  );
};

export default NavbarType1;
