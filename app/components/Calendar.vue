<template>
  <section>
    <div
      class="grid grid-cols-5 text-center border dark:border-2 dark:border-slate-300 sm:rounded-xl"
    >
      <div
        v-for="weekday in ['Mo', 'Di', 'Mi', 'Do', 'Fr']"
        class="p-3 border-b dark:border-b-2 dark:border-slate-300"
      >
        {{ weekday }}
      </div>
      <button
        v-for="day in days"
        class="group p-8 flex flex-col items-center"
        :disabled="day.past"
        @click="selectedDay = day"
      >
        <div
          class="flex flex-col px-6 pt-2 pb-3 gap-1 rounded-xl transition-all"
          :class="{
            'day-future': !day.today && !day.past,
            'day-today': day.today,
            'day-past': day.past,
            active: selectedDay == day,
          }"
        >
          <span>
            {{ day.date.getDate() }}
          </span>
          <span
            v-if="!day.past"
            class="px-2 border text-sm rounded-full"
            :class="[
              day.attendees.length > 0
                ? 'bg-teal-50 border-teal-500 text-teal-500'
                : 'bg-indigo-50 border-indigo-500 text-indigo-500',
            ]"
            >{{ day.attendees.length }}</span
          >
        </div>
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { CalendarDay } from "@burofreunde/types";
import { PropType } from "vue";

const { days } = defineProps({
  days: {
    type: Object as PropType<CalendarDay[]>,
    required: true,
  },
});

const selectedDay = useSelectedDay();
</script>

<style>
.day-future {
  @apply group-hover:scale-110 group-hover:bg-slate-200 dark:group-hover:bg-slate-500;
}

.day-today {
  @apply bg-teal-500 text-slate-50;
  @apply group-hover:scale-110 group-hover:bg-teal-600 dark:group-hover:bg-teal-600;
}

.day-past {
  @apply text-slate-400;
}

.active {
  @apply scale-125 group-hover:scale-125;
}
</style>
