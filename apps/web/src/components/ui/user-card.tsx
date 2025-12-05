'use client';

import React from 'react';
import Link from 'next/link';

interface UserCardProps {
  id: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  bio?: string;
  city?: string;
}

const UserCard: React.FC<UserCardProps> = ({
  id,
  firstName,
  lastName,
  avatar,
  bio,
  city,
}) => {
  return (
    <Link href={`/users/${id}`}>
      <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
            {avatar ? (
              <img src={avatar} alt={`${firstName} ${lastName}`} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500 text-lg font-semibold">
                {firstName[0]}{lastName[0]}
              </div>
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{firstName} {lastName}</h3>
            {city && <p className="text-sm text-gray-500">{city}</p>}
          </div>
        </div>
        {bio && (
          <p className="mt-2 text-sm text-gray-600 line-clamp-2">{bio}</p>
        )}
      </div>
    </Link>
  );
};

export default UserCard;