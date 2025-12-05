import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { createCommunity } from '../../../lib/api';
import { useAuth } from '../../../hooks/use-auth';
import CommunityForm from '../../../components/communities/community-form';

const CreateCommunityPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCreateCommunity = async (communityData) => {
    setLoading(true);
    setError(null);
    try {
      await createCommunity(communityData);
      router.push('/communities');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create a Community</h1>
      {error && <p className="text-red-500">{error}</p>}
      <CommunityForm onSubmit={handleCreateCommunity} loading={loading} />
    </div>
  );
};

export default CreateCommunityPage;