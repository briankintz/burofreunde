<template>
  <footer
    class="flex flex-col items-center gap-2 text-sm lg:text-base w-full p-6 bg-slate-700 dark:bg-slate-800"
  >
    <a
      href="https://briankintz.com"
      target="_blank"
      class="group px-4 py-2 text-slate-300 hover:bg-slate-800 dark:hover:bg-slate-900 rounded-xl transition-colors"
    >
      Handcrafted with
      <i
        class="fa-solid fa-heart fa-sm mx-1 text-rose-400 group-hover:text-red-500 group-hover:scale-125 transition-all"
      ></i>
      by Brian Kintz</a
    >
    <a
      href="https://github.com/briankintz/burofreunde"
      target="_blank"
      class="px-4 py-2 text-slate-300 hover:bg-slate-800 dark:hover:bg-slate-900 rounded-xl transition-colors"
      >{{ config.public.version.substring(0, 7) }} © {{ year }}</a
    >
  </footer>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();

const year = ref(new Date().getFullYear());
</script>
