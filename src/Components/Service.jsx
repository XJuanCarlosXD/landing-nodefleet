import React from "react";

const Service = (props) => {
  const serviceList = [
    {
      name: "Staking",
      icon: "money.svg",
      sub: "Stake nodes and receive weekly rewards, industry standard security and impressive performance.",
    },
    {
      name: "Blockchain Infrastructure",
      icon: "blockchain.svg",
      sub: "Reliable infrastructure support, including development and maintenance, to ensure consistent delivery at all project phases",
    },
    {
      name: "Consulting & Software Development",
      icon: "computer.svg",
      sub: "Consulting about blockchain development/infrastructure, software development in general.",
    },
    {
      name: "Explorer As A Service",
      icon: "dashboard.svg",
      sub: "Development of customized blockchain reliable explorers/indexers and analytics systems for protocols and new blockchain projects. <br />Examples poktradar (https://poktradar.io)",
    },
  ];
  return (
    <div
      className="flex flex-col gap-4 justify-center items-center text-white"
      id="Service"
    >
      <h2 className="font-bold text-4xl">Our Service</h2>
      <div className="grid grid-cols-2 max-sm:grid-cols-1">
        {serviceList.map(({ name, icon, sub }, index) => (
          <div
            key={index}
            className="flex flex-row items-start gap-4 p-4 pt-16 max-sm:pt-6 max-sm:px-10"
          >
            <img
              src={`/images/icon/${icon}`}
              alt={icon}
              className="bg-sky-500 p-1.5 rounded-md"
            />
            <div className="text-base flex flex-col gap-2">
              <h4 className="font-semibold text-lg font-sans">{name}</h4>
              <p className="font-sans text-md max-sm:text-sm font-normal lg:w-80 text-zinc-300">
                <div
                  dangerouslySetInnerHTML={{
                    __html: sub.replace(/\(([^)]+)\)/g, (match, url) => {
                      return `<a href="${url}" class="text-sky-300">${url}</a>`;
                    }),
                  }}
                />
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Service;
