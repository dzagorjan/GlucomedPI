<script setup>
import AppNavbar from '@/components/layout/AppNavbar.vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'

</script>


<template>
  <div class="flex min-h-screen flex-col bg-slate-50">
    <AppNavbar />

    <div class="flex flex-1">
      <AppSidebar />

      <main class="flex-1 p-6">
        <slot />
      </main>
    </div>
  </div>
</template>