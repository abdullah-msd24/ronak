'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchCommunities } from '../lib/api';

export const useCommunities = () => {
  return useQuery({
    queryKey: ['communities'],
    queryFn: fetchCommunities,
  });
};