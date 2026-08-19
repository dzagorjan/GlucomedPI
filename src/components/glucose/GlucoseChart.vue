<script setup>
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from 'chart.js'

import {
  onMounted,
  onUnmounted,
  ref,
  watch,
} from 'vue'

const props = defineProps({
  readings: {
    type: Array,
    default: () => [],
  },
})

const chartCanvas = ref(null)
let chart = null

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
)

function createChart() {
  if (!chartCanvas.value) {
    return
  }

  if (chart) {
    chart.destroy()
  }

  const readings = [...props.readings].reverse()

  const labels = readings.map((reading) => {
    return reading.measuredAtDate.toLocaleString(
        'hr-HR',
        {
            day: '2-digit',
            month: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        },
        )
  })

  const values = readings.map((reading) => {
    return reading.value
  })

  chart = new Chart(chartCanvas.value, {
    type: 'line',

    data: {
      labels,

      datasets: [
        {
          label: 'Glukoza (mmol/L)',
          data: values,
          tension: 0.2,
        },
      ],
    },

    options: {
      responsive: true,
      maintainAspectRatio: false,

      scales: {
        y: {
          beginAtZero: false,
        },
      },
    },
  })
}

onMounted(() => {
  createChart()
})

watch(
  () => props.readings,
  () => {
    createChart()
  },
  {
    deep: true,
  },
)

onUnmounted(() => {
  if (chart) {
    chart.destroy()
  }
})
</script>

<template>
  <div class="h-80">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>