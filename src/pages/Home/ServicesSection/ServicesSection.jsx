import React from 'react';
import { motion } from 'framer-motion';
import { FaShippingFast, FaHandHoldingUsd } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { GiCardboardBox } from 'react-icons/gi';
import { BsBuildingGear } from 'react-icons/bs';
import { BiUndo } from 'react-icons/bi';

const services = [
  {
    title: "Express & Standard Delivery",
    description:
      "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
    icon: <FaShippingFast />,
  },
  {
    title: "Nationwide Delivery",
    description:
      "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
    icon: <MdLocationOn />,
  },
  {
    title: "Fulfillment Solution",
    description:
      "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
    icon: <GiCardboardBox />,
  },
  {
    title: "Cash on Home Delivery",
    description:
      "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
    icon: <FaHandHoldingUsd />,
  },
  {
    title: "Corporate Service / Contract In Logistics",
    description:
      "Customized corporate services which includes warehouse and inventory management support.",
    icon: <BsBuildingGear />,
  },
  {
    title: "Parcel Return",
    description:
      "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
    icon: <BiUndo />,
  },
];

const ServicesSection = () => {
  return (
    <div className="bg-[#013B3A] text-white rounded-3xl py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Our Services</h2>
        <p className="mb-12 text-sm md:text-base text-gray-300 max-w-2xl mx-auto border border-dashed p-4 rounded-md">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-xl p-6 text-left text-gray-800 shadow-md hover:shadow-xl hover:bg-lime-100 transition-all duration-300 group cursor-pointer"
            >
              <div className="flex justify-center mb-4">
                <div className="bg-teal-100 group-hover:bg-teal-500 transition-colors p-4 rounded-full">
                  <div className="text-3xl text-teal-700 group-hover:text-white transition-all duration-300">
                    {service.icon}
                  </div>
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-center">
                {service.title}
              </h3>
              <p className="text-sm text-gray-700 text-center leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
