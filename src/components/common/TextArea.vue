<script setup lang="ts">
import { useField } from 'vee-validate';

interface Props {
  className?: string;
  placeholder?: string;
  rows?: number;
  name: string;
}
const props = defineProps<Props>();

const { value, errorMessage } = useField<string>(props.name);
</script>

<template>
  <textarea
    :rows="rows"
    :class="[
      'rounded-xl w-full py-1 px-3 outline-none resize-none',
      className,
      errorMessage && 'border border-rose-400 !bg-rose-400/10',
    ]"
    :placeholder="placeholder"
    v-model.trim="value"
  ></textarea>
</template>
