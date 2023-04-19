import { FirestoreDate } from "./static";

export interface CalendarDay {
  date: Date;
  past: boolean;
  today: boolean;
  attendees: Attendee[];
}

export interface Attendee {
  timestamp: FirestoreDate;
  name: string;
  cake: boolean;
  message?: string;
}
