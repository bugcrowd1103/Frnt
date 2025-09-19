// src/hooks/useTicketmasterEvents.ts
import { useQuery } from '@tanstack/react-query';

const API_BASE = 'https://app.ticketmaster.com/discovery/v2/events.json';

export const useTicketmasterEvents = (city: string = 'paris', p0: string) => {
  const apiKey = import.meta.env.VITE_TICKETMASTER_KEY;

  return useQuery({
    queryKey: ['ticketmaster-events', city],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}?city=${encodeURIComponent(city)}&apikey=${apiKey}`);
      const data = await res.json();
      return data._embedded?.events || [];
    },
  });
};
