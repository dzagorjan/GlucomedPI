<script setup>
defineProps({
  measurements: {
    type: Array,
    default: () => [],
  },
})

function getStatus(value) {
  if (value < 4) {
    return {
      label: 'Niska',
      classes: 'bg-yellow-100 text-yellow-700',
    }
  }

  if (value > 10) {
    return {
      label: 'Visoka',
      classes: 'bg-red-100 text-red-700',
    }
  }

  return {
    label: 'U rasponu',
    classes: 'bg-green-100 text-green-700',
  }
}
</script>

<template>
  <div
    class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
  >
    <div
      class="flex items-center justify-between border-b border-gray-200 p-6"
    >
      <div>
        <h2 class="text-lg font-semibold text-gray-800">
          Posljednja mjerenja
        </h2>

        <p class="mt-1 text-sm text-gray-500">
          Pregled posljednjih vrijednosti glukoze.
        </p>
      </div>

      <RouterLink
        to="/glucose"
        class="text-sm font-medium text-blue-600 hover:text-blue-700"
      >
        Prikaži sve
      </RouterLink>
    </div>

    <div
      v-if="measurements.length === 0"
      class="p-8 text-center"
    >
      <p class="text-sm text-gray-500">
        Još nema evidentiranih mjerenja glukoze.
      </p>
    </div>

    <div
      v-else
      class="overflow-x-auto"
    >
      <table class="w-full text-left">
        <thead class="bg-gray-50">
          <tr>
            <th
              class="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500"
            >
              Vrijednost
            </th>

            <th
              class="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500"
            >
              Vrijeme
            </th>

            <th
              class="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500"
            >
              Kontekst
            </th>

            <th
              class="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500"
            >
              Status
            </th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-100">
          <tr
            v-for="measurement in measurements"
            :key="measurement.id"
            class="transition hover:bg-gray-50"
          >
            <td class="px-6 py-4">
              <span class="font-semibold text-gray-800">
                {{ measurement.value }}
              </span>

              <span class="ml-1 text-sm text-gray-500">
                {{ measurement.unit }}
              </span>
            </td>

            <td class="px-6 py-4 text-sm text-gray-600">
              {{ measurement.measuredAt }}
            </td>

            <td class="px-6 py-4 text-sm text-gray-600">
              {{ measurement.measurementType }}
            </td>

            <td class="px-6 py-4">
              <span
                class="inline-flex rounded-full px-2.5 py-1 text-xs font-medium"
                :class="getStatus(measurement.value).classes"
              >
                {{ getStatus(measurement.value).label }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>