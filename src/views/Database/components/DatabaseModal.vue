<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
  >
    <div
      class="bg-white rounded-xl shadow-xl w-full max-w-md p-6 border border-gray-100"
    >
      <div class="flex items-center justify-between border-b pb-3 mb-4">
        <h3 class="text-lg font-bold text-gray-800">
          {{ isEditMode ? 'Veritabanını Düzenle' : 'Yeni Veritabanı Oluştur' }}
        </h3>
        <button
          @click="close"
          class="text-gray-400 hover:text-gray-600 text-lg font-bold"
        >
          ✕
        </button>
      </div>

      <form @submit="onSubmit" class="space-y-4">
        <div>
          <label class="block text-xs font-semibold text-gray-700 mb-1"
            >Veritabanı Adı</label
          >
          <input
            v-model="name"
            type="text"
            placeholder="ornek_db"
            class="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-rose-600 focus:ring-1 focus:ring-rose-600"
            :class="{ 'border-red-500': errors.name }"
          />
          <span class="text-xs text-red-500 mt-1 block">{{ errors.name }}</span>
        </div>

        <div>
          <label class="block text-xs font-semibold text-gray-700 mb-1"
            >Karakter Seti (Charset)</label
          >
          <select
            v-model="charset"
            class="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-rose-600 focus:ring-1 focus:ring-rose-600 text-gray-700"
            :class="{ 'border-red-500': errors.charset }"
          >
            <option value="utf8mb4">utf8mb4 (Önerilen)</option>
            <option value="utf8">utf8</option>
            <option value="latin1">latin1</option>
          </select>
          <span class="text-xs text-red-500 mt-1 block">{{
            errors.charset
          }}</span>
        </div>

        <div>
          <label class="block text-xs font-semibold text-gray-700 mb-1"
            >Durum</label
          >
          <select
            v-model="status"
            class="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-rose-600 focus:ring-1 focus:ring-rose-600 text-gray-700"
          >
            <option value="Active">Aktif</option>
            <option value="Inactive">Pasif</option>
            <option value="Maintenance">Bakımda</option>
          </select>
        </div>

        <div class="flex justify-end gap-3 pt-4 border-t">
          <button
            type="button"
            @click="close"
            class="px-4 py-2 border rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
          >
            İptal
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-rose-700 text-white rounded-lg text-sm font-medium hover:bg-rose-800 transition-colors shadow-sm"
          >
            {{ isEditMode ? 'Kaydet' : 'Oluştur' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';

const props = defineProps({
  isOpen: Boolean,
  editData: Object,
});

const emit = defineEmits(['close', 'save']);

const isEditMode = computed(() => !!props.editData);

const schema = yup.object({
  name: yup
    .string()
    .required('Veritabanı adı zorunludur.')
    .min(3, 'En az 3 karakter olmalıdır.')
    .matches(
      /^[a-z0-9_]+$/,
      'Yalnızca küçük harf, rakam ve alt çizgi (_) içerebilir.'
    ),
  charset: yup.string().required('Charset seçimi zorunludur.'),
  status: yup.string().required(),
});

const { handleSubmit, errors, resetForm, setValues } = useForm({
  validationSchema: schema,
  initialValues: {
    name: '',
    charset: 'utf8mb4',
    status: 'Active',
  },
});

const { value: name } = useField('name');
const { value: charset } = useField('charset');
const { value: status } = useField('status');

const close = () => {
  resetForm();
  emit('close');
};

const onSubmit = handleSubmit((values) => {
  emit('save', values);
  close();
});
</script>
