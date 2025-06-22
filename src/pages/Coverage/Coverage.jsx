import React from "react";
import CoverageMap from "./CoverageMap";

const Coverage = () => {
  return (
    <div className="py-12 px-4 text-center">
      <h1 className="text-3xl font-bold text-gray-800">
        We are available in 64 districts
      </h1>
      <p className="mt-2 text-gray-600">Click on any marker to explore</p>
      <CoverageMap />
    </div>
  );
};

export default Coverage;
