<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

import AuthLayout from '@/layouts/AuthLayout.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const {
  loading,
  error,
} = storeToRefs(authStore)

const email = ref('')
const password = ref('')

async function handleLogin() {
  authStore.clearError()

  try {
    await authStore.loginUser(
      email.value,
      password.value,
    )

    router.push('/dashboard')
  } catch {
    // Poruka se prikazuje preko authStore.error.
  }
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

      <div
        v-if="error"
        class="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
      >
        {{ error }}
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

      <BaseButton 
        type="submit"
        :disabled="loading"
      >
        {{ loading ? 'Prijava...' : 'Prijavi se' }} 
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