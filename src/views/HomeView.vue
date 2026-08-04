<template>
  <div class="flex items-center justify-center pt-10">
    <div
      class="bg-white p-8 rounded-xl shadow-sm border border-stone-200 text-center max-w-lg w-full"
    >
      <h1 class="text-2xl font-bold text-stone-800 mb-3">
        {{ appName }}
      </h1>
      <p class="text-stone-600 text-sm leading-relaxed">
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
