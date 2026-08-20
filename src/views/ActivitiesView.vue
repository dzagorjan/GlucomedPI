<script setup>
import { onMounted, ref } from 'vue'

import DashboardLayout from '@/layouts/DashboardLayout.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseButton from '@/components/common/BaseButton.vue'

import { useAuthStore } from '@/stores/authStore'
import { useActivityStore } from '@/stores/activityStore'

const authStore = useAuthStore()
const activityStore = useActivityStore()

const name = ref('')
const activityType = ref('walking')
const duration = ref('')
const intensity = ref('medium')
const calories = ref('')
const performedAt = ref('')
const note = ref('')

onMounted(async () => {
  if (authStore.user) {
    await activityStore.fetchActivities(
      authStore.user.uid,
    )
  }
})

async function saveActivity() {
  if (
    !name.value ||
    !duration.value ||
    !performedAt.value
  ) {
    alert('Unesite obavezne podatke.')
    return
  }

  await activityStore.addActivity({
    userId: authStore.user.uid,
    name: name.value,
    activityType: activityType.value,
    duration: duration.value,
    intensity: intensity.value,
    calories: calories.value || 0,
    performedAt: performedAt.value,
    note: note.value,
  })

  if (!activityStore.error) {
    name.value = ''
    activityType.value = 'walking'
    duration.value = ''
    intensity.value = 'medium'
    calories.value = ''
    performedAt.value = ''
    note.value = ''
  }
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

function getIntensity(intensity) {
  const intensities = {
    low: 'Nizak',
    medium: 'Srednji',
    high: 'Visok',
  }

  return intensities[intensity] || intensity
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
          Fizičke aktivnosti
        </h1>

        <p class="mt-1 text-gray-500">
          Evidencija fizičkih aktivnosti.
        </p>
      </div>

      <div class="grid gap-6 md:grid-cols-2">
        <div class="rounded-lg bg-white p-6">
          <h2 class="mb-4 text-lg font-semibold">
            Dodaj aktivnost
          </h2>

          <form
            class="flex flex-col gap-4"
            @submit.prevent="saveActivity"
          >
            <BaseInput
              v-model="name"
              label="Naziv aktivnosti"
              placeholder="npr. Večernja šetnja"
              required
            />

            <div>
              <label
                class="mb-2 block text-sm font-medium text-gray-700"
              >
                Vrsta aktivnosti
              </label>

              <select
                v-model="activityType"
                class="w-full rounded-lg border border-gray-300 px-3 py-2"
              >
                <option value="walking">
                  Hodanje
                </option>

                <option value="running">
                  Trčanje
                </option>

                <option value="cycling">
                  Biciklizam
                </option>

                <option value="gym">
                  Teretana
                </option>

                <option value="other">
                  Ostalo
                </option>
              </select>
            </div>

            <BaseInput
              v-model="duration"
              label="Trajanje (minute)"
              type="number"
              placeholder="npr. 30"
              required
            />

            <div>
              <label
                class="mb-2 block text-sm font-medium text-gray-700"
              >
                Intenzitet
              </label>

              <select
                v-model="intensity"
                class="w-full rounded-lg border border-gray-300 px-3 py-2"
              >
                <option value="low">
                  Nizak
                </option>

                <option value="medium">
                  Srednji
                </option>

                <option value="high">
                  Visok
                </option>
              </select>
            </div>

            <BaseInput
              v-model="calories"
              label="Potrošene kalorije"
              type="number"
              placeholder="npr. 150"
            />

            <BaseInput
              v-model="performedAt"
              label="Datum i vrijeme"
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
              :disabled="activityStore.loading"
            >
              Spremi aktivnost
            </BaseButton>
          </form>
        </div>

        <div class="rounded-lg bg-white p-6">
          <h2 class="mb-4 text-lg font-semibold">
            Evidentirane aktivnosti
          </h2>

          <p
            v-if="activityStore.loading"
            class="text-gray-500"
          >
            Učitavanje...
          </p>

          <p
            v-else-if="
              activityStore.activities.length === 0
            "
            class="text-gray-500"
          >
            Nema evidentiranih aktivnosti.
          </p>

          <div
            v-else
            class="flex flex-col gap-3"
          >
            <div
              v-for="activity in activityStore.activities"
              :key="activity.id"
              class="rounded border border-gray-200 p-4"
            >
              <p class="font-semibold text-gray-800">
                {{ activity.name }}
              </p>

              <p class="text-sm text-gray-600">
                {{ getActivityType(activity.activityType) }}
              </p>

              <p class="text-sm text-gray-600">
                Trajanje:
                {{ activity.duration }} min
              </p>

              <p class="text-sm text-gray-600">
                Intenzitet:
                {{ getIntensity(activity.intensity) }}
              </p>

              <p class="text-sm text-gray-600">
                Kalorije:
                {{ activity.calories }} kcal
              </p>

              <p class="text-sm text-gray-600">
                {{
                  formatDate(
                    activity.performedAtDate,
                  )
                }}
              </p>

              <p
                v-if="activity.note"
                class="mt-2 text-sm text-gray-500"
              >
                {{ activity.note }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>