<script setup>
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

async function handleLogout() {
  try {
    await authStore.logoutUser()

    router.push('/login')
  } catch {
    //
  }
}
</script>


<template>
  <header
    class="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6"
  >
    <RouterLink
      to="/"
      class="text-xl font-bold text-blue-600"
    >
      GlucoMed
    </RouterLink>

    <div class="flex items-center gap-4">
      <div class="text-right">
        <p class="text-sm font-medium text-gray-700">
          {{ authStore.fullName || 'Korisnik' }}
        </p>

        <p
          v-if="authStore.userProfile"
          class="text-xs text-gray-500"
        >
          {{
            authStore.isDoctor
              ? 'Liječnik'
              : 'Pacijent'
          }}
        </p>
      </div>

      <div
        class="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600"
      >
        {{
          authStore.userProfile
            ? `${authStore.userProfile.firstName?.charAt(0) || ''}${authStore.userProfile.lastName?.charAt(0) || ''}`
            : 'GM'
        }}
      </div>
      <button
        v-if="authStore.isAuthenticated"
        type="button"
        class="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        @click="handleLogout"
      >
        Odjava
      </button>
    </div>
  </header>
</template>