import { User, CalendarDay, Attendee } from "@burofreunde/types";

const { toISODateString } = useUtilities();

export const useAuthUser = () => useState<User | null>("user");

export const useAttendance = () => useState<Attendee[]>("attendance", () => []);

export const useSelectedDate = () =>
  useState<string>("selectedDay", () => toISODateString(new Date()));

export const useVisibleDays = () =>
  useState<CalendarDay[]>("visibleDays", () => {
    const ONE_DAY = 86400000;

    const days: CalendarDay[] = [];

    const today = new Date();
    const day = today.getDay();

    for (var d = 1; d <= 12; d++) {
      if (d === 6 || d === 7) continue;

      var date;

      if (d < day) {
        date = new Date(today.valueOf() - (day - d) * ONE_DAY);
      } else if (d === day) {
        date = today;
      } else {
        date = new Date(today.valueOf() + (d - day) * ONE_DAY);
      }

      days.push({
        date,
        dateISO: toISODateString(date),
        past: date < today,
        today: date === today,
      });
    }

    return days;
  });
