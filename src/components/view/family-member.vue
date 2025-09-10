<template>
  <v-container>
    <fieldset class="border-md rounded">
      <legend class="text-h6 mr-5 pa-2">
        <div class="d-flex align-center">
          <span>#{{ index }}</span>
          <v-btn
            @click="$emit('removeMember')"
            variant="text"
            icon="mdi-delete"
            color="red"
          ></v-btn>
        </div>
      </legend>
      <v-form class="pa-3">
        <v-row>
          <v-col cols="12" md="6" sm="12">
            <base-input
              label="نام"
              placeholder="سارا"
              :field-key="`${fieldPath}.name`"
            />
          </v-col>
          <v-col cols="12" md="6">
            <base-date-picker
              placeholder="تاریخ تولد"
              :field-key="`${fieldPath}.dateOfBirth`"
              :id="index"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6" sm="12">
            <base-select
              label="نسبت"
              placeholder="انتخاب کنید"
              :items="relations"
              :field-key="`${fieldPath}.relation`"
            />
          </v-col>
        </v-row>
      </v-form>
    </fieldset>
  </v-container>
</template>

<script setup>

import { useField } from "vee-validate";

const props = defineProps({
  index: Number,
  fieldPath: String,
});


const relations = [
  { title: "دختر", value: "daughter" },
  { title: "پسر", value: "son" },
  { title: "همسر", value: "spouse" },
];
</script>
