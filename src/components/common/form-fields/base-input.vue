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
import { computed } from "vue";
import { useField } from "vee-validate";

const props = defineProps({
  fieldKey: {
    type: String,
    required: true,
  },
  variant: {
    type: String,
    default: "outlined",
  },
  label: String,
  placeholder: String,
});

const field = computed(() => props.fieldKey);

const { value, errorMessage } = useField(field);
</script>
