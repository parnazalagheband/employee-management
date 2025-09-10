<template>
  <v-select
    v-model="value"
    :label="label"
    :placeholder="placeholder"
    :items="items"
    :item-title="itemTitle"
    :item-value="itemValue"
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
  placeholder: String,
  variant: {
    type: String,
    default: "outlined",
  },
  items: {
    type: Array,
    required: true,
  },
  itemTitle: {
    type: String,
    default: "title",
  },
  itemValue: {
    type: String,
    default: "value",
  },
});

const { value, errorMessage } = useField(
  computed(() => props.fieldKey)
);
</script>
