<template>
  <div class="flex flex-col gap-2">
    <h3 class="text-2xl font-semibold text-white">
      {{ title }}
    </h3>
    <p class="text-sm opacity-70 text-white">
      {{ description }}
    </p>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  title: string
  description: string
}>()
</script>
