<script setup>
import { ref } from 'vue'

import AuthLayout from '@/layouts/AuthLayout.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseInput from '@/components/common/BaseInput.vue'


const email = ref('')
const password = ref('')

function handleLogin() {
    console.log('Login pokušaj:',{
        email: email.value,
        password: password.value,
    })
}
</script>


<template>
    <AuthLayout>
      <form
        class="flex flex-col gap-5"
        @submit.prevent="handleLogin"
      >
        <div>
          <h1 class="text-2xl font-bold text-gray-800">
            Prijava
          </h1>

          <p class="mt-1 text-sm text-gray-500">
            Prijavite se u svoj GlucoMed račun.
          </p>
        </div>

        <BaseInput
          v-model="email"
          label="Email"
          type="email"
          placeholder="ime@example.com"
          required
        />

        <BaseInput
          v-model="password"
          label="Lozinka"
          type="password"
          placeholder="Unesite lozinku"
          required
        />

        <BaseButton type="submit">
          Prijavi se 
        </BaseButton>

        <p class="text-center text-sm text-gray-600">
          Nemate račun?

          <RouterLink
            to="/register"
            class="font-medium text-blue-600 hover:text-blue-700"
          >
            Registrirajte se
          </RouterLink>
        </p>
      </form>
    </AuthLayout>
</template>