import { Box } from '@chakra-ui/react';
import { PickingInfo } from '@deck.gl/core/typed';
import { IconLayer } from '@deck.gl/layers/typed';
import DeckGL from '@deck.gl/react/typed';
import { trpc } from '@remind-me/frontend/customer/util-trpc';
import { Location } from '@remind-me/shared/util-location';
import { Task } from '@remind-me/shared/util-task';
import { DateTime } from 'luxon';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useCallback, useMemo, useState } from 'react';
import { Map } from 'react-map-gl';

const accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const iconAtlas = 'images/map_sprites.png';

const iconMapping = 'json/map_sprites_mapping.json';

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

  console.log('suggestions', suggestions);

  const getTooltip = useCallback(({ object }: PickingInfo) => {
    return (object && (object as Location).name) ?? null;
  }, []);

  const initialViewState = useMemo(() => {
    return {
      latitude: startingLocation.latitude,
      longitude: startingLocation.longitude,
      zoom: 15,
      pitch: 0,
      bearing: 0,
    };
  }, [startingLocation]);

  const layers = [
    new IconLayer({
      id: 'IconLayer',
      data: [startingLocation],
      pickable: true,
      iconAtlas,
      iconMapping,
      sizeScale: 15,
      getSize: () => 10,
      getIcon: () => 'marker',
      getPosition: (datum: Location) => [datum.longitude, datum.latitude],
    }),
  ];

  return (
    <Box height="500px" position="relative">
      <DeckGL
        layers={layers}
        controller={true}
        initialViewState={initialViewState}
        getTooltip={getTooltip}
      >
        <Map
          mapboxAccessToken={accessToken}
          mapStyle="mapbox://styles/mapbox/streets-v9"
        />
      </DeckGL>
    </Box>
  );
}
