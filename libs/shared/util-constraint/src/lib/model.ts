// must be home at specific time
// is only awake at 7am, goes to sleep at 10pm
// don't care about the exact location (i.e don't care where I get groceries if it will save me time)
// must be exact location (workplace, gym...etc)
// time, location

export enum ConstraintType {
  TimeRange = 'TimeRange',
}

export type BaseConstraint = {
  id: string;
  type: ConstraintType;
  name: string;
  description?: string;
};

export type TimeRangeConstraint = BaseConstraint & {
  type: ConstraintType.TimeRange;
  startTime: string;
  endTime: string;
};

export type Constraint = TimeRangeConstraint;
