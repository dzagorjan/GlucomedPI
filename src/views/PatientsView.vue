<script setup>
import DashboardLayout from '@/layouts/DashboardLayout.vue'

</script>

<template>
  <DashboardLayout>
    <div class="flex flex-col gap-6">
      <div>
        <h1 class="text-3xl font-bold text-gray-800">
          Moji pacijenti
        </h1>

        <p class="mt-2 text-gray-500">
          Pregled pacijenata povezanih s liječnikom.
        </p>
      </div>

      <div
        class="rounded-xl border border-gray-200 bg-white p-6"
      >
        <p class="text-sm text-gray-500">
          Popis pacijenata ...... dodati će se kasnije
        </p>
      </div>
    </div>
  </DashboardLayout>
</template>