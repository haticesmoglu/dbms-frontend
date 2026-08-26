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
                <button
                  @click="handleDelete(table.id)"
                  class="text-red-600 hover:underline text-xs font-medium"
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
const handleDelete = async (id) => {
  if (confirm('Bu tabloyu silmek istediğinize emin misiniz?')) {
    await tableService.deleteTable(id);
    await loadTables();
  }
};
</script>
