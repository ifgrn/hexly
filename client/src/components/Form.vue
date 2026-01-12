<template>
  <form ref="authForm" @submit.prevent="handleSubmit" class="flex flex-col gap-6" novalidate>
    <div v-for="input in inputs" :key="input.id" class="flex flex-col gap-2">
      <label :for="input.id" class="text-white text-sm font-medium">
        {{ input.label }}
      </label>
      <div class="flex flex-col">
        <input
          :id="input.id"
          :name="input.name"
          :type="input.type"
          :placeholder="input.placeholder"
          :required="input.required"
          :aria-label="input.label"
          v-model="formValues[input.id]"
          @input="validateField(input)"
          @blur="validateField(input)"
          :class="[
            'p-3 border rounded-none border-white/50 bg-transparent text-white placeholder:text-white/40 focus:outline-none transition-colors',
            errors[input.id] ? 'border-red-500 focus:border-red-500' : 'focus:border-white',
          ]"
        />
        <Transition name="slide-fade">
          <span v-if="errors[input.id]" class="text-red-500 text-xs mt-1">
            {{ errors[input.id] }}
          </span>
        </Transition>
      </div>
    </div>

    <button
      v-if="showForgotPassword"
      type="button"
      class="text-sm opacity-70 underline hover:opacity-100 text-white text-left"
    >
      Forgot your password?
    </button>

    <slot name="actions" :isSubmitting="isSubmitting" :hasErrors="hasErrors">
      <button
        type="submit"
        :disabled="isSubmitting || hasErrors"
        class="border rounded-none bg-white text-black p-3 font-medium hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ isSubmitting ? 'Loading...' : submitButtonText }}
      </button>
    </slot>
  </form>
</template>

<script lang="ts" setup>
import type { FormInput } from '@/types/types'
import { computed, reactive, ref, watch } from 'vue'

const emit = defineEmits<{
  submit: [formData: FormData]
}>()

const props = defineProps<{
  inputs: FormInput[]
  submitButtonText: string
  showForgotPassword?: boolean
}>()

const formValues = reactive<Record<string, string>>({})
const errors = reactive<Record<string, string>>({})
const authForm = ref<HTMLFormElement | null>(null)
const isSubmitting = ref(false)

const hasErrors = computed(() => {
  return (
    Object.values(errors).some((error) => !!error) ||
    props.inputs.some((input) => input.required && !formValues[input.id])
  )
})

watch(
  () => props.inputs,
  (newInputs) => {
    Object.keys(formValues).forEach((key) => delete formValues[key])
    Object.keys(errors).forEach((key) => delete errors[key])
    newInputs.forEach((input) => {
      formValues[input.id] = ''
    })
  },
  { immediate: true },
)

function validateField(input: FormInput) {
  const value = formValues[input.id]
  errors[input.id] = ''

  if (input.required && !value) {
    errors[input.id] = `${input.label} is required`
    return
  }

  if (value) {
    if (input.minLength && value.length < input.minLength) {
      errors[input.id] = input.errorMessage || `Must be at least ${input.minLength} characters`
      return
    }

    if (input.pattern) {
      const regex = new RegExp(input.pattern)
      if (!regex.test(value)) {
        errors[input.id] = input.errorMessage || 'Invalid format'
        return
      }
    }

    // Additional check for confirm password if it exists
    if (input.id === 'confirm-password') {
      const password = formValues['password']
      if (password && value !== password) {
        errors[input.id] = 'Passwords do not match'
      }
    }
  }
}

function handleSubmit() {
  if (!authForm.value || isSubmitting.value || hasErrors.value) return

  // Final validation check before submission
  let isValid = true
  props.inputs.forEach((input) => {
    validateField(input)
    if (errors[input.id]) isValid = false
  })

  if (!isValid) return

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
      errors[input.id] = ''
    })
    authForm.value?.reset()
  },
})
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
