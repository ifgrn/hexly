<script lang="ts" setup>
import AccountCard from '@/components/dashboard/AccountCard.vue';
import AddAccountBtn from '@/components/dashboard/AddAccountBtn.vue';
import UserMenu from '@/components/dashboard/UserMenu.vue';
import { addAccountService } from '@/service/accounts-service';
import { signoutHandler } from '@/service/auth-service';
import { noir } from '@/utils/const';
import { addAccountInputs } from '@/utils/form-consts';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const AccForm = ref<InstanceType<typeof AddAccountBtn> | null>(null);

const signOutAction = async () => {
  try {
    const isLogOut = await signoutHandler();
    if (isLogOut.success) router.push('/');
    else return;
  } catch (error) {
    console.log(error);
  }
};

const addAcctounAction = async (formData: FormData) => {
  try {
    const response = await addAccountService(formData);

    if (response?.success) {
      AccForm.value?.resetForm(); // 🔥 cierra modal
      console.log(response);
    }

    return response;
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <section class="flex flex-col mx-auto mt-5 sm:mt-10 gap-4 w-100 sm:w-300">
    <div class="flex justify-between">
      <UserMenu username="noir" @signout="signOutAction" />
      <AddAccountBtn ref="AccForm" :inputs="addAccountInputs" @submit="addAcctounAction" />
    </div>
    <div>
      <AccountCard :account="noir" />
    </div>
  </section>
</template>
<style scoped></style>
