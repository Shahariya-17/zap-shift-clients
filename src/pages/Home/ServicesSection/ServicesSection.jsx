import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaShippingFast, 
  FaHandHoldingUsd, 
  FaMapMarkerAlt,
  FaBoxOpen,
  FaBuilding,
  FaExchangeAlt
} from "react-icons/fa";

const ServicesSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      title: "Express Delivery",
      description: "24-72 hour delivery in major cities with 4-6 hour express options in Dhaka. Real-time tracking included.",
      icon: <FaShippingFast />,
      color: "from-indigo-100 to-indigo-50",
      iconColor: "text-indigo-600"
    },
    {
      title: "Nationwide Coverage",
      description: "48-72 hour delivery across all districts with specialized rural area solutions.",
      icon: <FaMapMarkerAlt />,
      color: "from-emerald-100 to-emerald-50",
      iconColor: "text-emerald-600"
    },
    {
      title: "Fulfillment",
      description: "End-to-end logistics including inventory management and custom packaging.",
      icon: <FaBoxOpen />,
      color: "from-amber-100 to-amber-50",
      iconColor: "text-amber-600"
    },
    {
      title: "Cash on Delivery",
      description: "Secure cash collection with instant remittance and fraud protection.",
      icon: <FaHandHoldingUsd />,
      color: "from-lime-100 to-lime-50",
      iconColor: "text-lime-600"
    },
    {
      title: "Corporate Logistics",
      description: "Enterprise solutions with warehouse management and API integration.",
      icon: <FaBuilding />,
      color: "from-purple-100 to-purple-50",
      iconColor: "text-purple-600"
    },
    {
      title: "Returns",
      description: "Automated return processing with quality checks and restocking.",
      icon: <FaExchangeAlt />,
      color: "from-rose-100 to-rose-50",
      iconColor: "text-rose-600"
    },
  ];

  return (
    <div className="relative bg-gradient-to-br rounded-4xl from-[#013B3A] to-[#025C5A] py-24 px-4 overflow-hidden">
      {/* Subtle background animation */}
      <motion.div 
        className="absolute inset-0 opacity-5"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'linear'
        }}
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Our <span className="text-teal-300">Logistics</span> Services
          </h2>
          <motion.div
            className="h-1 bg-teal-400 rounded-full mx-auto"
            initial={{ width: 0 }}
            animate={{ width: "120px" }}
            transition={{ delay: 0.3, duration: 0.8 }}
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="text-center text-gray-300 text-lg mb-16 max-w-2xl mx-auto px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Premium delivery solutions tailored to your business needs
        </motion.p>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                type: 'spring',
                stiffness: 100
              }}
              whileHover={{ 
                y: -8,
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
              }}
              className="relative"
            >
              <div 
                className={`h-full bg-gradient-to-br ${service.color} rounded-xl p-8 shadow-lg overflow-hidden cursor-pointer transition-all duration-300`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setSelectedService(index)}
              >
                {/* Icon */}
                <motion.div
                  className={`flex justify-center mb-6 p-4 rounded-full bg-white w-16 h-16 mx-auto shadow-sm`}
                  whileHover={{ rotate: 10 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className={`text-2xl ${service.iconColor}`}>
                    {service.icon}
                  </div>
                </motion.div>

                <h3 className="text-xl font-bold text-center mb-4 text-gray-800">
                  {service.title}
                </h3>

                <AnimatePresence>
                  {hoveredIndex === index ? (
                    <motion.p
                      className="text-gray-700 text-center text-sm"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {service.description}
                    </motion.p>
                  ) : (
                    <motion.div
                      className="flex justify-center"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="text-sm text-teal-600 font-medium mt-4">
                        Learn more
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedService !== null && (
          <motion.div 
            className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedService(null)}
          >
            <motion.div 
              className={`bg-gradient-to-br ${services[selectedService].color} rounded-xl max-w-md w-full p-8 shadow-2xl relative overflow-hidden`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-xl"
                onClick={() => setSelectedService(null)}
              >
                &times;
              </button>

              <div className="flex justify-center mb-6">
                <div className={`p-5 rounded-full bg-white shadow-md`}>
                  <div className={`text-3xl ${services[selectedService].iconColor}`}>
                    {services[selectedService].icon}
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-center mb-4 text-gray-800">
                {services[selectedService].title}
              </h3>

              <p className="text-gray-700 mb-6 text-center">
                {services[selectedService].description}
              </p>

              <div className="flex justify-center gap-4">
                <motion.button 
                  className="px-6 py-2 bg-white text-gray-800 rounded-lg font-medium shadow hover:shadow-md transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                </motion.button>
                <motion.button 
                  className={`px-6 py-2 rounded-lg font-medium shadow hover:shadow-md transition-all text-black`}
                  style={{ background: services[selectedService].iconColor }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServicesSection;