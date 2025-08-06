import React from 'react';
import Layout from '../components/layout/Layout';
import HeroSection from '../components/sections/HeroSection';
import StudioSection from '../components/sections/StudioSection';
import ServicesSection from '../components/sections/ServicesSection';
import PortfolioSection from '../components/sections/PortfolioSection';

const HomePage: React.FC = () => {
  return (
    <Layout>
      <HeroSection />
      <StudioSection />
      <ServicesSection />
      <PortfolioSection />
    </Layout>
  );
};

export default HomePage;