import React from 'react';
import { useRouter } from 'next/router';
import { useCommunity } from '@/hooks/use-communities';
import CommunityCard from '@/components/communities/community-card';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

const CommunityDetails = () => {
    const router = useRouter();
    const { id } = router.query;
    const { community, isLoading, error } = useCommunity(id);

    if (isLoading) return <LoadingSpinner />;
    if (error) return <div>Error loading community details.</div>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">{community.name}</h1>
            <p className="mt-2 text-gray-600">{community.description}</p>
            <h2 className="mt-4 text-xl font-semibold">Members</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {community.members.map(member => (
                    <CommunityCard key={member.id} member={member} />
                ))}
            </div>
        </div>
    );
};

export default CommunityDetails;