import { type ClassValue, clsx } from "clsx";
import qs from "query-string";
import { twMerge } from "tailwind-merge";

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

export const getJoindedDate = (date: Date) => {
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  const joindedDate = `${month} ${year}`;
  return joindedDate;
};

interface UrlQueryParams {
  params: string;
  key: string;
  value: string | null;
}
export const formUrlQuery = ({ params, key, value }: UrlQueryParams) => {
  const currentUrl = qs.parse(params);
  currentUrl[key] = value;
  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
};
interface RemoveUrlQueryParams {
  params: string;
  keysToRemove: string[];
}
export const removeKeysFromQuery = ({
  params,
  keysToRemove,
}: RemoveUrlQueryParams) => {
  const currentUrl = qs.parse(params);
  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });
  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
};
