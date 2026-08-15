<script setup>
import DashboardLayout from '@/layouts/DashboardLayout.vue'

</script>


<template>
  <DashboardLayout>
    <div class="flex flex-col gap-6">
      <div>
        <h1 class="text-3xl font-bold text-gray-800">
          Nadzorna ploča
        </h1>

        <p class="mt-2 text-gray-500">
          Dobrodošli u GlucoMed.
        </p>
      </div>

      <div
        class="rounded-xl border border-gray-200 bg-white p-6"
      >
        <h2 class="text-lg font-semibold">
          Pregled zdravstvenih podataka
        </h2>

        <p class="mt-2 text-sm text-gray-500">
          Ovdje će se prikazivati vaša mjerenja i statistika.
        </p>
      </div>
    </div>
  </DashboardLayout>
</template>