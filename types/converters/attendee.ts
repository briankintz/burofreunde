import { FirestoreDataConverter, WithFieldValue } from "firebase/firestore";
import { Attendee } from "..";

const { toISODateString } = useUtilities();

export const AttendeeConverter: FirestoreDataConverter<Attendee> = {
  toFirestore(data: Attendee): WithFieldValue<Attendee> {
    return {
      userUID: data.userUID,
      timestamp: data.timestamp,
      date: toISODateString(data.date),
      name: data.name,
      cake: data.cake,
      message: data.message,
    };
  },

  fromFirestore(snapshot) {
    return snapshot.data({ serverTimestamps: "estimate" }) as Attendee;
  },
};
