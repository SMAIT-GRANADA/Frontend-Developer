import React from "react";
import indonesiaMap from "../assets/map-indonesia.jpg";

const MapBackground = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen -z-10 overflow-hidden">
      <img
        src={indonesiaMap}
        alt="Indonesia Map"
        className="w-[110%] h-[110%] object-cover object-center transform scale-150"
        style={{
          transformOrigin: "center center",
          position: "absolute",
          top: "-10%",
          left: "-15%",
        }}
      />
    </div>
  );
};

export default MapBackground;
