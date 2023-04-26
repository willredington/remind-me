import { useEffect, useState } from 'react';
import { trpc } from '@remind-me/frontend/customer/util-trpc';
import { LocationType } from '@remind-me/shared/util-location';

type Position = {
  latitude: number;
  longitude: number;
};

export const useGeoLocation = () => {
  const [currentPosition, setCurrentPosition] = useState<Position | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }
  }, []);

  return currentPosition;
};

export const useHomeLocation = () => {
  return trpc.location.findManyLocations.useQuery(undefined, {
    select: (locations) => {
      return locations.find((location) => location.type === LocationType.Home);
    },
  });
};
