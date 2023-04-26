import { Trip } from '@remind-me/shared/util-task';
import { Layer, Source } from 'react-map-gl';

export function Line({ trip }: { trip: Trip }) {
  return (
    <Source
      key={trip.id}
      type="geojson"
      data={{
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: [
            [trip.origin.longitude, trip.origin.latitude],
            [trip.destination.longitude, trip.destination.latitude],
          ],
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
