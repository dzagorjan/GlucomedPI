<script setup>
import { onMounted, ref } from 'vue'

import DashboardLayout from '@/layouts/DashboardLayout.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseButton from '@/components/common/BaseButton.vue'

import { useAuthStore } from '@/stores/authStore'
import { useMedicationStore } from '@/stores/medicationStore'

const authStore = useAuthStore()
const medicationStore = useMedicationStore()

const name = ref('')
const dosage = ref('')
const unit = ref('mg')
const takenAt = ref('')
const note = ref('')

onMounted(async () => {
  if (authStore.user) {
    await medicationStore.fetchMedications(
      authStore.user.uid,
    )
  }
})

async function saveMedication() {
  if (
    !name.value ||
    !dosage.value ||
    !takenAt.value
  ) {
    alert('Unesite obavezne podatke.')
    return
  }

  await medicationStore.addMedication({
    userId: authStore.user.uid,
    name: name.value,
    dosage: dosage.value,
    unit: unit.value,
    takenAt: takenAt.value,
    note: note.value,
  })

  if (!medicationStore.error) {
    name.value = ''
    dosage.value = ''
    unit.value = 'mg'
    takenAt.value = ''
    note.value = ''
  }
}

function formatDate(date) {
  return date.toLocaleString('hr-HR')
}
</script>

<template>
  <DashboardLayout>
    <div class="flex flex-col gap-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">
          Lijekovi i terapija
        </h1>

        <p class="mt-1 text-gray-500">
          Evidencija uzetih lijekova.
        </p>
      </div>

      <div class="grid gap-6 md:grid-cols-2">
        <div class="rounded-lg bg-white p-6">
          <h2 class="mb-4 text-lg font-semibold">
            Dodaj lijek
          </h2>

          <form
            class="flex flex-col gap-4"
            @submit.prevent="saveMedication"
          >
            <BaseInput
              v-model="name"
              label="Naziv lijeka"
              placeholder="npr. Metformin"
              required
            />

            <BaseInput
              v-model="dosage"
              label="Doza"
              type="number"
              placeholder="npr. 500"
              required
            />

            <div>
              <label
                class="mb-2 block text-sm font-medium text-gray-700"
              >
                Mjerna jedinica
              </label>

              <select
                v-model="unit"
                class="w-full rounded-lg border border-gray-300 px-3 py-2"
              >
                <option value="mg">
                  mg
                </option>

                <option value="ml">
                  ml
                </option>

                <option value="jedinica">
                  jedinica
                </option>
              </select>
            </div>

            <BaseInput
              v-model="takenAt"
              label="Datum i vrijeme uzimanja"
              type="datetime-local"
              required
            />

            <div>
              <label
                class="mb-2 block text-sm font-medium text-gray-700"
              >
                Napomena
              </label>

              <textarea
                v-model="note"
                rows="3"
                class="w-full rounded-lg border border-gray-300 px-3 py-2"
                placeholder="Dodatna napomena..."
              ></textarea>
            </div>

            <BaseButton
              type="submit"
              :disabled="medicationStore.loading"
            >
              Spremi lijek
            </BaseButton>
          </form>
        </div>

        <div class="rounded-lg bg-white p-6">
          <h2 class="mb-4 text-lg font-semibold">
            Evidentirani lijekovi
          </h2>

          <p
            v-if="medicationStore.loading"
            class="text-gray-500"
          >
            Učitavanje...
          </p>

          <p
            v-else-if="
              medicationStore.medications.length === 0
            "
            class="text-gray-500"
          >
            Nema evidentiranih lijekova.
          </p>

          <div
            v-else
            class="flex flex-col gap-3"
          >
            <div
              v-for="medication in medicationStore.medications"
              :key="medication.id"
              class="rounded border border-gray-200 p-4"
            >
              <p class="font-semibold text-gray-800">
                {{ medication.name }}
              </p>

              <p class="text-sm text-gray-600">
                Doza:
                {{ medication.dosage }}
                {{ medication.unit }}
              </p>

              <p class="text-sm text-gray-600">
                Vrijeme:
                {{
                  formatDate(
                    medication.takenAtDate,
                  )
                }}
              </p>

              <p
                v-if="medication.note"
                class="mt-2 text-sm text-gray-500"
              >
                {{ medication.note }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>