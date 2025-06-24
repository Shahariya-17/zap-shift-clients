import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const tabs = ["Story", "Mission", "Success", "Team & Others"];

const content = {
  Story: [
    `We started with a simple promise — to make parcel delivery fast, reliable, and stress-free.`,
    `Over the years, our commitment to real-time tracking, efficient logistics, and customer-first service has made us a trusted partner for thousands.`,
    `Whether it's a personal gift or a time-sensitive business delivery, we ensure it reaches its destination — on time, every time.`,
  ],
  Mission: [
    `Our mission is simple: Deliver excellence.`,
    `With every parcel, we aim to exceed expectations through smart logistics, responsible operations, and uncompromising integrity.`,
  ],
  Success: [
    `Thousands of satisfied customers and growing.`,
    `Our success is built on trust, consistency, and a deep understanding of customer needs.`,
  ],
  "Team & Others": [
    `Behind every delivery is a passionate team.`,
    `From logistics experts to customer service pros — our people make the difference.`,
  ],
};

const AboutUs = () => {
  const [activeTab, setActiveTab] = useState("Story");

  return (
    <section className="bg-white py-14 px-4 md:px-10 lg:px-20 rounded-3xl shadow-sm">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-800">About Us</h2>
          <p className="text-gray-600 mt-2 text-base max-w-2xl mx-auto">
            Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
            From personal packages to business shipments — we deliver on time, every time.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-6 border-b pb-3">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-base pb-1 border-b-2 transition duration-200 ${
                activeTab === tab
                  ? "text-lime-600 border-lime-600"
                  : "text-gray-500 border-transparent hover:text-black"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-8 max-w-3xl mx-auto leading-relaxed text-justify text-gray-700">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {content[activeTab].map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
