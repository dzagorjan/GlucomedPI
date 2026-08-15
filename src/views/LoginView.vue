<script setup>
import { ref } from 'vue'

import AuthLayout from '@/layouts/AuthLayout.vue'

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

      <div class="flex flex-col gap-2">
        <label
          for="email"
          class="text-sm font-medium text-gray-700"
        >
          Email
        </label>

        <input
          id="email"
          v-model="email"
          type="email"
          placeholder="ime@example.com"
          required
          class="rounded-lg border border-gray-300 px-3 py-2 outline-none transition focus:border-blue-500"
        />
      </div>

      <div class="flex flex-col gap-2">
        <label
          for="password"
          class="text-sm font-medium text-gray-700"
        >
          Lozinka
        </label>

        <input
          id="password"
          v-model="password"
          type="password"
          placeholder="Unesite lozinku"
          required
          class="rounded-lg border border-gray-300 px-3 py-2 outline-none transition focus:border-blue-500"
        />
      </div>

      <button
        type="submit"
        class="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
      >
        Prijavi se
      </button>

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