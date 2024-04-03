import React from "react";
import Input from "./Inputs";

const Contact = (props) => {
  return (
    <div
      className="flex flex-col gap-4 justify-center items-center text-white relative py-20 max-sm:py-14"
      id="Contact"
    >
      <img
        src="/images/end-lan.png"
        alt="home"
        className="absolute top-0 left-0 w-full h-full -z-10"
      />
      <h2 className="font-bold text-4xl mb-6">Contact Us</h2>

      <form className="flex flex-col w-6/12 max-sm:w-9/12 gap-6">
        <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4">
          <Input name="name" type="text" label="First name" required />
          <Input name="last" type="text" label="Last name" required />
        </div>
        <div>
          <Input name="email" type="email" label="Email" required />
        </div>
        <div>
          <Input
            name="message"
            label="Message"
            textarea={true}
            rows={4}
            required
          />
        </div>
        <div className="w-full">
          <button
            type="submit"
            className="w-full bg-green-300 text-morado font-bold text-base p-2 rounded-lg hover:bg-sky-300 transition-all"
          >
            Let's talk
          </button>
        </div>
      </form>

      <div className="flex flex-row justify-between w-6/12 max-sm:w-9/12 gap-4 font-sans text-sm mt-16 max-sm:mt-5">
        <a href="#About" className="hover:underline transition-all">
          About
        </a>
        <a href="#Pricing" className="hover:underline transition-all">
          Pricing
        </a>
        <a href="#FAQ" className="hover:underline transition-all">
          FAQ
        </a>
        <a href="#Press" className="hover:underline transition-all">
          Press
        </a>
        <a href="#Partners" className="hover:underline transition-all">
          Partners
        </a>
      </div>
      <div className="flex flex-row justify-between gap-10 font-sans text-sm mt-5">
        <a href="#instagram" target="_blank">
          <img src="/images/instagram.svg" alt="instagram" />
        </a>
        <a href="#twitter2" target="_blank">
          <img src="/images/twitter2.svg" alt="twitter2" />
        </a>
        <a href="#github" target="_blank">
          <img src="/images/github.svg" alt="github" />
        </a>
      </div>
      <div className="flex flex-row justify-between font-sans text-sm mt-5">
        <p className="text-gray-500 font-sans font-normal">
          © 2024 Nodefleet, Inc. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Contact;
