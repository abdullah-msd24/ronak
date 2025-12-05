'use client';

import React from 'react';
import Link from 'next/link';

interface CommunityCardProps {
  id: string;
  name: string;
  description: string;
  memberCount: number;
}

const CommunityCard: React.FC<CommunityCardProps> = ({ id, name, description, memberCount }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-gray-600">{description}</p>
      <p className="text-gray-500">Members: {memberCount}</p>
      <Link href={`/communities/${id}`} className="text-blue-500 hover:underline">
        View Community
      </Link>
    </div>
  );
};

export default CommunityCard;
export { CommunityCard };