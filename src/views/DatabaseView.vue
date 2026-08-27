<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Veritabanı Yönetimi</h1>
        <p class="text-sm text-gray-500">
          Mevcut veritabanlarını listeleyin, arayın ve filtreleyin.
        </p>
      </div>
      <button
        @click="openCreateModal"
        class="px-4 py-2 bg-blue-800 text-white rounded-lg text-sm font-medium hover:bg-blue-900 transition-colors"
      >
        + Yeni Veritabanı
      </button>
    </div>

    <div
      class="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between"
    >
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

    <div
      class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
    >
      <div v-if="isLoading" class="p-8 text-center text-gray-500">
        Yükleniyor...
      </div>

      <table v-else class="w-full text-left border-collapse text-sm">
        <thead>
          <tr
            class="bg-gray-50 text-gray-500 text-xs font-semibold uppercase tracking-wider"
          >
            <th
              @click="toggleSort('name')"
              class="py-3 px-6 cursor-pointer hover:bg-gray-100 transition-colors select-none"
            >
              Veritabanı Adı
              <span v-if="sortKey === 'name'">{{
                sortOrder === 'asc' ? '▲' : '▼'
              }}</span>
            </th>
            <th class="py-3 px-6">Charset</th>
            <th
              @click="toggleSort('tablesCount')"
              class="py-3 px-6 cursor-pointer hover:bg-gray-100 transition-colors select-none"
            >
              Tablo Sayısı
              <span v-if="sortKey === 'tablesCount'">{{
                sortOrder === 'asc' ? '▲' : '▼'
              }}</span>
            </th>
            <th class="py-3 px-6">Boyut</th>
            <th class="py-3 px-6">Durum</th>
            <th class="py-3 px-6 text-right">İşlemler</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr
            v-for="db in paginatedDatabases"
            :key="db.id"
            class="hover:bg-gray-50 transition-colors"
          >
            <td class="py-4 px-6 font-semibold text-gray-900">{{ db.name }}</td>
            <td class="py-4 px-6 text-gray-500 font-mono text-xs">
              {{ db.charset }}
            </td>
            <td class="py-4 px-6 text-gray-700">{{ db.tablesCount }}</td>
            <td class="py-4 px-6 text-gray-700">{{ db.size }}</td>
            <td class="py-4 px-6">
              <span
                :class="[
                  'px-2.5 py-1 rounded-full text-xs font-semibold',
                  db.status === 'Active'
                    ? 'bg-green-100 text-green-700'
                    : db.status === 'Maintenance'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-red-100 text-red-700',
                ]"
              >
                {{ db.status }}
              </span>
            </td>
            <td class="py-4 px-6 text-right space-x-2">
              <router-link
                :to="`/databases/${db.id}/tables`"
                class="text-emerald-600 hover:underline text-xs font-medium"
              >
                Tablolar
              </router-link>
              <button
                @click="openDetailModal(db)"
                class="text-slate-600 hover:underline text-xs font-medium"
              >
                Detay
              </button>
              <button
                @click="openEditModal(db)"
                class="text-blue-600 hover:underline text-xs font-medium"
              >
                Düzenle
              </button>
              <button @click="openDeletePopup(db.id)">Sil</button>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- Pagination alt çubuğu -->
      <div
        v-if="!isLoading"
        class="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500"
      >
        <span
          >Toplam {{ sortedDatabases.length }} kayıttan {{ currentPage }}. sayfa
          gösteriliyor</span
        >

        <div class="flex items-center gap-2">
          <button
            @click="changePage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-3 py-1 border border-gray-200 rounded disabled:opacity-50 hover:bg-gray-50 text-xs font-medium"
          >
            Önceki
          </button>
          <span class="px-2 font-semibold text-gray-700 text-xs"
            >{{ currentPage }} / {{ totalPages }}</span
          >
          <button
            @click="changePage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="px-3 py-1 border border-gray-200 rounded disabled:opacity-50 hover:bg-gray-50 text-xs font-medium"
          >
            Sonraki
          </button>
        </div>
      </div>
    </div>
    <DatabaseModal
      :is-open="isModalOpen"
      :edit-data="selectedDb"
      @close="closeModal"
      @save="handleSaveDatabase"
    />
  </div>
  <DatabaseDetailModal
    :is-open="isDetailOpen"
    :db="detailData"
    @close="isDetailOpen = false"
  />
  <div
    v-if="isDeletePopupOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
  >
    <div
      class="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 text-center border border-slate-100"
    >
      <div
        class="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>

      <h3 class="text-lg font-bold text-slate-800">Veritabanını Sil</h3>
      <p class="text-sm text-slate-500 mt-2">
        Bu veritabanını ve bağlı tüm tabloları silmek istediğinize emin misiniz?
      </p>

      <div class="mt-6 flex justify-center gap-3">
        <button
          @click="closeDeletePopup"
          class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-lg transition"
        >
          İptal
        </button>
        <button
          @click="confirmDelete"
          class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition"
        >
          Evet, Sil
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { Search } from 'lucide-vue-next';
import { databaseService } from '../services/database.service';
import DatabaseModal from './Database/components/DatabaseModal.vue';
import DatabaseDetailModal from './Database/components/DatabaseDetailModal.vue';

const rawDatabases = ref([]);
const searchQuery = ref('');
const selectedStatus = ref('ALL');
const isLoading = ref(true);

const sortKey = ref('');
const sortOrder = ref('asc');

const isModalOpen = ref(false);
const selectedDb = ref(null);

const openCreateModal = () => {
  selectedDb.value = null;
  isModalOpen.value = true;
};

const openEditModal = (db) => {
  selectedDb.value = { ...db };
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedDb.value = null;
};

const isDetailOpen = ref(false);
const detailData = ref(null);

const openDetailModal = (db) => {
  detailData.value = db;
  isDetailOpen.value = true;
};

const isDeletePopupOpen = ref(false);
const dbToDeleteId = ref(null);

const openDeletePopup = (id) => {
  dbToDeleteId.value = id;
  isDeletePopupOpen.value = true;
};

const confirmDelete = async () => {
  if (dbToDeleteId.value) {
    await databaseService.deleteDatabase(dbToDeleteId.value);
    rawDatabases.value = await databaseService.getAllDatabases();
  }
  isDeletePopupOpen.value = false;
  dbToDeleteId.value = null;
};

const closeDeletePopup = () => {
  isDeletePopupOpen.value = false;
  dbToDeleteId.value = null;
};

const handleSaveDatabase = async (formData) => {
  if (selectedDb.value) {
    await databaseService.updateDatabase(selectedDb.value.id, formData);
  } else {
    await databaseService.createDatabase(formData);
  }
  rawDatabases.value = await databaseService.getAllDatabases();
};

//pagination
const currentPage = ref(1);
const itemsPerPage = ref(4);

const totalPages = computed(() => {
  return Math.ceil(sortedDatabases.value.length / itemsPerPage.value) || 1;
});

//sayfalanmış liste
const paginatedDatabases = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return sortedDatabases.value.slice(start, end);
});

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

onMounted(async () => {
  isLoading.value = true;
  rawDatabases.value = await databaseService.getAllDatabases();
  isLoading.value = false;
});

const filteredDatabases = computed(() => {
  return rawDatabases.value.filter((db) => {
    const matchesSearch = db.name
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase());
    const matchesStatus =
      selectedStatus.value === 'ALL' || db.status === selectedStatus.value;
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
watch([searchQuery, selectedStatus], () => {
  currentPage.value = 1;
});
</script>
