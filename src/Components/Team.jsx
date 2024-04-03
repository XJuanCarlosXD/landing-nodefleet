import React from "react";
import User from "./User";

const Team = (props) => {
  const array = [
    {
      image: "Adrian.jpg",
      name: "Adrian Estevez",
      position: "Fullstack Dev",
      linkedin:
        "https://do.linkedin.com/in/adrian-estevez-b89b50b8?trk=public_profile_browsemap",
      twitter: "#",
      telegram: "https://web.telegram.org/a/#315738401",
    },
    {
      image: "Steven.jpg",
      name: "Steven Martinez",
      position: "DevOps",
      linkedin:
        "https://www.linkedin.com/in/albert-steven-martínez-ferreira-933a09198/",
      twitter: "https://twitter.com/astevenmf",
      telegram: "https://web.telegram.org/k/#@TinyWombat",
    },
    {
      image: "Kael.jpg",
      name: "Kael Abbott",
      position: "CTO",
      linkedin: "https://www.linkedin.com/in/kael-abbott-ab578713a/",
      twitter: "https://twitter.com/Inhalehapiness1",
      telegram: "https://web.telegram.org/k/#@nosedimetu",
    },
    {
      image: "Cristy.jpg",
      name: "Cristy Taveras",
      position: "UX/UI Designer",
      linkedin: "https://do.linkedin.com/in/cristy-taveras",
      twitter: "https://twitter.com/CristyGab8",
      telegram: "https://web.telegram.org/k/#@redstargazer08",
    },
    {
      image: "Kath_2.jpg",
      name: "Katherine Andujar",
      position: "UX/UI Designer",
      linkedin: "https://do.linkedin.com/in/katherine-andújar-843631121",
      twitter: "https://twitter.com/katherineao",
      telegram: "https://web.telegram.org/k/#@Fleetkeete",
    },
  ];
  return (
    <div
      className="flex flex-col gap-4 justify-center items-center text-white"
      id="OurTeam"
    >
      <h2 className="font-bold text-4xl">Our Team</h2>
      <div className="flex justify-center items-center max-sm:flex-col gap-4 pt-4 max-sm:pb-5 pb-16">
        <User
          key={"number3"}
          telegram={"https://web.telegram.org/k/#@comrade1990"}
          linke={"https://do.linkedin.com/in/lowell-abbott-vidal-8280aa72"}
          twitter={"https://twitter.com/blackrain_91"}
          images={"Lowell.jpg"}
          className={"max-sm:w-28"}
        />
        <div className="flex flex-col gap-2 max-sm:px-10 lg:w-4/12 md:w-4/12">
          <h4 className="text-indigo-300 font-semibold font-sans text-lg">
            Lowell Abbott CEO
          </h4>
          <p className="text-justify text-zinc-300 font-sans font-normal text-md max-sm:text-sm">
            Former Devops Lead of Pocket Network and CEO of nodefleet.org. Has
            extensive experience regarding development, leading teams, devops
            and infrastructure in general. Obssesed about optimization.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 md:grid-cols-4 max-sm:grid-cols-2 gap-4 w-full">
        {array.map(
          ({ image, name, linkedin, position, telegram, twitter }, index) => (
            <div
              key={index}
              className="flex flex-col justify-center items-center gap-4 max-sm:pb-0 pt-4 pb-16"
            >
              <User
                key={"number21"}
                images={image}
                telegram={telegram}
                twitter={twitter}
                linke={linkedin}
                className={"max-sm:w-28"}
              />
              <div className="flex flex-col text-center text-indigo-300 font-semibold font-sans">
                <h4 className="font-semibold font-sans text-lg">{name}</h4>
                <p className="font-sans font-normal text-md text-center">
                  {position}
                </p>
              </div>
            </div>
          )
        )}
      </div>

      <span className="font-sans font-normal text-base max-sm:text-sm">
        Trusted by the space’s most innovative teams
      </span>

      <div className="w-full h-full relative overflow-hidden flex justify-center items-center pointer-events-none">
        <div className="animated-text">
          <img
            src="/images/grupo-logo.png"
            alt="logos"
            className="moving-image relative left-10 -top-5 max-sm:-top-2 w-screen"
          />
        </div>
      </div>
    </div>
  );
};

export default Team;
