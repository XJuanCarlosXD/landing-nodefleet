import React from "react";
import { Outlet } from "react-router-dom";

const Navbar = (props) => {
  const Menu = [
    { name: "Home", hash: "#Home" },
    { name: "Service", hash: "#Service" },
    { name: "Our Team", hash: "#OurTeam" },
    { name: "Contact", hash: "#Contact" },
  ];
  return (
    <div>
      <div className="relative">
        <div className="sticky top-0 left-0 z-50 flex justify-between items-center w-full p-8">
          <img src="/images/logo.svg" alt="Logo" />
          <div className="flex justify-between items-center gap-10 max-sm:hidden">
            {Menu.map(({ name, hash }, index) => (
              <a
                key={index}
                className="no-underline text-white text-base font-semibold"
                href={hash}
              >
                {name}
              </a>
            ))}
          </div>
        </div>
        <section className="">
          <Outlet></Outlet>
        </section>
      </div>
    </div>
  );
};

export default Navbar;
