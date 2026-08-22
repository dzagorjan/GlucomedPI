<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

import DashboardLayout from '@/layouts/DashboardLayout.vue'
import { usePatientStore } from '@/stores/patientStore'
import { formatDateTime } from '@/utils/dateUtils'

const route = useRoute()
const patientStore = usePatientStore()

onMounted(async () => {
  await patientStore.fetchPatientDetails(
    route.params.id,
  )
})

function getMealType(type) {
  const types = {
    breakfast: 'Doručak',
    lunch: 'Ručak',
    dinner: 'Večera',
    snack: 'Međuobrok',
    other: 'Ostalo',
  }

  return types[type] || type
}

function getActivityType(type) {
  const types = {
    walking: 'Hodanje',
    running: 'Trčanje',
    cycling: 'Biciklizam',
    gym: 'Teretana',
    other: 'Ostalo',
  }

  return types[type] || type
}
</script>

<template>
  <DashboardLayout>
    <div class="flex flex-col gap-6">
      <div>
        <RouterLink
          to="/patients"
          class="text-sm text-blue-600"
        >
          ← Natrag na pacijente
        </RouterLink>

        <h1 class="mt-3 text-2xl font-bold text-gray-800">
          Podaci pacijenta
        </h1>
      </div>

      <p
        v-if="patientStore.loading"
        class="text-gray-500"
      >
        Učitavanje podataka...
      </p>

      <p
        v-else-if="patientStore.error"
        class="text-red-500"
      >
        {{ patientStore.error }}
      </p>

      <template
        v-else-if="patientStore.selectedPatient"
      >
        <div class="rounded-lg bg-white p-6">
          <h2 class="text-lg font-semibold">
            {{ patientStore.selectedPatient.firstName }}
            {{ patientStore.selectedPatient.lastName }}
          </h2>

          <p class="mt-1 text-gray-600">
            {{ patientStore.selectedPatient.email }}
          </p>
        </div>

        <div class="rounded-lg bg-white p-6">
          <h2 class="mb-4 text-lg font-semibold">
            Mjerenja glukoze
          </h2>

          <p
            v-if="
              patientStore.glucoseReadings.length === 0
            "
            class="text-gray-500"
          >
            Nema evidentiranih mjerenja.
          </p>

          <div
            v-else
            class="flex flex-col gap-2"
          >
            <div
              v-for="reading in patientStore.glucoseReadings"
              :key="reading.id"
              class="border-b py-2"
            >
              <span class="font-medium">
                {{ reading.value }}
                {{ reading.unit }}
              </span>

              <span class="ml-3 text-sm text-gray-500">
                {{
                  formatDateTime(
                    reading.measuredAtDate,
                  )
                }}
              </span>
            </div>
          </div>
        </div>

        <div class="rounded-lg bg-white p-6">
          <h2 class="mb-4 text-lg font-semibold">
            Lijekovi i terapija
          </h2>

          <p
            v-if="
              patientStore.medications.length === 0
            "
            class="text-gray-500"
          >
            Nema evidentiranih lijekova.
          </p>

          <div
            v-else
            class="flex flex-col gap-2"
          >
            <div
              v-for="medication in patientStore.medications"
              :key="medication.id"
              class="border-b py-2"
            >
              <span class="font-medium">
                {{ medication.name }}
              </span>

              <span class="ml-2 text-gray-600">
                {{ medication.dosage }}
                {{ medication.unit }}
              </span>
            </div>
          </div>
        </div>

        <div class="rounded-lg bg-white p-6">
          <h2 class="mb-4 text-lg font-semibold">
            Prehrana
          </h2>

          <p
            v-if="patientStore.meals.length === 0"
            class="text-gray-500"
          >
            Nema evidentiranih obroka.
          </p>

          <div
            v-else
            class="flex flex-col gap-2"
          >
            <div
              v-for="meal in patientStore.meals"
              :key="meal.id"
              class="border-b py-2"
            >
              <span class="font-medium">
                {{ meal.name }}
              </span>

              <span class="ml-2 text-gray-600">
                {{ getMealType(meal.mealType) }}
              </span>

              <span class="ml-2 text-gray-600">
                {{ meal.carbohydrates }} g UH
              </span>
            </div>
          </div>
        </div>

        <div class="rounded-lg bg-white p-6">
          <h2 class="mb-4 text-lg font-semibold">
            Fizičke aktivnosti
          </h2>

          <p
            v-if="
              patientStore.activities.length === 0
            "
            class="text-gray-500"
          >
            Nema evidentiranih aktivnosti.
          </p>

          <div
            v-else
            class="flex flex-col gap-2"
          >
            <div
              v-for="activity in patientStore.activities"
              :key="activity.id"
              class="border-b py-2"
            >
              <span class="font-medium">
                {{ activity.name }}
              </span>

              <span class="ml-2 text-gray-600">
                {{
                  getActivityType(
                    activity.activityType,
                  )
                }}
              </span>

              <span class="ml-2 text-gray-600">
                {{ activity.duration }} min
              </span>
            </div>
          </div>
        </div>
      </template>
    </div>
  </DashboardLayout>
</template>