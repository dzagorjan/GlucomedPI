<script setup>

defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },

  label: {
    type: String,
    default: '',
  },

  type: {
    type: String,
    default: 'text',
  },

  placeholder: {
    type: String,
    default: '',
  },

  required: {
    type: Boolean,
    default: false,
  },

  error: {
    type: String,
    default: '',
  },
})

defineEmits(['update:modelValue'])

</script>



<template>
  <div class="flex flex-col gap-2">
    <label
      v-if="label"
      class="text-sm font-medium text-gray-700"
    >
      {{ label }}
    </label>

    <input
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      :required="required"
      class="rounded-lg border px-3 py-2 outline-none transition"
      :class="
        error
          ? 'border-red-500'
          : 'border-gray-300 focus:border-blue-500'
      "
      @input="$emit('update:modelValue', $event.target.value)"
    >

    <p
      v-if="error"
      class="text-sm text-red-600"
    >
      {{ error }}
    </p>
  </div>
</template>


<style scoped>

</style>
