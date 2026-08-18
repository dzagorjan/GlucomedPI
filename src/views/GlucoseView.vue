<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import DashboardLayout from '@/layouts/DashboardLayout.vue'

import { useAuthStore } from '@/stores/authStore'
import { useGlucoseStore } from '@/stores/glucoseStore'

import { formatDateTime } from '@/utils/dateUtils'

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

function getMeasurementType(type) {
  const types = {
    before_meal: 'Prije obroka',
    after_meal: 'Nakon obroka',
    before_sleep: 'Prije spavanja',
    after_activity: 'Nakon aktivnosti',
    other: 'Ostalo',
  }

  return types[type] || type
}

function getStatus(value) {
  if (value < 4) {
    return 'Niska'
  }

  if (value > 10) {
    return 'Visoka'
  }

  return 'U rasponu'
}

async function deleteReading(readingId) {
  const confirmed = confirm(
    'Želite li obrisati ovo mjerenje?',
  )

  if (!confirmed) {
    return
  }

  await glucoseStore.deleteReading(
    readingId,
    authStore.user.uid,
  )
}

</script>

<template>
  <DashboardLayout>
    <div class="flex flex-col gap-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-800">
            Mjerenja glukoze
          </h1>

          <p class="mt-1 text-gray-500">
            Pregled evidentiranih mjerenja glukoze.
          </p>
        </div>

        <RouterLink
          to="/glucose/add"
          class="rounded-lg bg-blue-600 px-4 py-2 text-white"
        >
          Dodaj mjerenje
        </RouterLink>
      </div>

      <div
        v-if="glucoseStore.error"
        class="rounded bg-red-100 p-3 text-red-700"
      >
        {{ glucoseStore.error }}
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
          Trenutno nema evidentiranih mjerenja.
        </p>
      </div>

      <div
        v-else
        class="overflow-x-auto rounded-lg bg-white"
      >
        <table class="w-full text-left">
          <thead class="border-b bg-gray-50">
            <tr>
              <th class="p-4">
                Vrijednost
              </th>

              <th class="p-4">
                Datum i vrijeme
              </th>

              <th class="p-4">
                Kontekst
              </th>

              <th class="p-4">
                Status
              </th>

              <th class="p-4">
                Napomena
              </th>

              <th class="p-4">
                Akcije
              </th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="reading in sortedReadings"
              :key="reading.id"
              class="border-b"
            >
              <td class="p-4 font-medium">
                {{ reading.value }}
                {{ reading.unit }}
              </td>

              <td class="p-4">
                {{
                  formatDateTime(
                    reading.measuredAtDate,
                  )
                }}
              </td>

              <td class="p-4">
                {{
                  getMeasurementType(
                    reading.measurementType,
                  )
                }}
              </td>

              <td class="p-4">
                <span
                  class="rounded px-2 py-1 text-sm"
                  :class="{
                    'bg-green-100 text-green-700':
                      getStatus(reading.value) === 'U rasponu',

                    'bg-yellow-100 text-yellow-700':
                      getStatus(reading.value) === 'Niska',

                    'bg-red-100 text-red-700':
                      getStatus(reading.value) === 'Visoka',
                  }"
                >
                  {{ getStatus(reading.value) }}
                </span>
              </td>

              <td class="p-4">
                {{ reading.note || '-' }}
              </td>

              <td class="p-4">
                <button
                  type="button"
                  class="rounded bg-red-500 px-3 py-1 text-sm text-white"
                  @click="deleteReading(reading.id)"
                >
                  Obriši
                </button>
              </td>

            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </DashboardLayout>
</template>