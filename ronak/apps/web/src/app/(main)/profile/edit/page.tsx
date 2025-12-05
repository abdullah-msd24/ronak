import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getUserProfile, updateUserProfile } from '../../../lib/api';
import ProfileForm from '../../../components/profile/profile-form';

const EditProfilePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const data = await getUserProfile(id);
        setProfileData(data);
      } catch (err) {
        setError('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProfileData();
    }
  }, [id]);

  const handleProfileUpdate = async (updatedData) => {
    try {
      await updateUserProfile(id, updatedData);
      router.push(`/profile/${id}`);
    } catch (err) {
      setError('Failed to update profile');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Edit Profile</h1>
      <ProfileForm initialData={profileData} onSubmit={handleProfileUpdate} />
    </div>
  );
};

export default EditProfilePage;