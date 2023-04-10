export enum LocationType {
  Home = 'Home',
  Grocery = 'Grocery',
  Gym = 'Gym',
  Religious = 'Religious',
  Work = 'Work',
  School = 'School',
  Other = 'Other',
}

export type Location = {
  id: string;
  isPreferred?: boolean;
  type: LocationType;
  address: string;
  name?: string;
  description?: string;
};

export enum LatitudeDirection {
  North = 'North',
  South = 'South',
}

export enum LongitudeDirection {
  East = 'East',
  West = 'West',
}
