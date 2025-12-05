'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchEvents, joinEvent, leaveEvent } from '../lib/api';

export const useEvents = () => {
  return useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents,
  });
};

export const useJoinEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: joinEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });
};

export const useLeaveEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: leaveEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });
};