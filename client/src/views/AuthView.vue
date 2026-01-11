<template>
  <section class="grid place-items-center mt-8 mx-auto md:mt-20">
    <div>
      <ToggleTab v-model="authMethod" />
      <AuthForm
        ref="authFormRef"
        :title="authMethod === 'login' ? 'Sign In' : 'Sign Up'"
        :description="authMethod === 'login' ? signInMsg : signUpMsg"
        :inputs="FormInputs"
        :submit-button-text="authMethod === 'login' ? 'Login' : 'Create an Account'"
        :show-forgot-password="authMethod === 'login'"
        @submit="handleSubmit"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
import AuthForm from '@/components/AuthForm.vue';
import ToggleTab from '@/components/ToggleTab.vue';
import { loginHandler, signUpHandler } from '@/service/auth-service';
import { LoginInputs, registerInputs } from '@/utils/form-consts';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const signInMsg = 'Enter your email below to login to your account';
const signUpMsg = 'Enter your information to create an account';

const authMethod = ref<'login' | 'register'>('login');
const authFormRef = ref<InstanceType<typeof AuthForm> | null>(null);

const FormInputs = computed(() => (authMethod.value === 'login' ? LoginInputs : registerInputs));

async function handleSubmit(formData: FormData) {
  try {
    const result =
      authMethod.value === 'login' ? await loginHandler(formData) : await signUpHandler(formData);

    console.log(result);

    if (result.success) {
      authFormRef.value?.resetForm();
      router.push(
        authMethod.value === 'login' || authMethod.value === 'register' ? '/dashboard' : '/',
      );
    }

    return result;
  } catch (error) {
    console.error(error);
  }
}
</script>
