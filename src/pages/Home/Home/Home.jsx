import React from 'react';
import Banner from '../Banner/Banner';
import HowItWorks from '../HowItWorks/HowItWorks';
import ServicesSection from '../ServicesSection/ServicesSection';
import MarqueeSection from '../MarqueeSection/MarqueeSection';
import FeaturesSection from '../FeaturesSection/FeaturesSection';
import BeMarchant from '../BeMarchant/BeMarchant';
import TestimonialsSection from '../TestimonialsSection/TestimonialsSection';

const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <HowItWorks></HowItWorks>
           <ServicesSection></ServicesSection>
           <MarqueeSection></MarqueeSection>
           <FeaturesSection></FeaturesSection>
           <BeMarchant></BeMarchant>
           <TestimonialsSection></TestimonialsSection>
        </div>
    );
};

export default Home;