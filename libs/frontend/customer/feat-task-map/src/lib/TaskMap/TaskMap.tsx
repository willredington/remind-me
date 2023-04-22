import { Box, Mark } from '@chakra-ui/react';
import { Location } from '@remind-me/shared/util-location';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useMemo, useState } from 'react';
import { Map, Marker } from 'react-map-gl';
import { FaMapPin } from 'react-icons/fa';
import { Task, TaskTemplate } from '@remind-me/shared/util-task';
import { trpc } from '@remind-me/frontend/customer/util-trpc';
import { DateTime } from 'luxon';

const accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

export function TaskMap({
  dateTime,
  startingLocation,
  tasksForDay,
}: {
  dateTime: DateTime;
  startingLocation: Location;
  tasksForDay: Task[];
}) {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );

  const { data: suggestions = [] } = trpc.suggest.getSuggestions.useQuery({
    date: dateTime.toJSDate(),
  });

  console.log(suggestions);

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
    <Box height="500px">
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
