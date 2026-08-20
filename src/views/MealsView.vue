<script setup>
import { onMounted, ref } from 'vue'

import DashboardLayout from '@/layouts/DashboardLayout.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseButton from '@/components/common/BaseButton.vue'

import { useAuthStore } from '@/stores/authStore'
import { useMealStore } from '@/stores/mealStore'

const authStore = useAuthStore()
const mealStore = useMealStore()

const name = ref('')
const mealType = ref('breakfast')
const description = ref('')
const carbohydrates = ref('')
const consumedAt = ref('')
const note = ref('')

onMounted(async () => {
  if (authStore.user) {
    await mealStore.fetchMeals(
      authStore.user.uid,
    )
  }
})

async function saveMeal() {
  if (
    !name.value ||
    !carbohydrates.value ||
    !consumedAt.value
  ) {
    alert('Unesite obavezne podatke.')
    return
  }

  await mealStore.addMeal({
    userId: authStore.user.uid,
    name: name.value,
    mealType: mealType.value,
    description: description.value,
    carbohydrates: carbohydrates.value,
    consumedAt: consumedAt.value,
    note: note.value,
  })

  if (!mealStore.error) {
    name.value = ''
    mealType.value = 'breakfast'
    description.value = ''
    carbohydrates.value = ''
    consumedAt.value = ''
    note.value = ''
  }
}

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

function formatDate(date) {
  return date.toLocaleString('hr-HR')
}
</script>

<template>
  <DashboardLayout>
    <div class="flex flex-col gap-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">
          Prehrana
        </h1>

        <p class="mt-1 text-gray-500">
          Evidencija obroka i ugljikohidrata.
        </p>
      </div>

      <div class="grid gap-6 md:grid-cols-2">
        <div class="rounded-lg bg-white p-6">
          <h2 class="mb-4 text-lg font-semibold">
            Dodaj obrok
          </h2>

          <form
            class="flex flex-col gap-4"
            @submit.prevent="saveMeal"
          >
            <BaseInput
              v-model="name"
              label="Naziv obroka"
              placeholder="npr. Zobene pahuljice"
              required
            />

            <div>
              <label
                class="mb-2 block text-sm font-medium text-gray-700"
              >
                Vrsta obroka
              </label>

              <select
                v-model="mealType"
                class="w-full rounded-lg border border-gray-300 px-3 py-2"
              >
                <option value="breakfast">
                  Doručak
                </option>

                <option value="lunch">
                  Ručak
                </option>

                <option value="dinner">
                  Večera
                </option>

                <option value="snack">
                  Međuobrok
                </option>

                <option value="other">
                  Ostalo
                </option>
              </select>
            </div>

            <BaseInput
              v-model="carbohydrates"
              label="Ugljikohidrati (g)"
              type="number"
              placeholder="npr. 45"
              required
            />

            <BaseInput
              v-model="consumedAt"
              label="Datum i vrijeme"
              type="datetime-local"
              required
            />

            <div>
              <label
                class="mb-2 block text-sm font-medium text-gray-700"
              >
                Opis hrane
              </label>

              <textarea
                v-model="description"
                rows="3"
                class="w-full rounded-lg border border-gray-300 px-3 py-2"
              ></textarea>
            </div>

            <div>
              <label
                class="mb-2 block text-sm font-medium text-gray-700"
              >
                Napomena
              </label>

              <textarea
                v-model="note"
                rows="2"
                class="w-full rounded-lg border border-gray-300 px-3 py-2"
              ></textarea>
            </div>

            <BaseButton
              type="submit"
              :disabled="mealStore.loading"
            >
              Spremi obrok
            </BaseButton>
          </form>
        </div>

        <div class="rounded-lg bg-white p-6">
          <h2 class="mb-4 text-lg font-semibold">
            Evidentirani obroci
          </h2>

          <p
            v-if="mealStore.loading"
            class="text-gray-500"
          >
            Učitavanje...
          </p>

          <p
            v-else-if="
              mealStore.meals.length === 0
            "
            class="text-gray-500"
          >
            Nema evidentiranih obroka.
          </p>

          <div
            v-else
            class="flex flex-col gap-3"
          >
            <div
              v-for="meal in mealStore.meals"
              :key="meal.id"
              class="rounded border border-gray-200 p-4"
            >
              <p class="font-semibold text-gray-800">
                {{ meal.name }}
              </p>

              <p class="text-sm text-gray-600">
                {{ getMealType(meal.mealType) }}
              </p>

              <p class="text-sm text-gray-600">
                Ugljikohidrati:
                {{ meal.carbohydrates }} g
              </p>

              <p class="text-sm text-gray-600">
                {{
                  formatDate(
                    meal.consumedAtDate,
                  )
                }}
              </p>

              <p
                v-if="meal.description"
                class="mt-2 text-sm text-gray-500"
              >
                {{ meal.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>