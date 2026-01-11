<script lang="ts" setup>
import DownArrow from '../icons/DownArrow.vue'
import SettingsICon from '../icons/SettingsICon.vue'
import SignOut from '../icons/SignOut.vue'

const props = defineProps<{
  username: string
}>()

const emit = defineEmits<{
  (e: 'signout'): void
  (e: 'settings'): void
}>()
</script>

<template>
  <div>
    <button
      popovertarget="user-menu"
      class="flex items-center gap-3 border rounded-none p-3 border-white/20 w-50 btn bg-black"
    >
      <div class="user-icon"></div>
      <div class="flex items-center justify-between w-full">
        <p>{{ props.username }}</p>
        <DownArrow />
      </div>
    </button>
    <div popover id="user-menu" class="menu">
      <button
        @click="emit('settings')"
        class="hover:bg-white/20 w-full px-2 py-0.5 text-start flex gap-2 items-center"
        popovertargetaction="hide"
      >
        <SettingsICon />Settings
      </button>
      <button
        @click="emit('signout')"
        popovertargetaction="hide"
        class="hover:bg-white/20 w-full px-2 py-0.5 text-start flex gap-2 items-center"
      >
        <SignOut />Sign Out
      </button>
    </div>
  </div>
</template>

<style scoped>
.btn {
  anchor-name: --user-btn;
}

.menu {
  position: absolute;
  inset: auto;
  top: anchor(--user-btn bottom);
  left: anchor(--user-btn left);
  margin-top: 0.2rem;
  color: white;
  min-width: 160px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background-color: black;
  z-index: 50;
}

.menu:popover-open {
  animation: fadeIn 150ms ease-out;
  background-color: black;
  display: flex;
  flex-direction: column;
  padding: 4px;
  gap: 0.3rem;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.user-icon {
  background:
    radial-gradient(
      circle at 30% 30%,
      hsla(0, 0%, 100%, 0.35) 0%,
      hsla(0, 0%, 100%, 0.15) 18%,
      transparent 40%
    ),
    linear-gradient(135deg, hsla(339, 100%, 60%, 1) 0%, hsla(197, 100%, 65%, 1) 100%);

  aspect-ratio: 1/1;
  width: 24px;
  height: 24px;
  border-radius: 50%;
}
</style>
