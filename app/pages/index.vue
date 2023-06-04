<template>
  <main>
    <div class="min-h-screen sm:px-4 md:space-y-16 space-y-8 md:py-16 py-8">
      <Header class="mx-auto max-w-4xl" />

      <Calendar class="mx-auto max-w-5xl" />

      <SelectedDay class="mx-auto max-w-4xl" />
    </div>

    <Footer />
  </main>
</template>

<script setup lang="ts">
import { Attendee, AttendeeConverter } from "@burofreunde/types";
import {
  collection,
  where,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

const { $firestore } = useNuxtApp();

const visibleDays = useVisibleDays();

const attendance = useAttendance();

const q = query(
  collection($firestore, "attendance").withConverter(AttendeeConverter),
  where("date", ">=", visibleDays.value.at(0)!.dateISO),
  where("date", "<=", visibleDays.value.at(-1)!.dateISO),
  orderBy("date"),
  orderBy("name")
);

const unsubAttendance = onSnapshot(q, (snapshot) => {
  attendance.value = snapshot.docs.map((d) => {
    return {
      ...d.data(),
      path: d.ref.path,
    } as Attendee;
  });
});

onUnmounted(() => {
  unsubAttendance();
});
</script>
