import { z } from 'zod';

export const TripFormData = z.object({
  startLocationId: z.string(),
});
