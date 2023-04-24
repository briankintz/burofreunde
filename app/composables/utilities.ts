import { FirestoreDate } from "@burofreunde/types";
import { Timestamp } from "firebase/firestore";

export const useUtilities = () => {
  const toDate = (date: FirestoreDate) => {
    if (date instanceof Date) return date;
    if (date instanceof Timestamp) return date.toDate();
    if (typeof date === "string") return new Date(date);
    throw new Error("Invalid type: " + date);
  };

  const toDEDateString = (date: FirestoreDate) => {
    return toDate(date).toLocaleDateString("de-DE");
  };

  const toDEDateTimeString = (date: FirestoreDate) => {
    const d = toDate(date);
    const datePart = d.toLocaleDateString("de-DE");
    const timePart = d.toLocaleTimeString("de-DE").substring(0, 5);
    return `${datePart} um ${timePart}`;
  };

  const toISODateString = (date: FirestoreDate) => {
    return toDate(date).toISOString().substring(0, 10);
  };

  const debounce = (fn: any, timeout = 500) => {
    let timer: NodeJS.Timeout;

    return (...args: any) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(this, args);
      }, timeout);
    };
  };

  return {
    debounce,
    toDate,
    toDEDateString,
    toDEDateTimeString,
    toISODateString,
  };
};
