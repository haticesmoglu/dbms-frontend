<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">
        Veritabanı Yönetim Paneli
      </h1>
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
  </div>
</template>

<script setup>
import { Database, Table, Users, Activity } from 'lucide-vue-next';
</script>
