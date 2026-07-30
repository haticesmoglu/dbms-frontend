<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-md text-center">
      <h1 class="text-3xl font-bold text-blue-600 mb-4">
        {{ appName }}
      </h1>
      <p class="text-gray-600">
        Kurumsal veritabanı altyapısına ve yönetim araçlarına erişmek için
        paneli kullanabilirsiniz.
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const appName = computed(() => store.state.appName);
</script>
