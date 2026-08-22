<script setup>
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import DashboardLayout from '@/layouts/DashboardLayout.vue'
import StatisticCard from '@/components/dashboard/StatisticCard.vue'
import RecentMeasurements from '@/components/dashboard/RecentMeasurements.vue'

import { useAuthStore } from '@/stores/authStore'
import { useGlucoseStore } from '@/stores/glucoseStore'

const authStore = useAuthStore()
const glucoseStore = useGlucoseStore()

const {
  sortedReadings,
  latestReading,
} = storeToRefs(glucoseStore)

const latestGlucoseValue = computed(() => {
  if (!latestReading.value) {
    return 'Nema podataka'
  }

  return `${latestReading.value.value} ${latestReading.value.unit}`
})

const averageGlucose = computed(() => {
  if (sortedReadings.value.length === 0) {
    return 'Nema podataka'
  }

  const total = sortedReadings.value.reduce(
    (sum, reading) => sum + Number(reading.value),
    0,
  )

  const average =
    total / sortedReadings.value.length

  return `${average.toFixed(1)} mmol/L`
})

const measurementsToday = computed(() => {
  const today = new Date()

  return sortedReadings.value.filter((reading) => {
    const date = reading.measuredAtDate

    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }).length
})

const totalMeasurements = computed(() => {
  return sortedReadings.value.length
})

onMounted(async () => {
  if (
    authStore.isPatient &&
    authStore.user
  ) {
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
        <h1 class="text-3xl font-bold text-gray-800">
          Nadzorna ploča
        </h1>

        <p class="mt-2 text-gray-500">
          Dobrodošli,
          {{ authStore.fullName || 'korisnik' }}.
        </p>
      </div>

      <!-- Nadzrona ploča - za pacijenta -->
      <template v-if="authStore.isPatient">
        <div>
          <h2 class="text-lg font-semibold text-gray-800">
            Pregled glukoze
          </h2>

          <p class="mt-1 text-sm text-gray-500">
            Kratki pregled vaših posljednjih mjerenja.
          </p>
        </div>

        <div
          class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          <StatisticCard
            title="Zadnja glukoza"
            :value="latestGlucoseValue"
            :description="
              latestReading
                ? 'Posljednje evidentirano mjerenje'
                : 'Još nema evidentiranih mjerenja'
            "
            :status="
              latestReading
                ? 'success'
                : 'default'
            "
          />

          <StatisticCard
            title="Prosječna glukoza"
            :value="averageGlucose"
            description="Prosjek svih mjerenja"
          />

          <StatisticCard
            title="Mjerenja danas"
            :value="measurementsToday"
            description="Broj današnjih mjerenja"
          />

          <StatisticCard
            title="Ukupno mjerenja"
            :value="totalMeasurements"
            description="Sva evidentirana mjerenja"
          />
        </div>

        <div
          v-if="glucoseStore.error"
          class="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          {{ glucoseStore.error }}
        </div>

        <div
          v-if="glucoseStore.loading"
          class="rounded-xl border border-gray-200 bg-white p-8 text-center"
        >
          <p class="text-sm text-gray-500">
            Učitavanje mjerenja...
          </p>
        </div>

        <RecentMeasurements
          v-else
          :measurements="sortedReadings.slice(0, 5)"
        />

        <div
          class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
        >
          <div
            class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <h2 class="text-lg font-semibold text-gray-800">
                Brze radnje
              </h2>

              <p class="mt-1 text-sm text-gray-500">
                Brzi pristup najčešćim funkcijama.
              </p>
            </div>

            <RouterLink
              to="/glucose"
              class="rounded-lg bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-blue-700"
            >
              Pregledaj mjerenja
            </RouterLink>
          </div>
        </div>
      </template>

      <!-- Nadzorna ploča - za liječnika -->
      <template v-else-if="authStore.isDoctor">
        <div
          class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
        >
          <h2 class="text-lg font-semibold text-gray-800">
            Liječnička nadzorna ploča
          </h2>

          <p class="mt-2 text-sm text-gray-500">
            Pregled pacijenata
          </p>

          <RouterLink
            to="/patients"
            class="mt-5 inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Pregledaj pacijente
          </RouterLink>
        </div>
      </template>
    </div>
  </DashboardLayout>
</template>