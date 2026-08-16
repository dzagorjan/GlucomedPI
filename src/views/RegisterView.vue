<script setup>
import { ref } from 'vue'

import AuthLayout from '@/layouts/AuthLayout.vue'

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const role = ref('patient')

function handleRegister() {
  console.log('Registracija:', {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
    role: role.value,
  })
}
</script>


<template>
    <AuthLayout>
        <form
      class="flex flex-col gap-5"
      @submit.prevent="handleRegister"
    >
      <div>
        <h1 class="text-2xl font-bold text-gray-800">
          Registracija
        </h1>

        <p class="mt-1 text-sm text-gray-500">
          Kreirajte novi GlucoMed račun.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div class="flex flex-col gap-2">
          <label
            for="firstName"
            class="text-sm font-medium text-gray-700"
          >
            Ime
          </label>

          <input
            id="firstName"
            v-model="firstName"
            type="text"
            required
            class="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
          />
        </div>
                <div class="flex flex-col gap-2">
          <label
            for="lastName"
            class="text-sm font-medium text-gray-700"
          >
            Prezime
          </label>

          <input
            id="lastName"
            v-model="lastName"
            type="text"
            required
            class="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
          />
        </div>
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
          required
          class="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
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
          required
          class="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
        />
      </div>
            <div class="flex flex-col gap-2">
        <label
          for="confirmPassword"
          class="text-sm font-medium text-gray-700"
        >
          Potvrdi lozinku
        </label>

        <input
          id="confirmPassword"
          v-model="confirmPassword"
          type="password"
          required
          class="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
        />
      </div>
      <div class="flex flex-col gap-2">
        <label
          for="role"
          class="text-sm font-medium text-gray-700"
        >
          Uloga
        </label>

        <select
          id="role"
          v-model="role"
          class="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
        >
          <option value="patient">
            Pacijent
          </option>

          <option value="doctor">
            Liječnik
          </option>
        </select>
      </div>
      <button
        type="submit"
        class="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
      >
        Registriraj se
      </button>

      <p class="text-center text-sm text-gray-600">
        Već imate račun?

        <RouterLink
          to="/login"
          class="font-medium text-blue-600 hover:text-blue-700"
        >
          Prijavite se
        </RouterLink>
      </p>
    </form>

    </AuthLayout>

</template>