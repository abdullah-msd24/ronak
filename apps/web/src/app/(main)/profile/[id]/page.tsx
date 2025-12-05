import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getUserProfile } from '../../../lib/api';
import ProfileCard from '../../../components/profile/profile-card';
import UserEvents from '../../../components/profile/user-events';
import UserExperiences from '../../../components/profile/user-experiences';
import UserReviews from '../../../components/profile/user-reviews';

const ProfilePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchProfile = async () => {
        try {
          const data = await getUserProfile(id);
          setProfile(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchProfile();
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      {profile && (
        <>
          <ProfileCard profile={profile} />
          <UserEvents userId={id} />
          <UserExperiences userId={id} />
          <UserReviews userId={id} />
        </>
      )}
    </div>
  );
};

export default ProfilePage;