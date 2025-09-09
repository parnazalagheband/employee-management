<template>
  <v-text-field
    v-model="value"
    :label="label"
    :placeholder="placeholder"
    :error-messages="errorMessage"
    :variant="variant"
  />
</template>

<script setup>
import { useField } from "vee-validate";

const field = computed(() => props.fieldKey);

const props = defineProps({
  fieldKey: {
    type: String,
    required: true,
  },
  variant: {
    type: String,
    default: "outlined",
  },
  rules: {
    type: Function,
    default: () => "",
  },
  label: String,
  placeholder: String,
});

const { value, errorMessage } = useField(field, props.rules);
</script>
