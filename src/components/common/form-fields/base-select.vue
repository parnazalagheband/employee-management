<template>
  <v-select
    v-model="value"
    :label="label"
    :items="items"
    item-title="title"
    item-value="value"
    :variant="variant"
    :error-messages="errorMessage"
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
  label: String,
  variant: {
    type: String,
    default: "outlined",
  },
  items: {
    type: Array,
    required: true,
  },
});

const field = computed(() => props.fieldKey);

const { value, errorMessage } = useField(field);
</script>
