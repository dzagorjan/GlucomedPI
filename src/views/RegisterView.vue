<script setup>
import { ref } from 'vue'

import AuthLayout from '@/layouts/AuthLayout.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseInput from '@/components/common/BaseInput.vue'

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

            <BaseInput
            v-model="firstName"
            label="Ime"
            placeholder="Ime"
            required
            />

            <BaseInput
            v-model="lastName"
            label="Prezime"
            placeholder="Prezime"
            required
            />

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

        <BaseInput
            v-model="confirmPassword"
            label="Potvrdi lozinku"
            type="password"
            placeholder="Ponovno unesite lozinku"
            required
        />
   
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

        <BaseButton type="submit">
            Registriraj se
        </BaseButton>

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