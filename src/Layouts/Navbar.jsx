import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

const Navbar = (props) => {
  const location = useLocation();
  const isPrivacyPage = location.pathname === "/privacy-policy";

  const Menu = [
    { name: "Home", hash: "#Home", path: "/" },
    {
      name: "Nodes",
      hash: "https://faucet.nodefleet.org",
      path: "https://faucet.nodefleet.org",
    },
    {
      name: "Validator",
      hash: "https://validator.nodefleet.org",
      path: "https://validator.nodefleet.org",
    },
    { name: "Service", hash: "#Service", path: "/#Service" },
    { name: "Our Team", hash: "#OurTeam", path: "/#OurTeam" },
    { name: "Contact", hash: "#Contact", path: "/#Contact" },
    { name: "Privacy", path: "/privacy-policy" },
  ];

  const handleNavigation = (e, hash, path) => {
    // Si estamos en la página de privacidad y el enlace no es para privacy-policy
    if (isPrivacyPage && path !== "/privacy-policy") {
      // No prevenimos el comportamiento por defecto, dejamos que navegue a la ruta
      return;
    }

    // Si estamos en home y el enlace tiene hash
    if (!isPrivacyPage && hash) {
      e.preventDefault();
      const target = document.querySelector(hash);
      if (target) {
        window.scrollTo({
          top: target.offsetTop,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <div>
      <div className="relative" id="Home">
        <div className="sticky top-0 left-0 z-50 flex justify-between items-center w-full p-8 group">
          <Link to="/" className="relative z-50">
            <img src="/images/logo.svg" alt="Logo" />
          </Link>
          <button
            type="button"
            className="text-white border-0 text-2xl lg:hidden md:hidden block group-hover:hidden ease-in-out duration-300"
          >
            <i className="fas fa-bars"></i>
          </button>
          <div className="flex justify-between items-center gap-10 max-sm:flex-col max-sm:items-end max-sm:absolute max-sm:right-0 max-sm:top-0 max-sm:gap-0 max-sm:bg-morado/40 z-40 max-sm:divide-y-2 group-hover:max-sm:w-full max-sm:p-4 ease-in-out duration-300 max-sm:scale-x-0 group-hover:max-sm:scale-x-100">
            {Menu.map(({ name, hash, path }, index) => {
              if (name === "Nodes" || name === "Validator") {
                return (
                  <a
                    key={index}
                    href={path}
                    className="no-underline text-white text-base font-semibold max-sm:py-2"
                  >
                    {name}
                  </a>
                );
              } else {
                return (
                  <Link
                    key={index}
                    to={path}
                    className="no-underline text-white text-base font-semibold max-sm:py-2"
                    onClick={(e) => handleNavigation(e, hash, path)}
                  >
                    {name}
                  </Link>
                );
              }
            })}
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
