import React from 'react';
import { MdLocalShipping } from 'react-icons/md';
import { FaMoneyBillWave } from 'react-icons/fa';
import { RiMapPin2Fill } from 'react-icons/ri';
import { BsBuildings } from 'react-icons/bs';

const services = [
  {
    title: "Booking Pick & Drop",
    description: "From personal packages to business shipments — we deliver on time, every time.",
    icon: <MdLocalShipping />,
  },
  {
    title: "Cash On Delivery",
    description: "From personal packages to business shipments — we deliver on time, every time.",
    icon: <FaMoneyBillWave />,
  },
  {
    title: "Delivery Hub",
    description: "From personal packages to business shipments — we deliver on time, every time.",
    icon: <RiMapPin2Fill />,
  },
  {
    title: "Booking SME & Corporate",
    description: "From personal packages to business shipments — we deliver on time, every time.",
    icon: <BsBuildings />,
  },
];

const HowItWorks = () => {
  return (
    <div className="py-10"> 
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          How it Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="bg-teal-100 text-teal-700 p-4 rounded-full text-3xl">
                  {item.icon}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-center text-gray-800 mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 text-center leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
