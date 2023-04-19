<template>
  <div
    class="flex flex-col px-4 py-2 mb-6 space-y-2 border dark:border-2 dark:border-slate-300 sm:rounded-xl"
  >
    <h3>
      {{ attendee.name }}
      <span class="ml-2 text-sm text-slate-400 font-light italic">{{
        toDEDateTimeString(attendee.timestamp)
      }}</span>
    </h3>
    <span class="text-base md:text-lg" v-if="attendee.message">
      <i class="fa-solid fa-comment-quote ml-1 mr-2"></i>
      {{ attendee.message }}
    </span>

    <span class="text-base md:text-lg italic" v-if="attendee.cake">
      <i class="fa-solid fa-cake-slice ml-1 mr-2"></i>
      Es gibt Kuchen!
    </span>
  </div>
</template>

<script setup lang="ts">
import { Attendee } from "@burofreunde/types";
import { PropType } from "vue";

const { toDEDateTimeString } = useUtilities();

const { attendee } = defineProps({
  attendee: {
    type: Object as PropType<Attendee>,
    required: true,
  },
});
</script>
