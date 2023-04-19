<template>
  <button
    class="w-12 pt-4 pb-3 leading-4 transition-all hover:scale-110 hover:bg-slate-200 dark:hover:bg-slate-500 rounded-xl"
    @click="signOut()"
  >
    <i class="fa-solid fa-person-through-window fa-lg"></i>
  </button>
</template>

<script setup lang="ts">
const { $auth } = useNuxtApp();

async function signOut() {
  await $auth.signOut();
  return navigateTo("/login");
}
</script>
