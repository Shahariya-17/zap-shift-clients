import React from "react";
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";

const MarqueeSection = () => {
  const brands = [
    { logo: "https://i.ibb.co/zTHYYT0x/casio.png" },
    { logo: "https://i.ibb.co/mF01g80k/amazon.png" },
    { logo: "https://i.ibb.co/FbSmFPH6/moonstar.png" },
    { logo: "https://i.ibb.co/Xkj2j02y/start.png" },
    { logo: "https://i.ibb.co/Qjd8dgSP/start-people-1.png" },
    { logo: "https://i.ibb.co/HL13LdYw/randstad.png" }
  ];

  return (
    <div className="w-full py-16 bg-gradient-to-br from-[#f0f4f8] to-[#e6f0ff] dark:from-gray-800 dark:to-gray-900 rounded-[40px] border-y border-gray-200 dark:border-white/10 mt-8 mb-10">
      <div className="text-center mb-10">
        <h3 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-3">
          Trusted by Global Brands
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg">
          We proudly showcase the brands we've worked with
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-blue-400 mx-auto mt-4 rounded-full" />
      </div>

      <div className="px-4 sm:px-10">
        <Marquee speed={45} gradient={false} pauseOnHover={true} className="py-4">
          {brands.map((brand, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="mx-4 md:mx-6 flex items-center justify-center bg-white dark:bg-white backdrop-blur-lg rounded-2xl px-6 py-4 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/20 dark:border-white/10 min-w-[160px] h-[90px]"
            >
              <img
                src={brand.logo}
                alt={`Brand ${index}`}
                className="max-h-14 max-w-[120px] object-contain"
              />
            </motion.div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default MarqueeSection;
