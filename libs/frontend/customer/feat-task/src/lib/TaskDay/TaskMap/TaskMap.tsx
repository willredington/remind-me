import { Box } from '@chakra-ui/react';
import { Location } from '@remind-me/shared/util-location';
import { Schedule, Task } from '@remind-me/shared/util-task';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useMemo } from 'react';
import { Map, Marker, ViewState } from 'react-map-gl';
import { Line } from './Line';
import { HomePin } from './Pin';

const ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const MAP_STYLE = 'mapbox://styles/mapbox/streets-v9';

export function TaskMap({
  startingLocation,
  schedule,
  selectedTask,
  setSelectedTask,
}: {
  startingLocation: Location;
  schedule: Schedule;
  selectedTask: Task | null;
  setSelectedTask: (task: Task) => void; // FIXME
}) {
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
        longitude={startingLocation.longitude}
        latitude={startingLocation.latitude}
        anchor="bottom"
      >
        <HomePin name={startingLocation.name} />
      </Marker>
    );
  }, [startingLocation]);

  const taskMarkers = useMemo(() => {
    return schedule.tasks.map((task) => (
      <Marker
        key={task.id}
        longitude={task.location.longitude}
        latitude={task.location.latitude}
        anchor="bottom"
        onClick={(e) => {
          e.originalEvent.stopPropagation();
          setSelectedTask(task);
        }}
      >
        <HomePin name={task.name} />
      </Marker>
    ));
  }, [schedule.tasks, setSelectedTask]);

  const tripLines = useMemo(
    () => schedule.trips.map((trip, i) => <Line key={trip.id} trip={trip} />),
    [schedule.trips]
  );

  return (
    <Box h="full" position="relative">
      <Map
        initialViewState={initialViewState}
        mapboxAccessToken={ACCESS_TOKEN}
        mapStyle={MAP_STYLE}
      >
        {homeMarker}
        {taskMarkers}
        {tripLines}
      </Map>
    </Box>
  );
}
