<template>
  <main>
    <div class="min-h-screen sm:px-4 md:space-y-16 space-y-8 md:py-16 py-8">
      <Header class="mx-auto max-w-4xl" />

      <Calendar :days="days" class="mx-auto max-w-5xl" />

      <SelectedDay class="mx-auto max-w-4xl" />
    </div>

    <Footer />
  </main>
</template>

<script setup lang="ts">
import { CalendarDay } from "@burofreunde/types";

const ONE_DAY = 86400000;

const days = ref<CalendarDay[]>([]);

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

  days.value.push({
    date,
    past: date < today,
    today: date === today,
    attendees:
      d == 9
        ? [
            {
              name: "Max Müller",
              cake: true,
              message: "Ich liebe Schokoladentorte!",
              timestamp: "2023-04-21T09:30:00Z",
            },
            {
              name: "Anna Fischer",
              cake: false,
              timestamp: "2023-04-21T09:32:15Z",
            },
            {
              name: "Paul Wagner",
              cake: true,
              message: "Ich bevorzuge Vanilletorte.",
              timestamp: "2023-04-21T09:35:22Z",
            },
            {
              name: "Sophie Schmidt",
              cake: false,
              timestamp: "2023-04-21T09:38:10Z",
            },
            {
              name: "Luca Schneider",
              cake: true,
              message: "Ich kann keine Torte essen, ich mache gerade Diät.",
              timestamp: "2023-04-21T09:40:45Z",
            },
            {
              name: "Emma Becker",
              cake: false,
              timestamp: "2023-04-21T09:42:55Z",
            },
            {
              name: "Liam Richter",
              cake: true,
              timestamp: "2023-04-21T09:45:12Z",
            },
            {
              name: "Mia Weber",
              cake: false,
              message: "Ich bin allergisch gegen Torte.",
              timestamp: "2023-04-21T09:48:30Z",
            },
            {
              name: "Hannah Keller",
              cake: true,
              message: "Torte ist mein Lieblingsdessert.",
              timestamp: "2023-04-21T09:50:40Z",
            },
            {
              name: "Benjamin Braun",
              cake: false,
              timestamp: "2023-04-21T09:52:18Z",
            },
          ]
        : [],
  });
}
</script>
