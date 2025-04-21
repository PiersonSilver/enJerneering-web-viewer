/* eslint-disable @next/next/no-img-element */
import React from "react";
import { ContactData } from "./types/ContactData";
import FormContact from "./elements/FormContact";

interface ContactProps {
  data: ContactData;
}

// Pierson - Update Contact Types
const ContactType2: React.FC<ContactProps> = ({ data }) => {
  const {
    title,
    subtitle,
    mail,
    imgUrl,
    nameField,
    emailField,
    phoneField,
    messageField,
    textColor
  } = data;

  // add requried fields to be passed through to FormContact
const requiredFields = {nameField, emailField, phoneField, messageField, mail }

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-[1440px] grid grid-cols-1 gap-10 px-6 py-20 xl:gap-20 lg:p-20 lg:grid-cols-3">
        <div
          className="mx-auto max-w-screen-xl h-[400px] lg:h-full w-full bg-center bg-cover rounded-2xl shadow-xl"
          style={{ backgroundImage: `url(${imgUrl})` }}
        ></div>

        <div className="mx-auto max-w-screen-xl lg:max-w-none flex flex-col gap-6 lg:col-span-2">
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-800 sm:text-4xl" style={{color: textColor}}>
              {title}
            </h2>
            <p className="text-base text-neutral-500" style={{color: textColor}}>{subtitle}</p>
          </div>
          <FormContact requiredFields={requiredFields} />
        </div>
      </div>
    </div>
  );
};

export default ContactType2;
