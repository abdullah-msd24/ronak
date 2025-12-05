import React from 'react';

interface Participant {
  id: string;
  name: string;
  bio: string;
  interests: string[];
}

interface EventParticipantsProps {
  participants: Participant[];
}

const EventParticipants: React.FC<EventParticipantsProps> = ({ participants }) => {
  return (
    <div className="event-participants">
      <h2 className="text-lg font-semibold">Participants</h2>
      <ul className="list-disc pl-5">
        {participants.map((participant) => (
          <li key={participant.id} className="my-2">
            <div className="flex items-center">
              <span className="font-bold">{participant.name}</span>
              <span className="text-sm text-gray-500 ml-2">({participant.bio})</span>
            </div>
            <div className="text-sm text-gray-400">
              Interests: {participant.interests.join(', ')}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventParticipants;