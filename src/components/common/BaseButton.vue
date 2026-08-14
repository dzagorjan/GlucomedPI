<script setup>
    defineProps({
        type:{
            type:String,
            default: 'button',
        },

        variant:{
            type:String,
            default:'primary',
        },

        disabled: {
        type: Boolean,
        default: false,
  },
    })
</script>

<template>

  <button
    :type="type"
    :disabled="disabled"
    class="rounded-lg px-4 py-2 font-medium transition disabled:cursor-not-allowed disabled:opacity-50"
    :class="{
      'bg-blue-600 text-white hover:bg-blue-700':
        variant === 'primary',

      'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50':
        variant === 'secondary',

      'bg-red-600 text-white hover:bg-red-700':
        variant === 'danger',
    }"
  >
    <slot />
  </button>


</template>

<style scoped>

</style>
