<template>
  <div>
    <v-text-field
      :id="uniqueId"
      :value="value"
      readonly
      :placeholder="placeholder"
      append-inner-icon="mdi-calendar-week-begin-outline"
      variant="outlined"
      :error-messages="errorMessage"
    />
    <date-picker
      v-model="value"
      :custom-input="`#${uniqueId}`"
      format="jYYYY/jMM/jDD"
      locale="fa"
    />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useField } from "vee-validate";

const props = defineProps({
  fieldKey: { type: String, required: true },
  placeholder: String,
  id: { type: String, default: "" },
});

const uniqueId = `date-picker-${props.id}`;

const field = computed(() => props.fieldKey);

const { value, errorMessage } = useField(field);
</script>
