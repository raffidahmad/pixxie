import { JobRequest } from '@/types/Common.types';

export const getJobPrice = (data: JobRequest, travelTime: number): number => {
  //if needed to customize the price calculation: distance, service
  const price = 2 * travelTime + 30;
  return price;
};
