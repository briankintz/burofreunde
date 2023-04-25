<template>
  <button
    class="w-12 pt-4 pb-3 leading-4 transition-all hover:scale-110 hover:bg-slate-200 dark:hover:bg-slate-500 rounded-xl"
    @click="toggleTheme()"
  >
    <i v-if="theme === 'dark'" class="fa-solid fa-sun-bright fa-lg"></i>
    <i v-if="theme === 'light'" class="fa-solid fa-moon fa-lg"></i>
  </button>
</template>

<script setup lang="ts">
const theme = ref(localStorage.theme);

const preference = window.matchMedia("(prefers-color-scheme: dark)").matches
  ? "dark"
  : "light";

if (!theme.value) {
  theme.value = preference;
}

function toggleTheme() {
  if (theme.value === "dark") {
    localStorage.theme = "light";
    document.documentElement.classList.remove("dark");
  } else {
    localStorage.theme = "dark";
    document.documentElement.classList.add("dark");
  }

  theme.value = localStorage.theme;
}
</script>
