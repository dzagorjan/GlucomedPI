<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import DashboardLayout from '@/layouts/DashboardLayout.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseButton from '@/components/common/BaseButton.vue'

import { useAuthStore } from '@/stores/authStore'
import { useGlucoseStore } from '@/stores/glucoseStore'

const router = useRouter()

const authStore = useAuthStore()
const glucoseStore = useGlucoseStore()

const value = ref('')
const unit = ref('mmol/L')
const measurementType = ref('before_meal')
const measuredAt = ref('')
const note = ref('')

async function saveReading() {
  if (!value.value || !measuredAt.value) {
    alert('Unesite vrijednost i datum mjerenja.')
    return
  }

  await glucoseStore.addReading({
    userId: authStore.user.uid,
    value: value.value,
    unit: unit.value,
    measurementType: measurementType.value,
    measuredAt: measuredAt.value,
    note: note.value,
  })

  if (!glucoseStore.error) {
    router.push('/glucose')
  }
}
</script>

<template>
  <DashboardLayout>
    <div class="max-w-xl">
      <h1 class="mb-2 text-2xl font-bold text-gray-800">
        Novo mjerenje glukoze
      </h1>

      <p class="mb-6 text-gray-500">
        Unesite podatke novog mjerenja.
      </p>

      <form
        class="flex flex-col gap-4 rounded-lg bg-white p-6"
        @submit.prevent="saveReading"
      >
        <div
          v-if="glucoseStore.error"
          class="rounded bg-red-100 p-3 text-sm text-red-700"
        >
          {{ glucoseStore.error }}
        </div>

        <BaseInput
          v-model="value"
          label="Vrijednost glukoze"
          type="number"
          placeholder="npr. 6.4"
          required
        />

        <div>
          <label class="mb-2 block text-sm font-medium text-gray-700">
            Mjerna jedinica
          </label>

          <select
            v-model="unit"
            class="w-full rounded-lg border border-gray-300 px-3 py-2"
          >
            <option value="mmol/L">
              mmol/L
            </option>
          </select>
        </div>

        <BaseInput
          v-model="measuredAt"
          label="Datum i vrijeme"
          type="datetime-local"
          required
        />

        <div>
          <label class="mb-2 block text-sm font-medium text-gray-700">
            Kontekst mjerenja
          </label>

          <select
            v-model="measurementType"
            class="w-full rounded-lg border border-gray-300 px-3 py-2"
          >
            <option value="before_meal">
              Prije obroka
            </option>

            <option value="after_meal">
              Nakon obroka
            </option>

            <option value="before_sleep">
              Prije spavanja
            </option>

            <option value="after_activity">
              Nakon fizičke aktivnosti
            </option>

            <option value="other">
              Ostalo
            </option>
          </select>
        </div>

        <div>
          <label class="mb-2 block text-sm font-medium text-gray-700">
            Napomena
          </label>

          <textarea
            v-model="note"
            rows="3"
            class="w-full rounded-lg border border-gray-300 px-3 py-2"
            placeholder="Dodatna napomena..."
          ></textarea>
        </div>

        <div class="mt-2 flex gap-3">
          <BaseButton
            type="submit"
            :disabled="glucoseStore.loading"
          >
            {{
              glucoseStore.loading
                ? 'Spremanje...'
                : 'Spremi'
            }}
          </BaseButton>

          <BaseButton
            type="button"
            variant="secondary"
            @click="router.push('/glucose')"
          >
            Odustani
          </BaseButton>
        </div>
      </form>
    </div>
  </DashboardLayout>
</template>