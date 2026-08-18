<script setup>
import DashboardLayout from '@/layouts/DashboardLayout.vue'
</script>

<template>
  <DashboardLayout>
    <div class="flex flex-col gap-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-800">
            Mjerenja glukoze
          </h1>

          <p class="mt-1 text-gray-500">
            Pregled evidentiranih mjerenja glukoze.
          </p>
        </div>

        <RouterLink
          to="/glucose/add"
          class="rounded-lg bg-blue-600 px-4 py-2 text-white"
        >
          Dodaj mjerenje
        </RouterLink>
      </div>

      <div class="rounded-lg bg-white p-6">
        <p class="text-gray-500">
          Pregled mjerenja bit će prikazan ovdje.
        </p>
      </div>
    </div>
  </DashboardLayout>
</template>