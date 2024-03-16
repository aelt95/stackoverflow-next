import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { log } from "util";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimeStamp = (createdAt: Date) => {
  const currentDate = new Date();
  const difDate = currentDate.getTime() - createdAt.getTime();
  const secondsDif = difDate / 1000;

  if (secondsDif <= 30) return "less than a minute";
  if (secondsDif > 30 && secondsDif <= 90) return "1 minute";
  if (secondsDif > 90 && secondsDif <= 2670)
    return `${Math.floor(secondsDif / 60)} minutes ago`;
  if (secondsDif > 2670 && secondsDif <= 5370) return "about 1 hour";
  if (secondsDif > 5370) {
    return "more than an hour";
  }
};
