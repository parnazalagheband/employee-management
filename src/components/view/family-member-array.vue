<template>
  <FieldArray :name="fieldKey" v-slot="{ fields, push, remove }">
    <div v-if="fields.length">
      <div v-for="(field, index) in fields" :key="field.key">
        <family-member
          :index="index + 1"
          :field-path="`${fieldKey}.${index}`"
          @removeMember="remove(index)"
        />
      </div>
    </div>
    <div v-else class="text-center text-grey pa-2">هیچ عضوی ثبت نشده است</div>

    <v-card-actions class="pr-4">
      <v-btn
        @click="push({ name: '', relation: '', dateOfBirth: '' })"
        color="blue"
        variant="flat"
      >
        افزودن عضو
      </v-btn>
    </v-card-actions>
  </FieldArray>
</template>

<script setup>
import { FieldArray } from "vee-validate";

const props = defineProps({
  fieldKey: { type: String, default: "family" },
});
</script>
