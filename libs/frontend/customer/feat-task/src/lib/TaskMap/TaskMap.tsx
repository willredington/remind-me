import { Box, useColorMode } from '@chakra-ui/react';
import { Location } from '@remind-me/shared/util-location';
import { Schedule, Task } from '@remind-me/shared/util-task';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useMemo } from 'react';
import { Map, Marker, ViewState } from 'react-map-gl';
import { Lines } from './Lines';
import { MapPin } from './Pin';

const ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const MAP_STYLE = {
  light: 'mapbox://styles/mapbox/streets-v9',
  dark: 'mapbox://styles/mapbox/dark-v11',
};

type LocationTaskMap = {
  [locationId: string]: {
    location: Location;
    tasks: Task[];
  };
};

export function TaskMap({
  startingLocation,
  schedule,
}: {
  startingLocation: Location;
  schedule: Schedule;
}) {
  const { colorMode } = useColorMode();

  const initialViewState: Partial<ViewState> = useMemo(() => {
    return {
      latitude: startingLocation.latitude,
      longitude: startingLocation.longitude,
      zoom: 12,
      bearing: 0,
      pitch: 60,
    };
  }, [startingLocation]);

  const homeMarker = useMemo(() => {
    return (
      <Marker
        anchor="bottom"
        longitude={startingLocation.longitude}
        latitude={startingLocation.latitude}
      >
        <MapPin name={startingLocation.name} />
      </Marker>
    );
  }, [startingLocation]);

  const locationTaskMap = useMemo(() => {
    return schedule.tasks.reduce((acc, task) => {
      const locationId = task.location.id;

      const entry: LocationTaskMap[string] = acc[locationId] ?? {
        location: task.location,
        tasks: [],
      };

      entry.tasks.push(task);

      return {
        ...acc,
        [locationId]: entry,
      };
    }, {} as LocationTaskMap);
  }, [schedule.tasks]);

  const locationMarkers = useMemo(() => {
    return Object.values(locationTaskMap).map(({ location }) => (
      <Marker
        key={location.id}
        longitude={location.longitude}
        latitude={location.latitude}
        anchor="bottom"
        onClick={(e) => {
          e.originalEvent.stopPropagation();
          // setSelectedTask(task);
        }}
      >
        <MapPin name={location.name} />
      </Marker>
    ));
  }, [locationTaskMap]);

  return (
    <Box h="full" position="relative">
      <Map
        initialViewState={initialViewState}
        mapboxAccessToken={ACCESS_TOKEN}
        mapStyle={MAP_STYLE[colorMode]}
      >
        {homeMarker}
        {locationMarkers}
        <Lines startingLocation={startingLocation} tasks={schedule.tasks} />
      </Map>
    </Box>
  );
}
