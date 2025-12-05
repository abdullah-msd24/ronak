import React from 'react';
import CommunityList from '../../../components/communities/community-list';
import { useCommunities } from '../../../hooks/use-communities';

const CommunitiesPage = () => {
  const { communities, isLoading, error } = useCommunities();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading communities</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Communities</h1>
      <CommunityList communities={communities} />
    </div>
  );
};

export default CommunitiesPage;