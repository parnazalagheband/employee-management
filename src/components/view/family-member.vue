<template>
  <v-container>
    <fieldset class="border-md rounded">
      <legend class="text-h6 mr-5 pa-2">
        <div class="d-flex align-center">
          <span>#{{ index }}</span>
          <v-btn
            @click="$emit('removeMember', index)"
            variant="text"
            icon="mdi-delete"
            color="red"
          ></v-btn>
        </div>
      </legend>
      <v-form class="pa-3">
        <v-row>
          <v-col cols="12" md="6" sm="12">
            <v-text-field
              label="نام"
              placeholder="سارا"
              type="text"
              variant="outlined"
              v-model="name"
              :error-messages="nameError"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              :class="`custom-input-${index}`"
              variant="outlined"
              append-inner-icon="mdi-calendar-week-begin-outline"
              v-model="dob"
              :error-messages="dobError"
              placeholder="تاریخ تولد"
            />
            <date-picker
              color="#536DFE"
              format="jYYYY/jMM/jDD"
              locale="fa"
              v-model="dob"
              :custom-input="`.custom-input-${index}`"
              type="date"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6" sm="12">
            <v-select
              v-model="relation"
              label="نسبت"
              variant="outlined"
              :items="relations"
              item-title="title"
              item-value="value"
              :error-messages="relationError"
            />
          </v-col>
        </v-row>
      </v-form>
    </fieldset>
  </v-container>
</template>

<script setup>
import { useField } from "vee-validate";
import { employeeRules } from "@/validation/employeeRules";

const props = defineProps({
  index: Number,
  memberName: String,
  memberRelation: String,
  memberBirthday: String,
});

const memberName = computed(() => props.memberName);
const memberRelation = computed(() => props.memberRelation);
const memberBirthday = computed(() => props.memberBirthday);

const { value: name, errorMessage: nameError } = useField(
  memberName,
  employeeRules.family.name
);
const { value: relation, errorMessage: relationError } = useField(
  memberRelation,
  employeeRules.family.relation
);
const { value: dob, errorMessage: dobError } = useField(
  memberBirthday,
  employeeRules.family.dateOfBirth
);

const relations = [
  { title: "دختر", value: "daughter" },
  { title: "پسر", value: "son" },
  { title: "همسر", value: "spouse" },
];
</script>
