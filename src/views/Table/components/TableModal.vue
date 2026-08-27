<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
  >
    <div
      class="bg-white rounded-xl shadow-xl w-full max-w-md p-6 border border-gray-100"
    >
      <div class="flex items-center justify-between border-b pb-3 mb-4">
        <h3 class="text-lg font-bold text-gray-800">
          {{ isEditMode ? 'Tabloyu Düzenle' : 'Yeni Tablo Oluştur' }}
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
            >Tablo Adı</label
          >
          <input
            v-model="name"
            type="text"
            placeholder="ornek_tablo"
            class="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-blue-500"
            :class="{ 'border-red-500': errors.name }"
          />
          <span class="text-xs text-red-500 mt-1 block">{{ errors.name }}</span>
        </div>

        <div>
          <label class="block text-xs font-semibold text-gray-700 mb-1"
            >Depolama Motoru</label
          >
          <select
            v-model="engine"
            class="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-blue-500 text-gray-700"
          >
            <option value="InnoDB">
              InnoDB
            </option>
            <option value="MyISAM">MyISAM</option>
            <option value="Memory">Memory</option>
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
            class="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            {{ isEditMode ? 'Kaydet' : 'Oluştur' }}
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
    .required('Tablo adı zorunludur.')
    .min(2, 'En az 2 karakter olmalıdır.')
    .matches(
      /^[a-z0-9_]+$/,
      'Yalnızca küçük harf, rakam ve alt çizgi (_) içerebilir.'
    ),
  engine: yup.string().required(),
});

const { handleSubmit, errors, resetForm, setValues } = useForm({
  validationSchema: schema,
  initialValues: {
    name: '',
    engine: 'InnoDB',
  },
});

const { value: name } = useField('name');
const { value: engine } = useField('engine');

watch(
  () => props.editData,
  (newVal) => {
    if (newVal) {
      setValues({
        name: newVal.name,
        engine: newVal.engine,
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
