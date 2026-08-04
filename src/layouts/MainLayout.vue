<template>
  <div class="min-h-screen flex bg-stone-50 font-sans">
    <aside
      class="w-64 bg-linear-to-b from-[#4c0519] to-[#881337] text-white flex flex-col justify-between p-4"
    >
      <div>
        <div
          class="h-16 flex items-center gap-3 px-3 border-b border-rose-900/40"
        >
          <Database class="text-rose-200" :size="24" />
          <h2 class="font-bold text-lg text-rose-50 tracking-wide">
            DBMS PANEL
          </h2>
        </div>

        <nav class="mt-6 flex flex-col gap-1.5">
          <router-link
            to="/"
            class="flex items-center gap-3 px-4 py-3 rounded-lg text-rose-100/90 text-sm hover:bg-white/10 transition-colors"
            active-class="bg-rose-950/80 text-white font-medium shadow-sm border border-rose-800/50"
          >
            <LayoutDashboard :size="20" />
            <span>Dashboard</span>
          </router-link>

          <router-link
            to="/databases"
            class="flex items-center gap-3 px-4 py-3 rounded-lg text-rose-100/90 text-sm hover:bg-white/10 transition-colors"
            active-class="bg-rose-950/80 text-white font-medium shadow-sm border border-rose-800/50"
          >
            <Database :size="20" />
            <span>Veritabanları</span>
          </router-link>
        </nav>
      </div>

      <div
        class="pt-4 border-t border-rose-900/40 flex items-center gap-3 px-2"
      >
        <div
          class="w-9 h-9 rounded-full bg-rose-950 text-rose-100 font-bold text-xs flex items-center justify-center border border-rose-800"
        >
          HS
        </div>
        <div>
          <p class="text-sm font-medium text-rose-50">Hatice Sarımustafaoğlu</p>
          <p class="text-xs text-rose-200/70">Frontend Stajyeri</p>
        </div>
      </div>
    </aside>

    <div class="flex-1 flex flex-col">
      <header
        class="h-16 bg-white border-b border-stone-200 px-8 flex items-center justify-between shadow-xs"
      >
        <h1 class="text-base font-semibold text-stone-700">
          Veritabanı Yönetim Sistemi
        </h1>
        <span
          class="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-medium rounded-full flex items-center gap-1.5"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          Sistem Aktif
        </span>
      </header>

      <main class="p-8 flex-1 overflow-y-auto">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { LayoutDashboard, Database } from 'lucide-vue-next';
</script>
