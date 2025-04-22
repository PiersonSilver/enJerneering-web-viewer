/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { ContactData } from "./types/ContactData";
import { classNames } from "@/_utils/helpers";
import FormContact from "./elements/FormContact";
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/24/outline";

interface ContactProps {
  data: ContactData;
}

// Pierson - Update Contact Types
const ContactType3: React.FC<ContactProps> = ({ data }) => {
  const {
    title,
    subtitle,
    phone,
    mail,
    address,
    imgUrl,
    contactPhone,
    contactEmail,
    contactAddress,
    nameField,
    emailField,
    phoneField,
    messageField,
    textColor,
    mapSrc
  } = data;

  // add requried fields to be passed through to FormContact
const requiredFields = {nameField, emailField, phoneField, messageField, mail }

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-[1440px] px-6 py-20 lg:p-20 flex flex-col gap-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-stretch">
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: textColor }}>
                {title}
              </h2>
              <p className="mt-4 text-base text-neutral-500" style={{ color: textColor }}>
                {subtitle}
              </p>
            </div>
            <FormContact requiredFields={requiredFields} />
          </div>

          <div className="flex flex-col gap-6 h-full">
            <div className="flex-1 flex">
              {imgUrl && (
                <div
                  className="w-full rounded-2xl bg-cover bg-center shadow-xl min-h-[150px]"
                  style={{ backgroundImage: `url(${imgUrl})` }}
                ></div>
              )}
            </div>

            {(contactPhone || contactEmail || contactAddress) && (
              <div className="text-sm text-neutral-700 bg-white p-6 rounded-2xl shadow-md w-full">
                {contactPhone && (
                  <div className="flex items-center gap-2 mb-2">
                    <PhoneIcon className="h-5 w-5 text-neutral-500" />
                    <span>{phone}</span>
                  </div>
                )}
                {contactEmail && (
                  <div className="flex items-center gap-2 mb-2">
                    <EnvelopeIcon className="h-5 w-5 text-neutral-500" />
                    <span>{mail}</span>
                  </div>
                )}
                {contactAddress && (
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="h-5 w-5 text-neutral-500" />
                    <span>{address}</span>
                  </div>
                )}
              </div>
            )}

            <div className="flex-1 flex">
              {mapSrc && (
                <iframe
                  src={mapSrc}
                  className="rounded-2xl w-full shadow-xl min-h-[150px]"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

};

export default ContactType3;
