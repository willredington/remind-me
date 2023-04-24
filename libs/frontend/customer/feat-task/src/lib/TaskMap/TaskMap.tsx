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

const iconLayerProps = {
  iconAtlas,
  iconMapping,
  sizeScale: 18,
  pickable: true,
  getSize: () => 10,
  getIcon: () => 'marker',
};

enum LayerId {
  StartingLocation = 'StartingLocationLayerId',
  DailyTasks = 'DailyTasksLayerId',
}

export function TaskMap({
  dateTime,
  startingLocation,
}: {
  dateTime: DateTime;
  startingLocation: Location;
}) {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );

  const { data: tasks = [] } = trpc.task.findManyTasks.useQuery({
    dateRange: [
      dateTime.startOf('day').toJSDate(),
      dateTime.endOf('day').toJSDate(),
    ],
  });

  //   const { data: suggestions = [] } = trpc.suggest.getSuggestions.useQuery({
  //     date: dateTime.toJSDate(),
  //   });

  const initialViewState = useMemo(() => {
    return {
      latitude: startingLocation.latitude,
      longitude: startingLocation.longitude,
      zoom: 12,
      pitch: 0,
      bearing: 0,
    };
  }, [startingLocation]);

  const layers = useMemo(
    () => [
      new IconLayer({
        ...iconLayerProps,
        id: LayerId.StartingLocation,
        data: [startingLocation],
        getPosition: (datum: Location) => [datum.longitude, datum.latitude],
      }),
      new IconLayer({
        ...iconLayerProps,
        id: LayerId.DailyTasks,
        data: tasks,
        getPosition: (datum: Task) => [
          datum.location.longitude,
          datum.location.latitude,
        ],
        onClick: (info) => {
          console.log(info);
        },
      }),
    ],
    [startingLocation, tasks]
  );

  const getTooltip = useCallback(({ layer, object }: PickingInfo) => {
    if (layer && object) {
      switch (layer.id) {
        case LayerId.StartingLocation:
          return (object as Location).name;
        case LayerId.DailyTasks: {
          const task = object as Task;

          const startDateLabel = DateTime.fromJSDate(
            task.startDate
          ).toLocaleString(DateTime.TIME_SIMPLE);

          const endDateLabel = DateTime.fromJSDate(task.endDate).toLocaleString(
            DateTime.TIME_SIMPLE
          );

          return `${task.name} from ${startDateLabel} to ${endDateLabel}`;
        }
      }
    }

    return null;
  }, []);

  return (
    <Box height="500px" position="relative">
      <DeckGL
        layers={layers}
        controller={true}
        getTooltip={getTooltip}
        initialViewState={initialViewState}
      >
        <Map
          mapboxAccessToken={accessToken}
          mapStyle="mapbox://styles/mapbox/streets-v9"
        />
      </DeckGL>
    </Box>
  );
}
