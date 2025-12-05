import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getCommunityById } from '@/lib/api';
import CommunityDetails from '@/components/communities/community-details';
import LoadingSpinner from '@/components/ui/loading-spinner';

const CommunityPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [community, setCommunity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchCommunity = async () => {
        try {
          const data = await getCommunityById(id);
          setCommunity(data);
        } catch (error) {
          console.error('Failed to fetch community:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchCommunity();
    }
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!community) {
    return <div>Community not found.</div>;
  }

  return <CommunityDetails community={community} />;
};

export default CommunityPage;