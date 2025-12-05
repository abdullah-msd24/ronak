import React from 'react';
import { Experience } from '../../types'; // Adjust the import based on your types location
import ExperienceCard from './experience-card';

interface ExperienceListProps {
  experiences: Experience[];
}

const ExperienceList: React.FC<ExperienceListProps> = ({ experiences }) => {
  return (
    <div className="experience-list">
      {experiences.length === 0 ? (
        <p>No experiences available.</p>
      ) : (
        experiences.map((experience) => (
          <ExperienceCard key={experience.id} experience={experience} />
        ))
      )}
    </div>
  );
};

export default ExperienceList;