<script setup>
import { storeToRefs } from 'pinia'

import DashboardLayout from '@/layouts/DashboardLayout.vue'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()

const {
  user,
  userProfile,
} = storeToRefs(authStore)

</script>


<template>
  <DashboardLayout>
    <div class="flex flex-col gap-6">
      <div>
        <h1 class="text-3xl font-bold text-gray-800">
          Nadzorna ploča
        </h1>

        <p class="mt-2 text-gray-500">
          Dobrodošli u GlucoMed.
        </p>
      </div>

    
      <div
        class="rounded-xl border border-gray-200 bg-white p-6"
      >
        <h2 class="text-lg font-semibold text-gray-800">
          Status korisnika
        </h2>

        <div class="mt-4 flex items-center gap-3">
          <span
            class="h-3 w-3 rounded-full"
            :class="
              user
                ? 'bg-green-500'
                : 'bg-gray-400'
            "
          />

          <span
            v-if="user"
            class="text-sm text-green-700"
          >
            Korisnik je prijavljen
          </span>

          <span
            v-else
            class="text-sm text-gray-500"
          >
            Korisnik trenutno nije prijavljen
          </span>
        </div>

        <div
          v-if="userProfile"
          class="mt-4 border-t border-gray-100 pt-4"
        >
          <p class="text-sm text-gray-600">
            {{ authStore.fullName }}
          </p>

          <p class="mt-1 text-sm text-gray-500">
            Uloga:
            {{ authStore.isDoctor ? 'Liječnik' : 'Pacijent' }}
          </p>
        </div>
      </div>



      <div
        class="rounded-xl border border-gray-200 bg-white p-6"
      >
        <h2 class="text-lg font-semibold">
          Pregled zdravstvenih podataka
        </h2>

        <p class="mt-2 text-sm text-gray-500">
          Ovdje će se prikazivati vaša mjerenja i statistika.
        </p>
      </div>
    </div>
  </DashboardLayout>
</template>