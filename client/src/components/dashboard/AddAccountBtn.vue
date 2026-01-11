<script lang="ts" setup>
import { reactive, ref } from 'vue';
import PlusIcon from '../icons/PlusIcon.vue';
import type { FormInput } from '@/types/types';

const emit = defineEmits<{
  (e: 'submit', formData: FormData): void;
}>();

defineProps<{
  inputs: FormInput[];
}>();

const dialogRef = ref<HTMLDialogElement | null>(null);
const formRef = ref<HTMLFormElement | null>(null);
const isSubmitting = ref(false);

// Solo si necesitas validaciones en vivo
const formValues = reactive<Record<string, string>>({});

const openModal = () => {
  dialogRef.value?.showModal();
};

const closeModal = () => {
  formRef.value?.reset();
  dialogRef.value?.close('cancel');
};

const handleSubmit = () => {
  if (!formRef.value || isSubmitting.value) return;

  isSubmitting.value = true;
  const formData = new FormData(formRef.value);

  emit('submit', formData);
};

defineExpose({
  resetForm: closeModal,
});
</script>

<template>
  <button @click="openModal" class="flex items-center gap-2 border border-white/20 p-3 uppercase bg-black">
    <PlusIcon />
    Link an account
  </button>

  <!-- Dialog -->
  <dialog ref="dialogRef" class="p-0 bg-transparent border-none" @cancel.prevent="closeModal">
    <!-- Backdrop -->
    <div class="fixed inset-0 bg-black/60 flex items-center justify-center" @click.self="closeModal">
      <!-- Modal box -->
      <div class="border border-white/20 w-85.5 md:w-100 p-6 bg-[#0c0a09] flex flex-col gap-6">
        <form ref="formRef" @submit.prevent="handleSubmit" class="flex flex-col gap-6">
          <div v-for="input in inputs" :key="input.id" class="flex flex-col gap-2">
            <label :for="input.id" class="text-white text-sm font-medium">
              {{ input.label }}
            </label>

            <input :id="input.id" :name="input.name" :type="input.type" :placeholder="input.placeholder"
              :required="input.required" v-model="formValues[input.id]"
              class="p-3 border border-white/50 bg-transparent text-white placeholder:text-white/40 focus:border-white focus:outline-none" />
          </div>

          <div class="flex gap-3">
            <button type="submit" :disabled="isSubmitting"
              class="flex-1 bg-white text-black p-3 font-medium disabled:opacity-50">
              {{ isSubmitting ? 'Loading...' : 'Add' }}
            </button>

            <button type="button" :disabled="isSubmitting" @click="closeModal"
              class="flex-1 border border-white/20 p-3 text-white disabled:opacity-50">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </dialog>
</template>
