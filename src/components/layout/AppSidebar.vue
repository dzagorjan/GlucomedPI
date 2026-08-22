<script setup>
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
</script>


<template>
  <aside
    class="w-60 border-r border-gray-200 bg-white p-4"
  >
    <nav class="flex flex-col gap-2">
      <RouterLink
        to="/dashboard"
        class="rounded-lg px-4 py-3 hover:bg-blue-50 hover:text-blue-600"
      >
        Nadzorna ploča
      </RouterLink>

      <template v-if="authStore.isPatient">
        <RouterLink
          to="/glucose"
          class="rounded-lg px-4 py-3 hover:bg-blue-50 hover:text-blue-600"
        >
          Mjerenja glukoze
        </RouterLink>

        <RouterLink
          to="/medications"
          class="rounded-lg px-4 py-3 hover:bg-blue-50 hover:text-blue-600"
        >
          Lijekovi i terapija
        </RouterLink>

        <RouterLink
          to="/meals"
          class="rounded-lg px-4 py-3 hover:bg-blue-50 hover:text-blue-600"
        >
          Prehrana
        </RouterLink>

        <RouterLink
          to="/activities"
          class="rounded-lg px-4 py-3 hover:bg-blue-50 hover:text-blue-600"
        >
          Fizičke aktivnosti
        </RouterLink>

        <RouterLink
          to="/statistics"
          class="rounded-lg px-4 py-3 hover:bg-blue-50 hover:text-blue-600"
        >
          Statistika
        </RouterLink>
      </template>

      <template v-if="authStore.isDoctor">
        <RouterLink
          to="/patients"
          class="rounded-lg px-4 py-3 hover:bg-blue-50 hover:text-blue-600"
        >
          Moji pacijenti
        </RouterLink>
      </template>     

      <RouterLink
        to="/profile"
        class="rounded-lg px-4 py-3 hover:bg-blue-50 hover:text-blue-600"
      >
        Profil
      </RouterLink>
    </nav>
  </aside>
</template>


<style scoped>
.router-link-active {
  background-color: #eff6ff;
  color: #2563eb;
  font-weight: 600;
}
</style>