<template>
  <section>
    <h2 class="px-4 mb-6">
      {{ toDEDateString(date) }}
    </h2>

    <div
      class="flex md:flex-row flex-col-reverse md:items-start lg:gap-x-20 gap-x-12 gap-y-8"
    >
      <div class="flex flex-col basis-1/2">
        <Attendee v-for="attendee of attendees" :attendee="attendee" />

        <p
          v-if="!attendees.length"
          class="pl-4 text-base md:text-lg italic text-slate-400"
        >
          <i class="fa-regular fa-face-sad-tear mr-1"></i>
          Leider hat sich noch niemand gemeldet
        </p>
      </div>

      <UserAttendance class="basis-1/2" />
    </div>
  </section>
</template>

<script setup lang="ts">
const { toDEDateString } = useUtilities();

const date = useSelectedDate();

const attendance = useAttendance();

const attendees = computed(() =>
  attendance.value.filter((a) => a.date == date.value)
);
</script>
