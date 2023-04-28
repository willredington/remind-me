import { Box, useColorMode } from '@chakra-ui/react';
import { trpc } from '@remind-me/frontend/customer/util-trpc';
import { Location } from '@remind-me/shared/util-location';
import { Schedule } from '@remind-me/shared/util-task';
import { uniqBy } from 'lodash';
import { DateTime } from 'luxon';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useMemo } from 'react';
import { Map, Marker, ViewState } from 'react-map-gl';
import { Legend } from './Legend';
import { Lines } from './Lines';
import { HomeMapPin, TaskMapPin, SuggestMapPin } from './Pin';

const ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const MAP_STYLE = {
  light: 'mapbox://styles/mapbox/streets-v9',
  dark: 'mapbox://styles/mapbox/dark-v11',
};

export function TaskMap({
  dateTime,
  startingLocation,
  schedule,
}: {
  dateTime: DateTime;
  startingLocation: Location;
  schedule: Schedule;
}) {
  const { colorMode } = useColorMode();

  const { isLoading: isSuggestionLoading, data: suggestions = [] } =
    trpc.suggest.getSuggestions.useQuery({
      date: dateTime.toJSDate(),
    });

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
      schedule.tasks.map((task) => task.location),
      (location) => location.id
    ).map((location) => (
      <Marker
        key={location.id}
        longitude={location.longitude}
        latitude={location.latitude}
        anchor="bottom"
      >
        <TaskMapPin name={location.name} />
      </Marker>
    ));
  }, [schedule.tasks]);

  const suggestionMarkers = useMemo(() => {
    return suggestions.map(([template]) => (
      <Marker
        key={template.id}
        longitude={template.location.longitude}
        latitude={template.location.latitude}
        anchor="bottom"
      >
        <SuggestMapPin name={template.location.name} />
      </Marker>
    ));
  }, [suggestions]);

  return (
    <Box h="300px">
      <Legend />
      <Box h="full" mt={2} position="relative">
        <Map
          initialViewState={initialViewState}
          mapboxAccessToken={ACCESS_TOKEN}
          mapStyle={MAP_STYLE[colorMode]}
        >
          {homeMarker}
          {locationMarkers}
          {suggestionMarkers}
          <Lines startingLocation={startingLocation} tasks={schedule.tasks} />
        </Map>
      </Box>
    </Box>
  );
}
