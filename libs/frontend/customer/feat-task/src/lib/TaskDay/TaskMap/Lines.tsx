import { Trip } from '@remind-me/shared/util-task';
import { Layer, Source } from 'react-map-gl';

export function Lines({ trips }: { trips: Trip[] }) {
  return (
    <Source
      type="geojson"
      data={{
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: trips.flatMap((trip) => [
            [trip.origin.longitude, trip.origin.latitude],
            [trip.destination.longitude, trip.destination.latitude],
          ]),
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
