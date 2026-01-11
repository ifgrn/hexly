<script lang="ts" setup>
import type { Account } from '@/types/types';
import KeyIcon from '../icons/KeyIcon.vue';
import EyeKey from '../icons/EyeKey.vue';
import CopyIcon from '../icons/CopyIcon.vue';

const props = defineProps<{
  account: Account;
}>();

const calculateWinRate = (wins: number, losses: number) => {
  const totalGames = wins + losses;
  const winrate = ((wins / totalGames) * 100).toFixed(1);
  return winrate;
};

const winRatio = calculateWinRate(props.account.wins, props.account.losses);
</script>

<template>
  <article
    :data-id="account.id"
    class="bg-black w-70 sm:w-100 flex flex-col border border-white/20"
  >
    <!-- HEADER -->
    <div class="flex p-3 md:p-4 gap-3">
      <img
        src="https://static.bigbrain.gg/assets/lol/riot_static/16.1.1/img/profileicon/6512.png"
        alt="account-icon"
        class="size-12 md:size-15 rounded-full"
      />

      <div class="flex flex-col">
        <h2 class="text-lg md:text-2xl font-semibold leading-tight">
          {{ account.nickname }}
        </h2>
        <span class="opacity-80 text-sm md:text-base"> #{{ account.tagline }} </span>
      </div>

      <div class="flex flex-col gap-2 flex-1">
        <button class="mt-1 hover:cursor-pointer scale-90 md:scale-100">
          <CopyIcon />
        </button>
        <p class="text-yellow-100 ml-auto text-xs md:text-sm">
          {{ account.server }}
        </p>
      </div>
    </div>

    <!-- PASSWORD -->
    <div
      class="flex justify-between bg-[#101011] px-3 md:px-4 py-2 border-t border-b border-white/20 text-white/70"
    >
      <div class="flex gap-2 items-center text-sm">
        <KeyIcon class="scale-90 md:scale-100" />
        <p>********</p>
      </div>

      <button class="flex items-center gap-1 text-sm hover:cursor-pointer">
        <p>Reveal</p>
        <EyeKey class="scale-90 md:scale-100" />
      </button>
    </div>

    <!-- STATS -->
    <div class="flex justify-between items-center p-3 md:p-4">
      <div>
        <p class="text-xs opacity-55">RANK TIER</p>
        <p class="font-medium text-sm md:text-base">{{ account.tier }} {{ account.rank }}</p>
      </div>

      <div>
        <p class="text-xs opacity-55">WIN RATE</p>
        <p class="font-medium text-sm md:text-base text-[#70e000]">{{ winRatio }} %</p>
      </div>
    </div>
  </article>
</template>

<style scoped></style>
