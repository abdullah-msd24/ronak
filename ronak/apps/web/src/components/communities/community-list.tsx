import React from 'react';
import { CommunityCard } from './community-card';
import { useCommunities } from '../../hooks/use-communities';

const CommunityList: React.FC = () => {
  const { communities, isLoading, error } = useCommunities();

  if (isLoading) {
    return <div>Loading communities...</div>;
  }

  if (error) {
    return <div>Error loading communities: {error.message}</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {communities.map((community) => (
        <CommunityCard key={community.id} community={community} />
      ))}
    </div>
  );
};

export default CommunityList;