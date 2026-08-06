<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">Genel Durum Özeti</h1>
      <p class="text-sm text-gray-500">
        Veritabanı durumları ve canlı istatistikler
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between"
      >
        <div>
          <p class="text-sm text-gray-500 font-medium">Toplam Database</p>
          <p class="text-3xl font-bold text-gray-900 mt-2">12</p>
        </div>
        <div class="p-3 bg-rose-50 text-rose-800 rounded-lg">
          <Database :size="24" />
        </div>
      </div>

      <div
        class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between"
      >
        <div>
          <p class="text-sm text-gray-500 font-medium">Toplam Tablo</p>
          <p class="text-3xl font-bold text-gray-900 mt-2">148</p>
        </div>
        <div class="p-3 bg-rose-100/70 text-rose-900 rounded-lg">
          <Table :size="24" />
        </div>
      </div>

      <div
        class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between"
      >
        <div>
          <p class="text-sm text-gray-500 font-medium">Kullanıcı Sayısı</p>
          <p class="text-3xl font-bold text-gray-900 mt-2">34</p>
        </div>
        <div class="p-3 bg-stone-100 text-stone-800 rounded-lg">
          <Users :size="24" />
        </div>
      </div>

      <div
        class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between"
      >
        <div>
          <p class="text-sm text-gray-500 font-medium">Aktif Bağlantılar</p>
          <p class="text-3xl font-bold text-gray-900 mt-2">8</p>
        </div>
        <div class="p-3 bg-emerald-50 text-emerald-700 rounded-lg">
          <Activity :size="24" />
        </div>
      </div>
    </div>

    <!-- ECharts Grafikleri -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h3 class="text-base font-semibold text-gray-800 mb-4">
          Bağlantı Dağılımı (Pie Chart)
        </h3>
        <div class="h-64">
          <v-chart class="w-full h-full" :option="pieChartOption" autofit />
        </div>
      </div>

      <div
        class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm lg:col-span-2"
      >
        <h3 class="text-base font-semibold text-gray-800 mb-4">
          Veritabanı Başına Tablo Sayısı (Bar Chart)
        </h3>
        <div class="h-64">
          <v-chart class="w-full h-full" :option="barChartOption" autofit />
        </div>
      </div>
    </div>

    <div class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <h3 class="text-base font-semibold text-gray-800 mb-4">
        Ağ ve İşlem Trafiği (Line Chart)
      </h3>
      <div class="h-64">
        <v-chart class="w-full h-full" :option="lineChartOption" autofit />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Database, Table, Users, Activity } from 'lucide-vue-next';
import VChart from 'vue-echarts';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart, BarChart, LineChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from 'echarts/components';

use([
  CanvasRenderer,
  PieChart,
  BarChart,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
]);

const pieChartOption = ref({
  tooltip: { trigger: 'item' },
  legend: { bottom: '0%' },
  color: ['#881337', '#be123c', '#fda4af'],
  series: [
    {
      name: 'Bağlantı',
      type: 'pie',
      radius: ['40%', '70%'],
      data: [
        { value: 8, name: 'Aktif' },
        { value: 4, name: 'Boşta' },
        { value: 2, name: 'Hatalı' },
      ],
    },
  ],
});

const barChartOption = ref({
  tooltip: { trigger: 'axis' },
  grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
  xAxis: {
    type: 'category',
    data: ['E-Ticaret', 'Kullanıcılar', 'Lojistik', 'Analiz', 'Yedek'],
  },
  yAxis: { type: 'value' },
  series: [
    {
      data: [45, 12, 28, 54, 9],
      type: 'bar',
      itemStyle: { color: '#881337', borderRadius: [4, 4, 0, 0] },
    },
  ],
});

const lineChartOption = ref({
  tooltip: { trigger: 'axis' },
  grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
  xAxis: {
    type: 'category',
    data: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
  },
  yAxis: { type: 'value' },
  series: [
    {
      name: 'Sorgu',
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'line',
      smooth: true,
      lineStyle: { color: '#be123c', width: 3 },
      itemStyle: { color: '#be123c' },
    },
  ],
});
</script>
