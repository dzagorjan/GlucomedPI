<script setup>
import { onMounted } from 'vue'

import DashboardLayout from '@/layouts/DashboardLayout.vue'

import { useAuthStore } from '@/stores/authStore'
import { usePatientStore } from '@/stores/patientStore'

const authStore = useAuthStore()
const patientStore = usePatientStore()

onMounted(async () => {
  if (authStore.user) {
    await patientStore.fetchPatients(
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
          Moji pacijenti
        </h1>

        <p class="mt-1 text-gray-500">
          Pregled povezanih pacijenata.
        </p>
      </div>

      <div class="rounded-lg bg-white p-6">
        <p
          v-if="patientStore.loading"
          class="text-gray-500"
        >
          Učitavanje pacijenata...
        </p>

        <p
          v-else-if="patientStore.error"
          class="text-red-500"
        >
          {{ patientStore.error }}
        </p>

        <p
          v-else-if="patientStore.patients.length === 0"
          class="text-gray-500"
        >
          Trenutno nemate povezanih pacijenata.
        </p>

        <div
          v-else
          class="overflow-x-auto"
        >
          <table class="w-full text-left">
            <thead class="border-b">
              <tr>
                <th class="p-3">
                  Ime
                </th>

                <th class="p-3">
                  Prezime
                </th>

                <th class="p-3">
                  Email
                </th>

                <th class="p-3">
                  Akcija
                </th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="patient in patientStore.patients"
                :key="patient.id"
                class="border-b"
              >
                <td class="p-3">
                  {{ patient.firstName }}
                </td>

                <td class="p-3">
                  {{ patient.lastName }}
                </td>

                <td class="p-3">
                  {{ patient.email }}
                </td>

                <td class="p-3">
                  <RouterLink
                    :to="`/patients/${patient.id}`"
                    class="rounded bg-blue-500 px-3 py-1 text-sm text-white"
                  >
                    Pregled
                  </RouterLink>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>