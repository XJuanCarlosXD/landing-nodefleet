import React from "react";
import { Outlet } from "react-router-dom";

const Navbar = (props) => {
  const Menu = [
    { name: "Home", hash: "#Home" },
    { name: "Service", hash: "#Service" },
    { name: "Our Team", hash: "#OurTeam" },
    { name: "Contact", hash: "#Contact" },
  ];
  const smoothScroll = (e, hash) => {
    e.preventDefault();

    const target = document.querySelector(hash);
    if (target) {
      window.scrollTo({
        top: target.offsetTop,
        behavior: "smooth",
      });
    }
  };
  return (
    <div>
      <div className="relative" id="Home">
        <div className="sticky top-0 left-0 z-50 flex justify-between items-center w-full p-8 group">
          <img src="/images/logo.svg" alt="Logo" className="relative z-50" />
          <button
            type="button"
            className="text-white border-0 text-2xl lg:hidden md:hidden block group-hover:hidden ease-in-out duration-300"
          >
            <i className="fas fa-bars"></i>
          </button>
          <div className="flex justify-between items-center gap-10 max-sm:flex-col max-sm:items-end max-sm:absolute max-sm:right-0 max-sm:top-0 max-sm:gap-0 max-sm:bg-morado/40 z-40 max-sm:divide-y-2 group-hover:max-sm:w-full max-sm:p-4 ease-in-out duration-300 max-sm:scale-x-0 group-hover:max-sm:scale-x-100">
            {Menu.map(({ name, hash }, index) => (
              <a
                key={index}
                className="no-underline text-white text-base font-semibold max-sm:py-2"
                href={hash}
                id={name + index + 1}
                onClick={(e) => smoothScroll(e, hash)}
              >
                {name}
              </a>
            ))}
          </div>
        </div>
        <section>
          <Outlet></Outlet>
        </section>
      </div>
    </div>
  );
};

export default Navbar;
