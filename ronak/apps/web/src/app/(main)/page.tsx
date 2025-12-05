import React from 'react';
import HeroSection from '@/components/home/hero-section';
import FeaturedEvents from '@/components/home/featured-events';
import RecentExperiences from '@/components/home/recent-experiences';
import PopularCommunities from '@/components/home/popular-communities';
import RecommendedUsers from '@/components/home/recommended-users';

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <FeaturedEvents />
      <RecentExperiences />
      <PopularCommunities />
      <RecommendedUsers />
    </div>
  );
};

export default HomePage;