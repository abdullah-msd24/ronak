import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { createCommunity } from '../../lib/api';
import { Button, Input, Modal } from '../ui';

const CommunityForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createCommunity({ name, description });
      router.push('/communities');
    } catch (error) {
      console.error('Error creating community:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal>
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-lg font-semibold">Create Community</h2>
        <Input
          type="text"
          placeholder="Community Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <Button type="submit" loading={loading}>
          Create Community
        </Button>
      </form>
    </Modal>
  );
};

export default CommunityForm;