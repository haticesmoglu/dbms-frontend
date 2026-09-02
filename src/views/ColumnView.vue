<template>
  <div class="space-y-6">
    <div
      class="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
    >
      <div>
        <div class="flex items-center gap-2 mb-1">
          <router-link
            :to="`/databases/${databaseId}/tables`"
            class="text-xs text-blue-700 hover:underline flex items-center gap-1 font-medium"
          >
            ← Tablolara Dön
          </router-link>
        </div>
        <h1 class="text-2xl font-bold text-gray-900">Kolon Yönetimi</h1>
        <p class="text-sm text-gray-500">
          Tablonun kolonlarını, veri tiplerini ve kısıtlamalarını yönetin.
        </p>
      </div>
      <div class="flex items-center gap-3">
        <button
          type="button"
          @click="exportTableExcel"
          class="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition shadow-sm cursor-pointer"
          title="Şemayı indir"
        >
          <Download class="w-4 h-4 text-gray-500" />
          <span>Şemayı Dışa Aktar (.csv / Excel)</span>
        </button>
        <button
          @click="openCreateModal"
          class="w-full sm:w-auto px-4 py-2 bg-blue-800 text-white rounded-lg text-sm font-medium hover:bg-blue-900 transition-colors shadow-sm cursor-pointer"
        >
          + Yeni Kolon
        </button>
      </div>
    </div>
    <div
      class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
    >
      <div v-if="isLoading" class="p-8 text-center text-gray-500 text-sm">
        Kolonlar yükleniyor...
      </div>

      <div
        v-else-if="columns.length === 0"
        class="p-8 text-center text-gray-500 text-sm"
      >
        Bu tabloda henüz tanımlı kolon bulunmuyor. Yeni bir kolon
        oluşturabilirsiniz.
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full text-left border-collapse text-sm">
          <thead>
            <tr
              class="bg-gray-50 text-gray-500 text-xs font-semibold uppercase tracking-wider whitespace-nowrap"
            >
              <th class="py-3 px-6">Kolon Adı</th>
              <th class="py-3 px-6">Veri Tipi</th>
              <th class="py-3 px-6">Primary Key (PK)</th>
              <th class="py-3 px-6">Nullable</th>
              <th class="py-3 px-6">Varsayılan Değer</th>
              <th class="py-3 px-6">Auto Increment</th>
              <th class="py-3 px-6 text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 text-gray-700">
            <tr
              v-for="col in columns"
              :key="col.id"
              class="hover:bg-gray-50 transition-colors whitespace-nowrap"
            >
              <td
                class="py-4 px-6 font-semibold text-gray-900 flex items-center gap-2"
              >
                <Columns class="w-4 h-4 text-blue-500 shrink-0" />
                {{ col.name }}
              </td>

              <td class="py-4 px-6 font-mono text-xs text-slate-500">
                {{ col.type }}
              </td>

              <td class="py-4 px-6">
                <span
                  v-if="col.isPrimaryKey"
                  class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-black tracking-wider bg-amber-500/10 text-amber-600 border border-amber-400/60 shadow-sm"
                >
                  <Key class="w-3.5 h-3.5 text-amber-500 stroke-[2.5]" /> PK
                </span>
                <span v-else class="text-gray-300 font-light text-xs pl-2"
                  >-</span
                >
              </td>

              <td class="py-4 px-6">
                <span
                  :class="[
                    'px-2 py-0.5 rounded text-xs font-medium inline-block',
                    col.isNullable
                      ? 'bg-blue-50 text-blue-700'
                      : 'bg-gray-100 text-gray-600',
                  ]"
                >
                  {{ col.isNullable ? 'NULL' : 'NOT NULL' }}
                </span>
              </td>

              <td class="py-4 px-6 font-mono text-xs text-gray-500">
                {{ col.defaultValue || 'None' }}
              </td>

              <td class="py-4 px-6">
                <span
                  v-if="col.isAutoIncrement"
                  class="px-2 py-0.5 rounded text-xs font-semibold bg-purple-100 text-purple-700 inline-block"
                >
                  A_I
                </span>
                <span v-else class="text-gray-400 text-xs">-</span>
              </td>

              <td class="py-4 px-6 text-right space-x-2">
                <button
                  @click="openEditModal(col)"
                  class="text-blue-600 hover:underline text-xs font-medium cursor-pointer"
                >
                  Düzenle
                </button>
                <button
                  @click="openDeletePopup(col.id)"
                  class="text-sm font-medium text-red-600 hover:text-red-800 cursor-pointer"
                >
                  Sil
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <ColumnModal
      :is-open="isModalOpen"
      :edit-data="selectedColumn"
      @close="closeModal"
      @save="handleSaveColumn"
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

        <h3 class="text-lg font-bold text-slate-800">Kolonu Sil</h3>
        <p class="text-sm text-slate-500 mt-2">
          Bu kolonu silmek istediğinize emin misiniz?
        </p>

        <div class="mt-6 flex justify-center gap-3">
          <button
            type="button"
            @click="closeDeletePopup"
            class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-lg transition cursor-pointer"
          >
            İptal
          </button>
          <button
            type="button"
            @click="confirmDelete"
            class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition cursor-pointer"
          >
            Evet, Sil
          </button>
        </div>
      </div>
    </div>
    <div
      v-if="isAlertPopupOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <div
        class="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 text-center border border-slate-100"
      >
        <div
          class="w-12 h-12 rounded-2xl bg-slate-100 text-slate-600 flex items-center justify-center mx-auto mb-4 border border-slate-200/70 shadow-xs"
        >
          <FileWarning class="w-6 h-6 stroke-2" />
        </div>

        <h3 class="text-lg font-bold text-slate-900">Dışa Aktarılamadı</h3>
        <p class="text-sm text-slate-500 mt-2 leading-relaxed">
          Tabloda dışa aktarılacak herhangi bir kolon bulunamadı. Lütfen önce
          tabloya kolon ekleyin.
        </p>

        <div class="mt-6 flex justify-center">
          <button
            type="button"
            @click="isAlertPopupOpen = false"
            class="w-full py-2.5 bg-blue-800 hover:bg-blue-900 text-white text-sm font-semibold rounded-xl transition shadow-sm cursor-pointer"
          >
            Tamam, Anladım
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { Columns, Key, Download, FileWarning } from 'lucide-vue-next';
import { columnService } from '../services/column.service';
import ColumnModal from './Column/components/ColumnModal.vue';
import { exportTableToExcel } from '../utils/excelGenerator';

