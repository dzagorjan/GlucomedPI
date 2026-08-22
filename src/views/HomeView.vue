<template>
  <div class="flex min-h-screen items-center justify-center bg-slate-50">
    <div class="flex flex-col items-center gap-6 text-center">
      <h1 class="text-4xl font-bold text-blue-600">
        GlucoMed
      </h1>

      <p class="max-w-md text-gray-600">
        Web aplikacija za praćenje zdravstvenih podataka
        povezanih s dijabetesom.
      </p>

      <div class="flex gap-3">
        <RouterLink
          to="/login"
          class="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
        >
          Prijava
        </RouterLink>

        <RouterLink
          to="/register"
          class="rounded-lg border border-blue-600 px-6 py-3 font-medium text-blue-600 hover:bg-blue-50"
        >
          Registracija
        </RouterLink>
      </div>
    </div>
  </div>
</template>