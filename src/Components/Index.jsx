import React from "react";

const Index = (props) => {
  return (
    <div className="h-screen flex justify-center items-center -mt-20">
      <img
        src="https://appbot.nyc3.digitaloceanspaces.com/Landing_Nodefleet/home-lan.png"
        alt="home"
        className="absolute top-0 left-0 w-full h-screen"
      />
      <div className="relative text-white text-center flex flex-col gap-4">
        <h4 className="font-bold text-6xl max-sm:text-5xl max-sm:leading-relaxed leading-snug max-sm:-mt-12 max-sm:capitalize pointer-events-none">
          Connect to nodes with
          <br />
          <span className="bg-green-300 text-morado px-2">impressive</span>{" "}
          performance
        </h4>
        <p className="text-2xl max-sm:text-sm max-sm:px-8 pointer-events-none">
          Handcrafted <b>Infra</b> | Permanent <b>Research</b> | Permanent{" "}
          <b>Development</b>
        </p>

        <div className="flex flex-row justify-center items-center gap-6 text-lg max-sm:text-base relative top-10 font-semibold">
          <a
            href="https://t.me/nodefleet"
            className="text-morado bg-sky-500 p-2 px-4 rounded-lg hover:bg-green-300 transition-all"
          >
            Get started
          </a>
          <a
            href="https://faucet.nodefleet.org"
            className="text-morado bg-green-300 p-2 px-4 rounded-lg hover:bg-sky-500 transition-all"
          >
            Get Nodes
          </a>
        </div>
      </div>
    </div>
  );
};

export default Index;
