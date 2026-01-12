<script lang="ts" setup>
import Form from '@/components/Form.vue'
import type { FormInput } from '@/types/types'
import { ref } from 'vue'
import PlusIcon from '../icons/PlusIcon.vue'

const emit = defineEmits<{
  (e: 'submit', formData: FormData): void
}>()

defineProps<{
  inputs: FormInput[]
}>()

const dialogRef = ref<HTMLDialogElement | null>(null)
const FormRef = ref<InstanceType<typeof Form> | null>(null)

const openModal = () => {
  dialogRef.value?.showModal()
}

const closeModal = () => {
  FormRef.value?.resetForm()
  dialogRef.value?.close('cancel')
}

const handleSubmit = (formData: FormData) => {
  emit('submit', formData)
}

defineExpose({
  resetForm: closeModal,
})
</script>

<template>
  <button
    @click="openModal"
    class="flex items-center gap-2 border border-white/20 p-3 uppercase bg-black hover:bg-white/5 transition-colors cursor-pointer"
  >
    <PlusIcon />
    Link an account
  </button>

  <!-- Dialog -->
  <dialog ref="dialogRef" class="p-0 bg-transparent border-none" @cancel.prevent="closeModal">
    <!-- Backdrop -->
    <div
      class="fixed inset-0 bg-black/60 flex backdrop-blur-xs items-center justify-center transition-all"
      @click.self="closeModal"
    >
      <!-- Modal box -->
      <div class="border border-white/20 w-85.5 md:w-100 p-6 bg-[#0c0a09] flex flex-col gap-6">
        <Form ref="FormRef" :inputs="inputs" submit-button-text="Add" @submit="handleSubmit">
          <template #actions="{ isSubmitting, hasErrors }">
            <div class="flex gap-3">
              <button
                type="submit"
                :disabled="isSubmitting || hasErrors"
                class="flex-1 bg-white text-black p-3 font-medium disabled:opacity-50 hover:bg-white/90 transition-colors"
              >
                {{ isSubmitting ? 'Loading...' : 'Add' }}
              </button>

              <button
                type="button"
                :disabled="isSubmitting"
                @click="closeModal"
                class="flex-1 border border-white/20 p-3 text-white disabled:opacity-50 hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
            </div>
          </template>
        </Form>
      </div>
    </div>
  </dialog>
</template>
