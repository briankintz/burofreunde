import { User, CalendarDay } from "@burofreunde/types";

export const useAuthUser = () => useState<User | null>("user");

export const useSelectedDay = () => useState<CalendarDay | null>("selectedDay");
