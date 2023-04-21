import { Box, Mark } from '@chakra-ui/react';
import { Location } from '@remind-me/shared/util-location';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useMemo, useState } from 'react';
import { Map, Marker } from 'react-map-gl';
import { FaMapPin } from 'react-icons/fa';
import { Task, TaskTemplate } from '@remind-me/shared/util-task';

const accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

export function TaskMap({
  startingLocation,
  tasksForDay,
  suggestedTasks,
}: {
  startingLocation: Location;
  tasksForDay: Task[];
  suggestedTasks: TaskTemplate[];
}) {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );

  const initialViewState = useMemo(() => {
    return {
      latitude: startingLocation.latitude,
      longitude: startingLocation.longitude,
      zoom: 15,
      pitch: 0,
      bearing: 0,
    };
  }, [startingLocation]);

  const homePin = useMemo(
    () => (
      <Marker
        key="start"
        latitude={startingLocation.latitude}
        longitude={startingLocation.longitude}
        anchor="bottom"
      >
        <FaMapPin size="3em" />
      </Marker>
    ),
    [startingLocation]
  );

  const taskPins = useMemo(() => {
    tasksForDay.map((task) => (
      <Marker
        key={task.id}
        latitude={task.location.latitude}
        longitude={task.location.longitude}
        anchor="bottom"
        onClick={(e) => {
          e.originalEvent.stopPropagation();
          setSelectedLocation(task.location);
        }}
      >
        <FaMapPin size="3em" />
      </Marker>
    ));
  }, [tasksForDay]);

  return (
    <Box width="full" height="400px">
      <Map
        initialViewState={initialViewState}
        mapboxAccessToken={accessToken}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        {homePin}
        {taskPins}
      </Map>
    </Box>
  );
}
