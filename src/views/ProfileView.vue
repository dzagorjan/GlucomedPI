<script setup>
import DashboardLayout from '@/layouts/DashboardLayout.vue'

import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()

function getRoleName(role) {
  if (role === 'patient') {
    return 'Pacijent'
  }

  if (role === 'doctor') {
    return 'Liječnik'
  }

  return role
}
</script>

<template>
  <DashboardLayout>
    <div class="max-w-2xl">
      <h1 class="text-2xl font-bold text-gray-800">
        Moj profil
      </h1>

      <p class="mt-1 text-gray-500">
        Pregled podataka korisničkog računa.
      </p>

      <div
        v-if="authStore.userProfile"
        class="mt-6 rounded-lg bg-white p-6"
      >
        <h2 class="mb-5 text-lg font-semibold text-gray-800">
          Osobni podaci
        </h2>

        <div class="flex flex-col gap-4">
          <div>
            <p class="text-sm text-gray-500">
              Ime
            </p>

            <p class="font-medium">
              {{ authStore.userProfile.firstName }}
            </p>
          </div>

          <div>
            <p class="text-sm text-gray-500">
              Prezime
            </p>

            <p class="font-medium">
              {{ authStore.userProfile.lastName }}
            </p>
          </div>

          <div>
            <p class="text-sm text-gray-500">
              Email
            </p>

            <p class="font-medium">
              {{ authStore.userProfile.email }}
            </p>
          </div>

          <div>
            <p class="text-sm text-gray-500">
              Uloga
            </p>

            <p class="font-medium">
              {{ getRoleName(authStore.userProfile.role) }}
            </p>
          </div>
        </div>
      </div>

      <div
        v-else
        class="mt-6 rounded-lg bg-white p-6"
      >
        <p class="text-gray-500">
          Podaci korisnika nisu dostupni.
        </p>
      </div>
    </div>
  </DashboardLayout>
</template>