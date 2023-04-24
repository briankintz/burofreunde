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
        v-for="day in daysWithAttendanceCounts"
        class="flex flex-col items-center group px-8 py-12"
        :disabled="day.past"
        @click="selectedDate = day.dateISO"
      >
        <h4
          class="w-12 h-12 mb-4 flex items-center justify-center rounded-xl transition-all"
          :class="{
            'calendar-day--disabled': day.past,
            'calendar-day--enabled': !day.past,
            'calendar-day--today': day.today,
            'calendar-day--active': selectedDate == day.dateISO,
          }"
        >
          {{ day.date.getDate() }}
        </h4>
        <span
          v-if="!day.past"
          class="px-2 border text-sm rounded-full"
          :class="[
            day.attendanceCount > 0
              ? 'bg-teal-50 border-teal-500 text-teal-500 dark:bg-teal-400/10'
              : 'bg-indigo-50 border-indigo-500 text-indigo-500 dark:bg-indigo-400/10',
          ]"
        >
          {{ day.attendanceCount }}
          <i v-if="day.cake" class="fa-solid fa-cake-slice ml-1"></i>
        </span>
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
const visibleDays = useVisibleDays();

const attendance = useAttendance();

const daysWithAttendanceCounts = computed(() =>
  visibleDays.value.map((d) => {
    return {
      ...d,
      cake: attendance.value.find((a) => a.cake && a.date == d.dateISO),
      attendanceCount: attendance.value.filter((a) => a.date == d.dateISO)
        .length,
    };
  })
);

const selectedDate = useSelectedDate();
</script>

<style>
.calendar-day--enabled {
  @apply group-hover:scale-110 group-hover:bg-slate-200 dark:group-hover:bg-slate-500;
}

.calendar-day--disabled {
  @apply text-slate-400;
}

.calendar-day--today {
  @apply text-teal-500 font-semibold;
}

.calendar-day--active {
  @apply !text-slate-50 !bg-teal-500 scale-[1.15] group-hover:scale-[1.15];
}
</style>
