export function calculateAverageDistanceBetweenPoints(
  points: { latitude: number; longitude: number }[]
): number {
  const earthRadius = 6371; // kilometers

  let totalDistance = 0;
  let pairCount = 0;

  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const lat1 = points[i].latitude;
      const lon1 = points[i].longitude;
      const lat2 = points[j].latitude;
      const lon2 = points[j].longitude;

      const dLat = ((lat2 - lat1) * Math.PI) / 180;
      const dLon = ((lon2 - lon1) * Math.PI) / 180;

      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
          Math.cos((lat2 * Math.PI) / 180) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);

      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      const distance = earthRadius * c;

      totalDistance += distance;
      pairCount++;
    }
  }

  return totalDistance / pairCount;
}
