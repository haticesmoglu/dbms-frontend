<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
  >
    <div
      class="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 border border-gray-100"
    >
      <div class="flex items-center justify-between border-b pb-3 mb-4">
        <h3 class="text-lg font-bold text-gray-800">
          {{ isEditMode ? 'Kolonu Düzenle' : 'Yeni Kolon Ekle' }}
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
            >Kolon Adı</label
          >
          <input
            v-model="name"
            type="text"
            placeholder="ornek_kolon"
            class="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-blue-500 font-mono"
            :class="{ 'border-red-500': errors.name }"
          />
          <span class="text-xs text-red-500 mt-1 block">{{ errors.name }}</span>
        </div>

        <div>
          <label class="block text-xs font-semibold text-gray-700 mb-1"
            >Veri Tipi</label
          >
          <select
            v-model="type"
            class="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-blue-500 text-gray-700"
          >
            <option value="INT">INT</option>
            <option value="VARCHAR(255)">VARCHAR(255)</option>
            <option value="TEXT">TEXT</option>
            <option value="BOOLEAN">BOOLEAN</option>
            <option value="DATETIME">DATETIME</option>
            <option value="DECIMAL(10,2)">DECIMAL(10,2)</option>
          </select>
        </div>

        <div>
          <label class="block text-xs font-semibold text-gray-700 mb-1"
            >Varsayılan Değer (Default Value)</label
          >
          <input
            v-model="defaultValue"
            type="text"
            placeholder="NULL veya varsayılan metin"
            class="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-blue-500"
          />
        </div>

        <div
          class="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100"
        >
          <label
            class="flex items-center gap-2 text-xs font-medium text-gray-700 cursor-pointer"
          >
            <input
              v-model="isPrimaryKey"
              type="checkbox"
              class="rounded text-blue-600 focus:ring-blue-500"
            />
            Primary Key
          </label>

          <label
            class="flex items-center gap-2 text-xs font-medium text-gray-700 cursor-pointer"
          >
            <input
              v-model="isNullable"
              type="checkbox"
              class="rounded text-blue-600 focus:ring-blue-500"
            />
            Nullable
          </label>

          <label
            class="flex items-center gap-2 text-xs font-medium text-gray-700 cursor-pointer"
          >
            <input
              v-model="isAutoIncrement"
              type="checkbox"
              class="rounded text-blue-600 focus:ring-blue-500"
            />
            Auto Increment
          </label>
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
            class="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            {{ isEditMode ? 'Kaydet' : 'Kolon Ekle' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue';
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
    .required('Kolon adı zorunludur.')
    .min(1, 'En az 1 karakter olmalıdır.')
    .matches(
      /^[a-z0-9_]+$/,
      'Yalnızca küçük harf, rakam ve alt çizgi (_) içerebilir.'
    ),
  type: yup.string().required(),
  defaultValue: yup.string().nullable(),
  isPrimaryKey: yup.boolean(),
  isNullable: yup.boolean(),
  isAutoIncrement: yup.boolean(),
});

const { handleSubmit, errors, resetForm, setValues } = useForm({
  validationSchema: schema,
  initialValues: {
    name: '',
    type: 'INT',
    defaultValue: '',
    isPrimaryKey: false,
    isNullable: true,
    isAutoIncrement: false,
  },
});

const { value: name } = useField('name');
const { value: type } = useField('type');
const { value: defaultValue } = useField('defaultValue');
const { value: isPrimaryKey } = useField('isPrimaryKey');
const { value: isNullable } = useField('isNullable');
const { value: isAutoIncrement } = useField('isAutoIncrement');

watch(
  () => props.editData,
  (newVal) => {
    if (newVal) {
      setValues({
        name: newVal.name,
        type: newVal.type,
        defaultValue: newVal.defaultValue || '',
        isPrimaryKey: newVal.isPrimaryKey,
        isNullable: newVal.isNullable,
        isAutoIncrement: newVal.isAutoIncrement,
      });
    } else {
      resetForm();
    }
  }
);

const close = () => {
  resetForm();
  emit('close');
};

const onSubmit = handleSubmit((values) => {
  emit('save', values);
  close();
});
</script>
