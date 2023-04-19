<template>
  <section>
    <div v-if="day">
      <h2 class="px-4 mb-6">
        {{ day.date.toLocaleDateString("de-DE") }}
      </h2>

      <div
        class="flex md:flex-row flex-col-reverse md:items-start lg:gap-x-20 gap-x-12 gap-y-8"
      >
        <div class="flex flex-col basis-1/2">
          <Attendee v-for="attendee of day.attendees" :attendee="attendee" />
        </div>

        <UserAttendance class="basis-1/2" />
      </div>
    </div>
    <div v-else class="text-center text-base md:text-lg italic text-slate-400">
      Wähle einen Tag aus, um die anwesenden Kollegen zu sehen.
    </div>
  </section>
</template>

<script setup lang="ts">
const day = useSelectedDay();
</script>
