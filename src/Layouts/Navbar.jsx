import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  const Menu = [
    { name: "Home", hash: "#Home", path: "https://nodefleet.org" },
    {
      name: "Nodes",
      hash: "https://faucet.nodefleet.org",
      path: "https://faucet.nodefleet.org",
    },
    { name: "Service", hash: "https://nodefleet.org/#Service" },
    { name: "Our Team", hash: "https://nodefleet.org/#OurTeam" },
    { name: "Contact", hash: "https://nodefleet.org/#Contact" },
    { name: "Privacy", path: "/privacy-policy" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Cambiar el estado cuando el scroll pase de 50px
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Limpieza del event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <div>
      <div className="relative" id="Home">
        <motion.div
          className={`sticky top-0 left-0 z-50 flex justify-between items-center w-full p-8 py-4 group transition-all duration-300 ${
            scrolled ? "bg-morado/95 backdrop-blur-sm shadow-lg" : ""
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src="/images/logo.svg"
            alt="Logo"
            className="relative z-50 w-36"
          />
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
              >
                {name}
              </a>
            ))}
          </div>
        </motion.div>
        <section>
          <Outlet></Outlet>
        </section>
      </div>
    </div>
  );
};

export default Navbar;
