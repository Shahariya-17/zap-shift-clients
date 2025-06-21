import React from "react";
import illu from "../../../assets/Illustration.png";
import illu2 from "../../../assets/Group 4.png";
import illu3 from "../../../assets/call-center_24908-49658.jpg";

const cardData = [
  {
    title: "Live Parcel Tracking",
    text: `Stay updated in real-time with our live parcel tracking feature.
    From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.`,
    image: illu,
  },
  {
    title: "100% Safe Delivery",
    text: `We ensure your parcels are handled with the utmost care and
    delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.`,
    image: illu2,
  },
  {
    title: "24/7 Call Center Support",
    text: `Our dedicated support team is available around the clock to assist
    you with any questions, updates, or delivery concerns—anytime you need us.`,
    image: illu3,
  },
];

const FeaturesSection = () => {
  return (
    <div className="px-4 md:px-10 my-10">
      {/* Top Dotted Divider */}
      <div className="w-full max-w-[72rem] mx-auto h-[1px] bg-[repeating-linear-gradient(to_right,transparent_0_4px,#d1d5db_4px_8px)] mb-20 mt-10"></div>

      {/* Feature Cards Container */}
      <div className="space-y-6 max-w-5xl mx-auto">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="card card-side bg-white text-black items-center justify-between shadow-sm flex-col md:flex-row p-4 gap-4"
          >
            {/* Image */}
            <figure className={index === cardData.length - 1 ? "" : "bg-white"}>
              <img
                src={card.image}
                alt="Illustration"
                className="w-44 md:w-48 object-contain"
              />
            </figure>

            {/* Vertical Dotted Divider */}
            <div className="hidden md:block w-[1px] h-28 bg-[repeating-linear-gradient(to_bottom,transparent_0_4px,#d1d5db_4px_8px)] mx-4"></div>

            {/* Text */}
            <div className="card-body p-0 text-center md:text-left">
              <h2 className="card-title font-semibold text-base md:text-lg">
                {card.title}
              </h2>
              <p className="text-xs md:text-sm text-gray-600 mt-1 leading-snug whitespace-pre-line">
                {card.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Dotted Divider */}
      <div className="w-full max-w-[72rem] mx-auto h-[1px] bg-[repeating-linear-gradient(to_right,transparent_0_4px,#d1d5db_4px_8px)] mt-20"></div>
    </div>
  );
};

export default FeaturesSection;
