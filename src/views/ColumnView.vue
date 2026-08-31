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
      <button
        @click="openCreateModal"
        class="w-full sm:w-auto px-4 py-2 bg-blue-800 text-white rounded-lg text-sm font-medium hover:bg-blue-900 transition-colors shadow-sm cursor-pointer"
      >
        + Yeni Kolon Ekle
      </button>
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
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { Columns, Key } from 'lucide-vue-next';
import { columnService } from '../services/column.service';

const route = useRoute();
const databaseId = route.params.databaseId || 1;
const tableId = route.params.tableId || 1;

const columns = ref([]);
const isLoading = ref(true);

const isModalOpen = ref(false);
const selectedColumn = ref(null);

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
</script>
