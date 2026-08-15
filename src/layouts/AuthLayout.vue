<script setup>

</script>


<template>
  <div
    class="flex min-h-screen items-center justify-center bg-slate-50 p-4"
  >
    <div
      class="w-full max-w-md rounded-xl border border-gray-200 bg-white p-8 shadow-sm"
    >
      <div class="mb-8 text-center">
        <RouterLink
          to="/"
          class="text-3xl font-bold text-blue-600"
        >
          GlucoMed
        </RouterLink>
      </div>

      <slot />
    </div>
  </div>

</template>