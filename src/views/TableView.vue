<template>
  <div class="space-y-6">
    <div
      class="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
    >
      <div>
        <div class="flex items-center gap-2 mb-1">
          <router-link
            to="/databases"
            class="text-xs text-blue-700 hover:underline flex items-center gap-1"
          >
            ← Veritabanlarına Dön
          </router-link>
        </div>
        <h1 class="text-2xl font-bold text-gray-900">Tablo Yönetimi</h1>
        <p class="text-sm text-gray-500">
          Seçili veritabanı altındaki tabloları görüntüleyin ve yönetin.
        </p>
      </div>
      <button
        @click="openCreateModal"
        class="w-full sm:w-auto px-4 py-2 bg-blue-800 text-white rounded-lg text-sm font-medium hover:bg-blue-900 transition-colors shadow-sm"
      >
        + Yeni Tablo
      </button>
    </div>

    <div
      class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
    >
      <div v-if="isLoading" class="p-8 text-center text-gray-500">
        Tablolar yükleniyor...
      </div>

      <div
        v-else-if="tables.length === 0"
        class="p-8 text-center text-gray-500"
      >
        Bu veritabanında henüz tablo bulunmuyor. Yeni bir tablo
        oluşturabilirsiniz.
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full text-left border-collapse text-sm">
          <thead>
            <tr
              class="bg-gray-50 text-gray-500 text-xs font-semibold uppercase tracking-wider"
            >
              <th class="py-3 px-6">Tablo Adı</th>
              <th class="py-3 px-6">Motor</th>
              <th class="py-3 px-6">Satır Sayısı</th>
              <th class="py-3 px-6">Boyut</th>
              <th class="py-3 px-6">Oluşturulma</th>
              <th class="py-3 px-6 text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 text-gray-700">
            <tr
              v-for="table in tables"
              :key="table.id"
              class="hover:bg-gray-50 transition-colors"
            >
              <td
                class="py-4 px-6 font-semibold text-gray-900 flex items-center gap-2"
              >
                <TableIcon class="w-4 h-4 text-blue-500" />
                {{ table.name }}
              </td>
              <td class="py-4 px-6 font-mono text-xs text-slate-500">
                {{ table.engine }}
              </td>
              <td class="py-4 px-6">{{ table.rowsCount }}</td>
              <td class="py-4 px-6">{{ table.size }}</td>
              <td class="py-4 px-6 text-xs text-gray-500">
                {{ table.createdAt }}
              </td>
              <td class="py-4 px-6 text-right space-x-2">
                <button
                  @click="openEditModal(table)"
                  class="text-blue-600 hover:underline text-xs font-medium"
                >
                  Düzenle
                </button>
                <router-link
                  :to="`/databases/${databaseId}/tables/${table.id}/columns`"
                  class="text-emerald-700 hover:underline text-xs font-medium"
                >
                  Kolonlar
                </router-link>
                <button
                  @click="openDeletePopup(table.id)"
                  class="text-sm font-medium text-red-600 hover:text-red-800"
                >
                  Sil
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <TableModal
      :is-open="isModalOpen"
      :edit-data="selectedTable"
      @close="closeModal"
      @save="handleSaveTable"
    />
    <div
      v-if="isDeletePopupOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <div
        class="bg-white rounded-xl shadow-xl max-w-sm w-full p-6 text-center"
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

        <h3 class="text-lg font-bold text-slate-800">Tabloyu Sil</h3>
        <p class="text-sm text-slate-500 mt-2">
          Bu tabloyu silmek istediğinize emin misiniz?
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
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { Table as TableIcon } from 'lucide-vue-next';
import { tableService } from '../services/table.service';
import TableModal from './Table/components/TableModal.vue';

const route = useRoute();
const databaseId = route.params.databaseId || 1;

const tables = ref([]);
const isLoading = ref(true);
const isModalOpen = ref(false);
const selectedTable = ref(null);

const isDeletePopupOpen = ref(false);
const tableToDeleteId = ref(null);

const loadTables = async () => {
  isLoading.value = true;
  tables.value = await tableService.getTablesByDatabaseId(databaseId);
  isLoading.value = false;
};

onMounted(loadTables);

const openCreateModal = () => {
  selectedTable.value = null;
  isModalOpen.value = true;
};
const openEditModal = (table) => {
  selectedTable.value = { ...table };
  isModalOpen.value = true;
};
const closeModal = () => {
  isModalOpen.value = false;
  selectedTable.value = null;
};
const handleSaveTable = async (formData) => {
  if (selectedTable.value) {
    await tableService.updateTable(selectedTable.value.id, formData);
  } else {
    await tableService.createTable({
      ...formData,
      databaseId: Number(databaseId),
    });
  }
  await loadTables();
};

const openDeletePopup = (id) => {
  tableToDeleteId.value = id;
  isDeletePopupOpen.value = true;
};

const confirmDelete = async () => {
  if (tableToDeleteId.value) {
    await tableService.deleteTable(tableToDeleteId.value);
    await loadTables();
  }
  isDeletePopupOpen.value = false;
  tableToDeleteId.value = null;
};

const closeDeletePopup = () => {
  isDeletePopupOpen.value = false;
  tableToDeleteId.value = null;
};
</script>
