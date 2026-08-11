<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Veritabanı Yönetimi</h1>
        <p class="text-sm text-gray-500">Mevcut veritabanlarını listeleyin, arayın ve filtreleyin.</p>
      </div>
      <button class="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
        + Yeni Veritabanı
      </button>
    </div>

    <div class="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
      <div class="relative w-full md:w-80">
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Veritabanı adı ara..." 
          class="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
        />
        <Search class="w-4 h-4 text-gray-400 absolute left-3 top-3" />
      </div>

      <div class="w-full md:w-48">
        <select 
          v-model="selectedStatus"
          class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 text-gray-700"
        >
          <option value="ALL">Tüm Durumlar</option>
          <option value="Active">Aktif</option>
          <option value="Inactive">Pasif</option>
          <option value="Maintenance">Bakımda</option>
        </select>
      </div>
    </div>

    <div class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div v-if="isLoading" class="p-8 text-center text-gray-500">
        Yükleniyor...
      </div>

      <table v-else class="w-full text-left border-collapse text-sm">
        <thead>
          <tr class="bg-gray-50 text-gray-500 text-xs font-semibold uppercase tracking-wider">
            <th @click="toggleSort('name')" class="py-3 px-6 cursor-pointer hover:bg-gray-100 transition-colors select-none">
              Veritabanı Adı <span v-if="sortKey === 'name'">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
            </th>
            <th class="py-3 px-6">Charset</th>
            <th @click="toggleSort('tablesCount')" class="py-3 px-6 cursor-pointer hover:bg-gray-100 transition-colors select-none">
              Tablo Sayısı <span v-if="sortKey === 'tablesCount'">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
            </th>
            <th class="py-3 px-6">Boyut</th>
            <th class="py-3 px-6">Durum</th>
            <th class="py-3 px-6 text-right">İşlemler</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="db in sortedDatabases" :key="db.id" class="hover:bg-gray-50 transition-colors">
            <td class="py-4 px-6 font-semibold text-gray-900">{{ db.name }}</td>
            <td class="py-4 px-6 text-gray-500 font-mono text-xs">{{ db.charset }}</td>
            <td class="py-4 px-6 text-gray-700">{{ db.tablesCount }}</td>
            <td class="py-4 px-6 text-gray-700">{{ db.size }}</td>
            <td class="py-4 px-6">
              <span 
                :class="[
                  'px-2.5 py-1 rounded-full text-xs font-semibold',
                  db.status === 'Active' ? 'bg-green-100 text-green-700' :
                  db.status === 'Maintenance' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                ]"
              >
                {{ db.status }}
              </span>
            </td>
            <td class="py-4 px-6 text-right space-x-2">
              <button class="text-blue-600 hover:underline text-xs font-medium">Yönet</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { Search } from 'lucide-vue-next';
import { databaseService } from '../services/database.service';

const rawDatabases = ref([]);
const searchQuery = ref('');
const selectedStatus = ref('ALL');
const isLoading = ref(true);

const sortKey = ref('name');
const sortOrder = ref('asc');

onMounted(async () => {
  isLoading.value = true;
  rawDatabases.value = await databaseService.getAllDatabases();
  isLoading.value = false;
});

const filteredDatabases = computed(() => {
  return rawDatabases.value.filter((db) => {
    const matchesSearch = db.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesStatus = selectedStatus.value === 'ALL' || db.status === selectedStatus.value;
    return matchesSearch && matchesStatus;
  });
});

const toggleSort = (key) => {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortKey.value = key;
    sortOrder.value = 'asc';
  }
};

const sortedDatabases = computed(() => {
  return [...filteredDatabases.value].sort((a, b) => {
    let result = 0;
    if (a[sortKey.value] > b[sortKey.value]) result = 1;
    if (a[sortKey.value] < b[sortKey.value]) result = -1;
    return sortOrder.value === 'asc' ? result : -result;
  });
});
</script>