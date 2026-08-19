<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import DashboardLayout from '@/layouts/DashboardLayout.vue'
import GlucoseChart from '@/components/glucose/GlucoseChart.vue'

import { useAuthStore } from '@/stores/authStore'
import { useGlucoseStore } from '@/stores/glucoseStore'

const authStore = useAuthStore()
const glucoseStore = useGlucoseStore()

const {
  sortedReadings,
} = storeToRefs(glucoseStore)

onMounted(async () => {
  if (authStore.user) {
    await glucoseStore.fetchReadings(
      authStore.user.uid,
    )
  }
})

</script>

<template>
  <DashboardLayout>
    <div class="flex flex-col gap-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">
          Statistika
        </h1>

        <p class="mt-1 text-gray-500">
          Graf vrijednosti glukoze kroz vrijeme.
        </p>
      </div>

      <div
        v-if="glucoseStore.loading"
        class="rounded-lg bg-white p-6"
      >
        Učitavanje podataka...
      </div>

      <div
        v-else-if="sortedReadings.length === 0"
        class="rounded-lg bg-white p-6"
      >
        <p class="text-gray-500">
          Nema dovoljno podataka za prikaz grafa.
        </p>
      </div>

      <div
        v-else
        class="rounded-lg bg-white p-6"
      >
        <h2 class="mb-4 text-lg font-semibold">
          Kretanje glukoze
        </h2>

        <GlucoseChart
          :readings="sortedReadings"
        />
      </div>
    </div>
  </DashboardLayout>
</template>