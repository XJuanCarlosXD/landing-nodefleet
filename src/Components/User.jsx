import React from "react";

const User = ({ twitter, linke, telegram, images, className }) => {
  return (
    <div className="group rounded-full border-4 border-white relative  flex flex-col items-center justify-center">
      <img
        src={`/images/users/${images}`}
        alt="lowell"
        className={`w-36 rounded-full group-hover:opacity-10 transition-all ${className}`}
      />
      <div className="absolute flex flex-row justify-center items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
        <a
          href={twitter}
          target="_blank"
          className="bg-sky-300 p-2 rounded-full"
          rel="noreferrer"
        >
          <img src="/images/twitter.svg" alt="twitter" className="w-5" />
        </a>
        <a
          href={linke}
          target="_blank"
          className="bg-sky-300 p-2 rounded-full"
          rel="noreferrer"
        >
          <img src="/images/linke.svg" alt="linke" className="w-5" />
        </a>
        <a
          href={telegram}
          target="_blank"
          className="bg-sky-300 p-2 rounded-full"
          rel="noreferrer"
        >
          <img src="/images/telegram.svg" alt="telegram" className="w-5" />
        </a>
      </div>
    </div>
  );
};

export default User;