const route = useRoute();
const databaseId = route.params.databaseId || 1;
const tableId = route.params.tableId || 1;

const columns = ref([]);
const isLoading = ref(true);

const isModalOpen = ref(false);
const selectedColumn = ref(null);

const isDeletePopupOpen = ref(false);
const columnToDeleteId = ref(null);

const isAlertPopupOpen = ref(false);

const loadColumns = async () => {
  isLoading.value = true;
  columns.value = await columnService.getColumnsByTableId(tableId);
  isLoading.value = false;
};

onMounted(loadColumns);

const openCreateModal = () => {
  selectedColumn.value = null;
  isModalOpen.value = true;
};

const openEditModal = (col) => {
  selectedColumn.value = col;
  isModalOpen.value = true;
};
const closeModal = () => {
  isModalOpen.value = false;
  selectedColumn.value = null;
};

const handleSaveColumn = async (formData) => {
  if (selectedColumn.value) {
    await columnService.updateColumn(selectedColumn.value.id, formData);
  } else {
    await columnService.createColumn({
      ...formData,
      tableId: Number(tableId),
    });
  }
  await loadColumns();
};

const openDeletePopup = (id) => {
  columnToDeleteId.value = id;
  isDeletePopupOpen.value = true;
};

const confirmDelete = async () => {
  if (columnToDeleteId.value) {
    await columnService.deleteColumn(columnToDeleteId.value);
    await loadColumns();
  }
  isDeletePopupOpen.value = false;
  columnToDeleteId.value = null;
};

const closeDeletePopup = () => {
  isDeletePopupOpen.value = false;
  columnToDeleteId.value = null;
};
const exportTableExcel = () => {
  if (columns.value.length === 0) {
    isAlertPopupOpen.value = true;
    return;
  }

  const tableName = route.params.tableName || `table_${tableId}`;
  exportTableToExcel(tableName, columns.value);
};
</script>
