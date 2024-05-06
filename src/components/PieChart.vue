<template>
  <div class="pie">
    <Pie v-if="chartData" :data="chartData"></Pie>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'vue-chartjs';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Pie {
  labels: Array<string>;
  datasets: Array<{ data: Array<number>; backgroundColor: Array<string> }>;
}

interface Props {
  data: {
    open: number;
    in_progress: number;
    close: number;
  } | null;
}

const props = defineProps<Props>();

const chartData = computed(() => {
  if (props.data) {
    const temp: Pie = {
      labels: ['Открыто', 'В работе', 'Закрыто'],
      datasets: [
        {
          backgroundColor: ['grey', 'blue', 'green'],
          data: [props.data.open, props.data.in_progress, props.data.close],
        },
      ],
    };
    return temp;
  }
  return null;
});
</script>

<style>
@media (max-width: 400px) {
  .pie {
    max-width: 250px;
  }
}
</style>
