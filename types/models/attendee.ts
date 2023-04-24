import { FirestoreDate } from "./static";

export interface Attendee {
  path: string;
  userUID: string;
  timestamp: FirestoreDate;
  date: FirestoreDate;
  name: string;
  cake: boolean;
  message?: string;
}
