<template>
  <header class="w-full border-b sticky top-0 z-50 border-white/20 mx-auto overflow-x-hidden">
    <div class="flex justify-between md:mx-auto max-w-500">
      <RouterLink to="/" class="flex items-center gap-1 w-fit p-4">
        <HextechIcon class="size-7" />
        <p class="text-sm">HEXTECH MANAGER</p>
      </RouterLink>

      <div v-if="router.path !== '/dashboard'" class="flex px-4 gap-4 md:hidden items-center">
        <a target="_blank" rel="noopener noreferrer" :href="githubRepo">
          <GithubIcon class="size-7" />
        </a>
        <a>
          <MenuIcon class="size-7" />
        </a>
      </div>

      <nav class="hidden md:flex" v-if="router.path !== '/dashboard'">
        <RouterLink
          to="/"
          exact-active-class="after:w-full "
          class="relative flex items-center justify-center px-7 border-white/20 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
        >
          login.
        </RouterLink>

        <RouterLink
          to="/dashboard"
          exact-active-class="after:w-full "
          class="relative flex items-center justify-center px-7 border-r border-white/20 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-white after:transition-all after:duration-300 hover:bg-[#0c0a09]"
        >
          changelogs.
        </RouterLink>
        <a
          :href="githubRepo"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center justify-center px-4 bg-white/10 hover:bg-black"
        >
          <GithubIcon class="size-7" />
        </a>
      </nav>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { githubRepo } from '@/utils/const';
import GithubIcon from './icons/GithubIcon.vue';
import HextechIcon from './icons/HextechIcon.vue';
import MenuIcon from './icons/MenuIcon.vue';
import { RouterLink, useRoute } from 'vue-router';

const router = useRoute();
</script>

<style scoped></style>
