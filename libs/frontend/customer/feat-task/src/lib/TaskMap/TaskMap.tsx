import { Box, useColorMode } from '@chakra-ui/react';
import { Location } from '@remind-me/shared/util-location';
import { TaskSuggestion } from '@remind-me/shared/util-suggest';
import { Schedule } from '@remind-me/shared/util-task';
import { uniqBy } from 'lodash';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useMemo } from 'react';
import { Map, Marker, ViewState } from 'react-map-gl';
import { Legend } from './Legend';
import { Lines } from './Lines';
import { HomeMapPin, SuggestMapPin, TaskMapPin } from './Pin';

const ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const MAP_STYLE = {
  light: 'mapbox://styles/mapbox/streets-v9',
  dark: 'mapbox://styles/mapbox/dark-v11',
};

const MAP_HEIGHT = '300px';

export function TaskMap({
  startingLocation,
  schedule,
  suggestions,
  onClickSuggestion,
}: {
  startingLocation: Location;
  schedule: Schedule;
  suggestions: TaskSuggestion[];
  onClickSuggestion: (suggestion: TaskSuggestion) => void;
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
    return suggestions.map(([template, dateRanges]) => (
      <Marker
        key={template.id}
        longitude={template.location.longitude}
        latitude={template.location.latitude}
        onClick={() => onClickSuggestion([template, dateRanges])}
        anchor="bottom"
      >
        <SuggestMapPin name={template.location.name} />
      </Marker>
    ));
  }, [suggestions, onClickSuggestion]);

  return (
    <>
      <Legend />
      <Box h={MAP_HEIGHT} mt={2} flex={4}>
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
    </>
  );
}
