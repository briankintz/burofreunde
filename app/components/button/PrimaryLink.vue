<template>
  <NuxtLink
    :to="to"
    class="rounded-lg bg-sky-500 pt-2.5 pb-2 px-4 font-medium text-white shadow-sm hover:bg-sky-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
  >
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps({
  to: String,
})
</script>
