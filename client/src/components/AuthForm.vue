<template>
  <div
    class="border rounded-none border-white/20 w-85.5 p-6 flex flex-col gap-6 md:w-100 bg-[#0c0a09]"
  >
    <div class="flex flex-col gap-2">
      <h3 class="text-2xl font-semibold text-white">
        {{ title }}
      </h3>
      <p class="text-sm opacity-70 text-white">
        {{ description }}
      </p>
    </div>

    <form ref="authForm" @submit.prevent="handleSubmit" class="flex flex-col gap-6">
      <div v-for="input in inputs" :key="input.id" class="flex flex-col gap-2">
        <label :for="input.id" class="text-white text-sm font-medium">
          {{ input.label }}
        </label>
        <input
          :id="input.id"
          :name="input.name"
          :type="input.type"
          :placeholder="input.placeholder"
          :required="input.required"
          :aria-label="input.label"
          v-model="formValues[input.id]"
          class="p-3 border rounded-none border-white/50 bg-transparent text-white placeholder:text-white/40 focus:border-white focus:outline-none transition-colors"
        />
      </div>

      <button
        v-if="showForgotPassword"
        type="button"
        class="text-sm opacity-70 underline hover:opacity-100 text-white text-left"
      >
        Forgot your password?
      </button>

      <button
        type="submit"
        :disabled="isSubmitting"
        class="border rounded-none bg-white text-black p-3 font-medium hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ isSubmitting ? 'Loading...' : submitButtonText }}
      </button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import type { FormInput } from '@/types/types'
import { reactive, ref, watch } from 'vue'

const emit = defineEmits<{
  submit: [formData: FormData]
}>()

const props = defineProps<{
  title: string
  description: string
  inputs: FormInput[]
  submitButtonText: string
  showForgotPassword?: boolean
}>()

const formValues = reactive<Record<string, string>>({})
const authForm = ref<HTMLFormElement | null>(null)
const isSubmitting = ref(false)

watch(
  () => props.inputs,
  (newInputs) => {
    Object.keys(formValues).forEach((key) => delete formValues[key])
    newInputs.forEach((input) => {
      formValues[input.id] = ''
    })
  },
  { immediate: true },
)

function handleSubmit() {
  if (!authForm.value || isSubmitting.value) return

  const formData = new FormData(authForm.value)
  isSubmitting.value = true

  emit('submit', formData)

  setTimeout(() => {
    isSubmitting.value = false
  }, 500)
}

defineExpose({
  resetForm: () => {
    props.inputs.forEach((input) => {
      formValues[input.id] = ''
    })
    authForm.value?.reset()
  },
})
</script>

<style scoped></style>
