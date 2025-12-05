import React from 'react';
import { useQuery } from 'react-query';
import { getRecommendedUsers } from '../../lib/api';
import UserCard from '../ui/user-card';

const RecommendedUsers = () => {
  const { data: users, isLoading, error } = useQuery('recommendedUsers', getRecommendedUsers);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading recommended users.</div>;

  return (
    <div className="recommended-users">
      <h2 className="text-xl font-bold mb-4">Recommended Users</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default RecommendedUsers;