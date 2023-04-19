<template>
  <NuxtLayout>
    <NuxtPage></NuxtPage>
  </NuxtLayout>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: all 150ms;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  filter: blur(0.125rem);
}
</style>
