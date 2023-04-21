import { Location } from './model';

function radians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

function makePermutations<T>(arr: T[]): T[][] {
  if (arr.length === 0) {
    return [[]];
  }
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
    const restPerms = makePermutations(rest);
    for (const perm of restPerms) {
      result.push([arr[i], ...perm]);
    }
  }
  return result;
}

// export function calculateShortestPathBetweenPoints(
//   staticList: CoordinatePoint[],
//   optionalList: CoordinatePoint[]
// ): CoordinatePoint[] {
//   const allCoords: CoordinatePoint[] = [...staticList, ...optionalList];

//   // Create a dictionary of distances between all pairs of coordinates
//   const distances: Record<string, Record<string, number>> = {};

//   for (const coord1 of allCoords) {
//     distances[coord1.latitude + ',' + coord1.longitude] = {};

//     for (const coord2 of allCoords) {
//       if (coord1 === coord2) {
//         distances[coord1.latitude + ',' + coord1.longitude][
//           coord2.latitude + ',' + coord2.longitude
//         ] = 0;
//       } else {
//         const lat1 = radians(coord1.latitude);
//         const lng1 = radians(coord1.longitude);

//         const lat2 = radians(coord2.latitude);
//         const lng2 = radians(coord2.longitude);

//         const dLng = lng2 - lng1;
//         const dLat = lat2 - lat1;

//         const a =
//           Math.pow(Math.sin(dLat / 2), 2) +
//           Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dLng / 2), 2);

//         const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//         const distance = c * 6371 * 1000; // convert to meters

//         distances[coord1.latitude + ',' + coord1.longitude][
//           coord2.latitude + ',' + coord2.longitude
//         ] = distance;
//       }
//     }
//   }

//   // Create a list of all the possible permutations of coordinates to visit
//   const permutations: CoordinatePoint[][] = makePermutations(optionalList);

//   // Initialize the minimum distance and path
//   let minDistance = Infinity;
//   let minPath: CoordinatePoint[] = [];

//   // Loop through all the permutations of coordinates to visit
//   for (const p of permutations) {
//     const path: CoordinatePoint[] = [...staticList, ...p];

//     let distance = 0;

//     for (let i = 0; i < path.length - 1; i++) {
//       distance +=
//         distances[path[i].latitude + ',' + path[i].longitude][
//           path[i + 1].latitude + ',' + path[i + 1].longitude
//         ];
//     }

//     if (distance < minDistance) {
//       minDistance = distance;
//       minPath = path;
//     }
//   }

//   return minPath;
// }
