import React from 'react';
import { useExperiences } from '../../hooks/use-experiences';
import ExperienceCard from './experience-card';

const ExperienceFeed = () => {
  const { experiences, isLoading, error } = useExperiences();

  if (isLoading) {
    return <div>Loading experiences...</div>;
  }

  if (error) {
    return <div>Error loading experiences: {error.message}</div>;
  }

  return (
    <div className="experience-feed">
      {experiences.length === 0 ? (
        <div>No experiences to display.</div>
      ) : (
        experiences.map((experience) => (
          <ExperienceCard key={experience.id} experience={experience} />
        ))
      )}
    </div>
  );
};

export default ExperienceFeed;