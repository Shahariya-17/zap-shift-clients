import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bannerImage1 from "../../../assets/banner/banner1.png";
import bannerImage2 from "../../../assets/banner/banner2.png";
import bannerImage3 from "../../../assets/banner/banner3.png";
import { Carousel } from "react-responsive-carousel";

const Banner = () => {
  return (
    <Carousel
      autoPlay
      infiniteLoop
      interval={3000}
      stopOnHover={false}
      showThumbs={false}
      showStatus={false}
    >
      <div className="mt-5">
        <img src={bannerImage1} alt="Banner 1" />
      </div>
      <div className="mt-5">
        <img src={bannerImage2} alt="Banner 2" />
      </div>
      <div className="mt-5">
        <img src={bannerImage3} alt="Banner 3" />
      </div>
    </Carousel>
  );
};

export default Banner;
