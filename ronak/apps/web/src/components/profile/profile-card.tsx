import React from 'react';
import { Avatar } from '../ui/avatar';
import { Badge } from '../ui/badge';

interface ProfileCardProps {
  name: string;
  bio: string;
  age: number;
  city: string;
  interests: string[];
  profilePhoto: string;
  verificationBadge?: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  bio,
  age,
  city,
  interests,
  profilePhoto,
  verificationBadge,
}) => {
  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
      <Avatar src={profilePhoto} alt={name} className="w-24 h-24 mb-4" />
      <h2 className="text-xl font-semibold">{name}</h2>
      {verificationBadge && <Badge text="Verified" />}
      <p className="text-gray-600">{bio}</p>
      <p className="text-gray-500">{age} years old, {city}</p>
      <div className="mt-2">
        <h3 className="font-medium">Interests:</h3>
        <ul className="list-disc list-inside">
          {interests.map((interest, index) => (
            <li key={index} className="text-gray-500">{interest}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfileCard;