<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },

  value: {
    type: [String, Number],
    required: true,
  },

  description: {
    type: String,
    default: '',
  },

  status: {
    type: String,
    default: 'default',
  },
})
</script>

<template>
  <div
    class="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
  >
    <div class="flex items-start justify-between gap-4">
      <div>
        <p class="text-sm font-medium text-gray-500">
          {{ title }}
        </p>

        <p class="mt-2 text-2xl font-bold text-gray-800">
          {{ value }}
        </p>
      </div>

      <div
        class="flex h-10 w-10 items-center justify-center rounded-lg"
        :class="{
          'bg-blue-100 text-blue-600':
            status === 'default',

          'bg-green-100 text-green-600':
            status === 'success',

          'bg-yellow-100 text-yellow-600':
            status === 'warning',

          'bg-red-100 text-red-600':
            status === 'danger',
        }"
      >
        <span class="text-lg font-bold">
          +
        </span>
      </div>
    </div>

    <p
      v-if="description"
      class="mt-3 text-sm"
      :class="{
        'text-gray-500':
          status === 'default',

        'text-green-600':
          status === 'success',

        'text-yellow-600':
          status === 'warning',

        'text-red-600':
          status === 'danger',
      }"
    >
      {{ description }}
    </p>
  </div>
</template>