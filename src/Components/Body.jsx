import React from "react";

const Body = (props) => {
  const review = [
    { name: "+700", text: "Staked Nodes" },
    { name: "35", text: "Supported Blockchains" },
    { name: "+13M", text: "TVL" },
    { name: "+450M", text: "Relays Last 24H" },
  ];
  return (
    <div className="relative flex flex-col justify-center items-center w-full gap-2 -mt-5">
      <div className="bg-slate-700 py-8 grid grid-cols-4 max-sm:grid-cols-2 gap-2 text-white place-items-center w-full">
        {review.map(({ name, text }, index) => (
          <div key={index} className="text-center">
            <h4 className="font-semibold text-4xl max-sm:text-3xl">{name}</h4>
            <span className="text-sm text-stone-300 max-sm:text-xs">
              {text}
            </span>
          </div>
        ))}
      </div>
      <div className="px-8 max-sm:px-6 text-center text-base font-normal font-sans my-16 max-sm:my-10 w-full">
        <div className="text-white text-center flex items-start justify-center text-md font-sans font-normal max-sm:text-sm max-sm:flex-col lg:flex-row md:flex-col md:text-md ">
          <img
            src="/images/node-green.svg"
            alt="nodefleet"
            className="w-24 mt-1 lg:translate-x-20 max-sm:translate-x-0 md:translate-x-0"
          />{" "}
          is a Web3 node running, infrastructure and blockchain development
          company focused on <br /> delivering high performance and truly
          descentralized infrastructure on bare metal machines across different
          <br />
          providers and regions. This is done while providing a development
          process focused on the Web3 user experience.
        </div>
      </div>
    </div>
  );
};

export default Body;
