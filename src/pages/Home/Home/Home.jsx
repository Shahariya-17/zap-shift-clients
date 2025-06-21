import React from 'react';
import Banner from '../Banner/Banner';
import HowItWorks from '../HowItWorks/HowItWorks';
import ServicesSection from '../ServicesSection/ServicesSection';

const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <HowItWorks></HowItWorks>
           <ServicesSection></ServicesSection>
        </div>
    );
};

export default Home;