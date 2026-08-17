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

const patientStatistics = {
  averageGlucose: '6.8 mmol/L',
  measurementsToday: 4,
  targetRange: '4.0 - 10.0',
}

const latestGlucoseValue = computed(() => {
  if (!latestReading.value) {
    return 'Nema podataka'
  }

  return `${latestReading.value.value} ${latestReading.value.unit}`
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
          {{ authStore.fullName || 'korisniče' }}.
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
            title="Prosjek 7 dana"
            :value="patientStatistics.averageGlucose"
            description="Prosječna vrijednost"
          />

          <StatisticCard
            title="Mjerenja danas"
            :value="patientStatistics.measurementsToday"
            description="Ukupno mjerenja"
          />

          <StatisticCard
            title="Ciljani raspon"
            :value="patientStatistics.targetRange"
            description="mmol/L"
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
            Ovdje će se prikazivati pregled vaših
            pacijenata i njihovih mjerenja.
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