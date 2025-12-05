import React from 'react';
import { useExperiences } from '../../hooks/use-experiences';
import ExperienceCard from '../experiences/experience-card';

const RecentExperiences = () => {
  const { experiences, isLoading, error } = useExperiences();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading experiences.</div>;
  }

  return (
    <div className="recent-experiences">
      <h2 className="text-2xl font-bold mb-4">Recent Experiences</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {experiences.map((experience) => (
          <ExperienceCard key={experience.id} experience={experience} />
        ))}
      </div>
    </div>
  );
};

export default RecentExperiences;