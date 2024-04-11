import React from "react";
import Input from "./Inputs";
import axios from "axios"; // Importa Axios
import { useForm } from "react-hook-form";

const Contact = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { name, last, email, message } = data;

    const emailData = {
      sender_email: "juancarlos192003@gmail.com",
      recipient_email: email,
      subject: "Asunto del correo",
      body: `Nombre: ${name} ${last}\nCorreo electrónico: ${email}\n\nMensaje:\n${message}`,
    };

    try {
      const response = await axios.post(
        "https://appbot-backend.herokuapp.com/send-email/",
        emailData
      );
      console.log("Correo enviado:", response.data);
    } catch (error) {
      console.error("Error al enviar el correo:", error);
    }
  };

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

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-6/12 max-sm:w-9/12 gap-6"
      >
        <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4">
          <Input
            name="name"
            label="First name"
            register={register}
            errors={errors.name}
          />
          <Input
            name="last"
            label="Last name"
            register={register}
            errors={errors.last}
          />
        </div>
        <div>
          <Input
            name="email"
            label="Email"
            type="email"
            register={register}
            errors={errors.email}
          />
        </div>
        <div>
          <Input
            name="message"
            label="Message"
            textarea={true}
            rows={4}
            register={register}
            errors={errors.message}
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

      {/* <div className="flex flex-row justify-between w-6/12 max-sm:w-9/12 gap-4 font-sans text-sm mt-16 max-sm:mt-5">
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
      </div> */}
      <div className="flex flex-row justify-between gap-10 font-sans text-sm mt-5">
        <a href="https://t.me/nodefleet" target="_blank" rel="noreferrer">
          <i className="fa-solid fa-paper-plane text-white text-md"></i>
        </a>
        <a
          href="https://twitter.com/nodefleet"
          target="_blank"
          rel="noreferrer"
        >
          <img src="/images/twitter2.svg" alt="twitter2" />
        </a>
        <a href="https://github.com/nodefleet" target="_blank" rel="noreferrer">
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
