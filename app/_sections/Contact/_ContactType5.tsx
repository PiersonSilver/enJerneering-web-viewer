/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { ContactData } from "./types/ContactData";
import { MapPinIcon } from "@heroicons/react/24/outline";

interface ContactProps {
  data: ContactData;
}

const ContactType5: React.FC<ContactProps> = ({ data }) => {
  const {
    title = "Default Title",
    subtitle = "Default Subtitle",
    phone = "+123456789",
    mail = "contact@enjerneering.com",
    address = "Default address",
    addressLabel = "Default label",
    mailLabel = "Default label",
    phoneLabel = "Default label",
    imgUrl = "default-image.jpg",
    mapSrc,
  } = data;

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-[1440px] px-6 py-20 lg:p-20 flex flex-col gap-10">
        <div className="mx-auto w-full md:max-w-screen-xl lg:max-w-none text-center">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-800 sm:text-4xl">
            {title}
          </h2>
          <p className="mt-6 text-base text-neutral-500">{subtitle}</p>
        </div>
        <div className="mx-auto w-full md:max-w-screen-xl lg:max-w-none grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-20">
          <div>
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-4 flex-shrink-0">
                <div className="flex w-12 h-12 p-3 items-center justify-center rounded-lg bg-neutral-400">
                  <MapPinIcon className="w-5 h-5 text-neutral-800" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xl font-semibold text-neutral-800">
                    Address
                  </span>
                  <span className="text-sm font-semibold text-neutral-500">
                    {addressLabel}
                  </span>
                  <span className="text-sm font-bold text-neutral-800">
                    {address}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-4 flex-shrink-0">
                <div className="flex w-12 h-12 p-3 items-center justify-center rounded-lg bg-neutral-400">
                  <i className="pi pi-envelope text-[24px] text-neutral-800" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xl font-semibold text-neutral-800">
                    Email
                  </span>
                  <span className="text-sm font-semibold text-neutral-500">
                    {mailLabel}
                  </span>
                  <span className="text-sm font-bold text-neutral-800">
                    <a href={`mailto:${mail}`}>{mail}</a>
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-4 flex-shrink-0">
                <div className="flex w-12 h-12 p-3 items-center justify-center rounded-lg bg-neutral-400">
                  <i className="pi pi-phone text-[24px] text-neutral-800" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xl font-semibold text-neutral-800">
                    Phone
                  </span>
                  <span className="text-sm font-semibold text-neutral-500">
                    {phoneLabel}
                  </span>
                  <span className="text-sm font-bold text-neutral-800">
                    <a href={`tel:${phone}`}>{phone}</a>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            <iframe
              src={mapSrc}
              width="656"
              height="436"
              className="rounded-2xl w-full shadow-xl"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactType5;
