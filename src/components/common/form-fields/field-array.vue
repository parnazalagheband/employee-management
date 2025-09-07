<template>
  <div v-if="fields.length">
    <family-member
      v-for="(member, index) in fields"
      :key="member.key"
      :index="index + 1"
      :memberName="`family.${index}.name`"
      :memberRelation="`family.${index}.relation`"
      :memberBirthday="`family.${index}.dateOfBirth`"
      @removeMember="remove(index)"
    />
  </div>
  <div v-else class="text-center text-grey pa-2">هیچ عضوی ثبت نشده است</div>
  <v-card-actions class="pr-4">
    <v-btn @click="addMember" color="blue" variant="flat">افزودن عضو</v-btn>
  </v-card-actions>
</template>

<script setup>
import { useFieldArray } from "vee-validate";

const props = defineProps({
  fieldKey: { type: String, default: "family" },
});

const { fields, push, remove } = useFieldArray(props.fieldKey);

const addMember = () => push({ name: "", relation: "", dateOfBirth: "" });
</script>
