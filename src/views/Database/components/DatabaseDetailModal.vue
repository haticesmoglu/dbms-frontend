<template>
  <div
    v-if="isOpen && db"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
  >
    <div
      class="bg-white rounded-xl shadow-xl w-full max-w-md p-6 border border-gray-100"
    >
      <div class="flex items-center justify-between border-b pb-3 mb-4">
        <h3 class="text-lg font-bold text-gray-800">Veritabanı Detayı</h3>
        <button
          @click="$emit('close')"
          class="text-gray-400 hover:text-gray-600 text-lg font-bold"
        >
          ✕
        </button>
      </div>

      <div class="space-y-3 text-sm">
        <div class="flex justify-between py-2 border-b">
          <span class="text-gray-500">ID:</span>
          <span class="font-mono font-bold">{{ db.id }}</span>
        </div>
        <div class="flex justify-between py-2 border-b">
          <span class="text-gray-500">Veritabanı Adı:</span>
          <span class="font-bold text-gray-900">{{ db.name }}</span>
        </div>
        <div class="flex justify-between py-2 border-b">
          <span class="text-gray-500">Karakter Seti:</span>
          <span class="font-mono text-rose-700 font-semibold">{{
            db.charset
          }}</span>
        </div>
        <div class="flex justify-between py-2 border-b">
          <span class="text-gray-500">Tablo Sayısı:</span>
          <span>{{ db.tablesCount }}</span>
        </div>
        <div class="flex justify-between py-2 border-b">
          <span class="text-gray-500">Boyut:</span> <span>{{ db.size }}</span>
        </div>
        <div class="flex justify-between py-2 border-b">
          <span class="text-gray-500">Oluşturulma Tarihi:</span>
          <span>{{ db.createdAt || '-' }}</span>
        </div>
        <div class="flex justify-between py-2">
          <span class="text-gray-500">Durum:</span>
          <span class="font-semibold">{{ db.status }}</span>
        </div>
      </div>

      <div class="mt-6 flex justify-end">
        <button
          @click="$emit('close')"
          class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200"
        >
          Kapat
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  isOpen: Boolean,
  db: Object,
});
defineEmits(['close']);
</script>
