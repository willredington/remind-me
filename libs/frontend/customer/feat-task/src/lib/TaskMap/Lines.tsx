import { Location } from '@remind-me/shared/util-location';
import { Task } from '@remind-me/shared/util-task';
import { useMemo } from 'react';
import { Layer, Source } from 'react-map-gl';

type Position = [longitude: number, latitude: number];

export function Lines({
  startingLocation,
  tasks,
}: {
  startingLocation: Location;
  tasks: Task[];
}) {
  const taskPositions = useMemo(() => {
    const positions: Position[] = [];

    let lastLocation = startingLocation;

    for (const task of tasks) {
      positions.push(
        [lastLocation.longitude, lastLocation.latitude],
        [task.location.longitude, task.location.latitude]
      );
      lastLocation = task.location;
    }

    return positions;
  }, [tasks, startingLocation]);

  return (
    <Source
      type="geojson"
      data={{
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: taskPositions,
        },
      }}
    >
      <Layer
        id="lineLayer"
        type="line"
        layout={{
          'line-join': 'round',
          'line-cap': 'round',
        }}
        paint={{
          'line-width': 5,
          'line-color': '#14d8ff',
        }}
      />
    </Source>
  );
}
