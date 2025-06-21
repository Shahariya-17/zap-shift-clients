import React from "react";
import locationImg from "../../../assets/location-merchant.png";

const BeMarchant = () => {
  return (
    <div data-aos="zoom-in-up" className="bg-[url('assets/be-a-merchant-bg.png')] bg-no-repeat bg-[#03373D] px-4 py-10 md:px-10 lg:px-20 lg:py-20 w-full max-w-7xl mx-auto rounded-3xl">
      <div className="hero-content flex flex-col-reverse lg:flex-row-reverse items-center justify-between gap-8">
        {/* Image */}
        <img
          src={locationImg}
          alt="Merchant Location"
          className="w-full max-w-xs md:max-w-sm lg:max-w-md rounded-xl shadow-xl"
        />

        {/* Text Section */}
        <div className="text-center lg:text-left">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
            Merchant and Customer Satisfaction <br className="hidden md:block" /> is Our First Priority
          </h1>
          <p className="py-6 text-sm md:text-base text-gray-300 leading-relaxed">
            We offer the lowest delivery charge with the highest value along
            with <br className="hidden sm:block" /> 100% safety of your product. Pathao courier delivers your
            parcels in every <br className="hidden sm:block" /> corner of Bangladesh right on time.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-start gap-4">
            <button className="btn bg-lime-400 text-black rounded-full border-none">
              Become a Merchant
            </button>
            <button className="btn btn-outline text-lime-400 hover:bg-lime-400 hover:text-black rounded-full">
              Earn with Profast Courier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeMarchant;
