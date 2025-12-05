import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { createEvent } from '../../lib/api';
import { useAuth } from '../../hooks/use-auth';
import Button from '../ui/button';
import Input from '../ui/input';

const EventForm = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [maxParticipants, setMaxParticipants] = useState(10);
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('tags', tags);
      formData.append('maxParticipants', maxParticipants);
      if (banner) {
        formData.append('banner', banner);
      }

      await createEvent(formData, user.token);
      router.push('/events');
    } catch (err) {
      setError('Failed to create event. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-500">{error}</div>}
      <Input
        type="text"
        placeholder="Event Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <Input
        type="text"
        placeholder="Event Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <Input
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <Input
        type="number"
        placeholder="Max Participants"
        value={maxParticipants}
        onChange={(e) => setMaxParticipants(e.target.value)}
        min="1"
        required
      />
      <Input
        type="file"
        accept="image/*"
        onChange={(e) => setBanner(e.target.files[0])}
      />
      <Button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Event'}
      </Button>
    </form>
  );
};

export default EventForm;