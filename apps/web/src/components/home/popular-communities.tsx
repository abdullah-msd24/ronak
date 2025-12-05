'use client';

import React from 'react';
import { CommunityCard } from '../communities/community-card';
import { useCommunities } from '../../hooks/use-communities';

const PopularCommunities = () => {
  const { data: communities, isLoading } = useCommunities();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="popular-communities">
      <h2 className="text-2xl font-bold mb-4">Popular Communities</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {communities?.map((community) => (
          <CommunityCard key={community.id} community={community} />
        ))}
      </div>
    </div>
  );
};

export default PopularCommunities;