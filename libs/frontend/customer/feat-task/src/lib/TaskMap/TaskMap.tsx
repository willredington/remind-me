import { Box, useColorMode } from '@chakra-ui/react';
import { useAppState } from '@remind-me/frontend/customer/util-store';
import { Location } from '@remind-me/shared/util-location';
import { Task } from '@remind-me/shared/util-task';
import { uniqBy } from 'lodash';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useMemo } from 'react';
import { Map, Marker, ViewState } from 'react-map-gl';
import { Legend } from './Legend';
import { Lines } from './Lines';
import { HomeMapPin, TaskMapPin } from './Pin';

const ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const MAP_STYLE = {
  light: 'mapbox://styles/mapbox/streets-v9',
  dark: 'mapbox://styles/mapbox/dark-v11',
};

const MAP_HEIGHT = '300px';

export function TaskMap({
  startingLocation,
  tasks,
}: {
  startingLocation: Location;
  tasks: Task[];
}) {
  const { colorMode } = useColorMode();

  const [selectedLocation, setSelectedLocation] = useAppState(
    (state) => [state.selectedLocation, state.setSelectedLocation] as const
  );

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
        <HomeMapPin name={startingLocation.name} />
      </Marker>
    );
  }, [startingLocation]);

  const locationMarkers = useMemo(() => {
    return uniqBy(
      tasks.map((task) => task.location),
      (location) => location.id
    ).map((location) => (
      <Marker
        key={location.id}
        longitude={location.longitude}
        latitude={location.latitude}
        onClick={() => setSelectedLocation(location)}
        anchor="bottom"
      >
        <TaskMapPin name={location.name} />
      </Marker>
    ));
  }, [tasks, setSelectedLocation]);

  return (
    <>
      <Legend />
      <Box h={MAP_HEIGHT} mt={2}>
        <Map
          initialViewState={initialViewState}
          mapboxAccessToken={ACCESS_TOKEN}
          mapStyle={MAP_STYLE[colorMode]}
        >
          {homeMarker}
          {locationMarkers}
          <Lines startingLocation={startingLocation} tasks={tasks} />
        </Map>
      </Box>
    </>
  );
}
