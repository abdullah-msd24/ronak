import React from 'react';
import { Experience } from '../../types'; // Adjust the import based on your types location

interface UserExperiencesProps {
  experiences: Experience[];
}

const UserExperiences: React.FC<UserExperiencesProps> = ({ experiences }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">User Experiences</h2>
      {experiences.length === 0 ? (
        <p>No experiences shared yet.</p>
      ) : (
        experiences.map((experience) => (
          <div key={experience.id} className="p-4 border rounded-lg shadow">
            <h3 className="font-bold">{experience.title}</h3>
            <p className="mt-2">{experience.details}</p>
            <div className="mt-2">
              <span className="text-yellow-500">{'★'.repeat(experience.rating)}</span>
              <span className="text-gray-400">{'★'.repeat(5 - experience.rating)}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default UserExperiences;