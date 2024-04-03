import React from "react";
import Index from "../Components/Index";
import Body from "../Components/Body";
import Service from "../Components/Service";
import Team from "../Components/Team";
import Contact from "../Components/Contact";

const Home = (props) => {
  return (
    <div className="flex flex-col">
      <Index />
      <Body />
      <div className="relative -z-10">
        <img
          src="/images/white.png"
          alt="white"
          className="absolute right-0 top-0"
        />
      </div>
      <Service />
      <Team />
      <Contact />
    </div>
  );
};

export default Home;
