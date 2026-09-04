<template>
  <router-view />

  <div class="fixed top-4 right-4 z-50 space-y-2 pointer-events-none">
    <div
      v-for="toast in notifications"
      :key="toast.id"
      class="pointer-events-auto px-4 py-3 rounded-lg shadow-lg text-white text-sm font-medium transition-all transform duration-300"
      :class="[
        toast.type === 'success'
          ? 'bg-emerald-600'
          : toast.type === 'error'
            ? 'bg-red-600'
            : 'bg-slate-800',
      ]"
    >
      {{ toast.message }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const notifications = computed(
  () => store.getters['notification/allNotifications']
);
</script>
