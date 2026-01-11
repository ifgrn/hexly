<script setup lang="ts">
import { RouterView } from 'vue-router';
import HeaderLayout from './components/HeaderLayout.vue';
</script>

<template>
  <HeaderLayout />
  <main class="w-full flex items-center">
    <RouterView/>
  </main>
</template>

<style scoped></style>
