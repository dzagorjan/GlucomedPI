<script setup>
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import StatisticCard from '@/components/dashboard/StatisticCard.vue'
import RecentMeasurements from '@/components/dashboard/RecentMeasurements.vue'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()

// privremeni podaci
const patientStatistics = {
  lastGlucose: '6.4 mmol/L',
  averageGlucose: '6.8 mmol/L',
  measurementsToday: 4,
  targetRange: '4.0 - 10.0',
}
// demo podaci
const recentMeasurements = [
  {
    id: 1,
    value: 6.4,
    unit: 'mmol/L',
    measuredAt: 'Danas, 08:15',
    measurementType: 'Prije doručka',
  },
  {
    id: 2,
    value: 8.2,
    unit: 'mmol/L',
    measuredAt: 'Jučer, 19:30',
    measurementType: 'Nakon večere',
  },
  {
    id: 3,
    value: 3.7,
    unit: 'mmol/L',
    measuredAt: 'Jučer, 15:10',
    measurementType: 'Nakon aktivnosti',
  },
  {
    id: 4,
    value: 11.3,
    unit: 'mmol/L',
    measuredAt: 'Jučer, 12:45',
    measurementType: 'Nakon ručka',
  },
]
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
            :value="patientStatistics.lastGlucose"
            description="U ciljanom rasponu"
            status="success"
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

        <RecentMeasurements
          :measurements="recentMeasurements"
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