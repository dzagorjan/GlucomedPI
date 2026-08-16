<script setup>
defineProps({
  status: {
    type: String,
    required: true,
  },
})
</script>



<template>
  <span
    class="rounded-full px-3 py-1 text-xs font-medium"
    :class="{
      'bg-green-100 text-green-700': status === 'normal',
      'bg-red-100 text-red-700': status === 'low',
      'bg-orange-100 text-orange-700': status === 'high',
    }"
  >
    <template v-if="status === 'normal'">
      U granicama
    </template>

    <template v-else-if="status === 'low'">
      Nisko
    </template>

    <template v-else>
      Visoko
    </template>
  </span>
</template>