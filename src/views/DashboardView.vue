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

    <!-- Son İşlem Kayıtları -->
    <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-base font-semibold text-gray-800">
          Son İşlem Kayıtları
        </h3>
        <span class="text-xs text-gray-400 font-mono">Canlı Akış</span>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left text-gray-600">
          <thead class="text-xs text-gray-500 uppercase bg-gray-50 border-b">
            <tr>
              <th class="py-3 px-4">Kullanıcı</th>
              <th class="py-3 px-4">Veritabanı</th>
              <th class="py-3 px-4">İşlem Türü</th>
              <th class="py-3 px-4">Tarih / Saat</th>
              <th class="py-3 px-4">Durum</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr
              v-for="log in recentLogs"
              :key="log.id"
              class="hover:bg-gray-50/50"
            >
              <td class="py-3 px-4 font-medium text-gray-900">
                {{ log.user }}
              </td>
              <td class="py-3 px-4">{{ log.db }}</td>
              <td class="py-3 px-4">
                <span
                  class="px-2 py-1 rounded-md text-xs font-mono bg-gray-100 text-gray-700"
                >
                  {{ log.action }}
                </span>
              </td>
              <td class="py-3 px-4 text-xs text-gray-500">{{ log.time }}</td>
              <td class="py-3 px-4">
                <span
                  :class="
                    log.status === 'Başarılı'
                      ? 'text-emerald-700 bg-emerald-50'
                      : 'text-rose-700 bg-rose-50'
                  "
                  class="px-2.5 py-0.5 rounded-full text-xs font-medium inline-flex items-center gap-1"
                >
                  <span
                    :class="
                      log.status === 'Başarılı'
                        ? 'bg-emerald-500'
                        : 'bg-rose-500'
                    "
                    class="w-1.5 h-1.5 rounded-full"
                  ></span>
                  {{ log.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
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

const recentLogs = ref([
  {
    id: 1,
    user: 'sude.yilmaz',
    db: 'E-Ticaret',
    action: 'SELECT Sorgusu',
    time: '14:45:12',
    status: 'Başarılı',
  },
  {
    id: 2,
    user: 'bade.ozturk',
    db: 'Kullanıcılar',
    action: 'Yedekleme',
    time: '14:40:00',
    status: 'Başarılı',
  },
  {
    id: 3,
    user: 'batuhan.kaya',
    db: 'Lojistik',
    action: 'UPDATE Sorgusu',
    time: '14:32:18',
    status: 'Başarılı',
  },
  {
    id: 4,
    user: 'system_auto',
    db: 'Analiz',
    action: 'Index Temizliği',
    time: '14:15:00',
    status: 'Başarılı',
  },
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
