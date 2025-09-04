<template>
  <v-container>
    <fieldset class="border-md rounded">
      <legend class="text-h6 mr-5 pa-2">
        <div class="d-flex align-center">
          <span>#{{ index }}</span>
          <v-btn @click="$emit('removeMember', index)" variant="text" icon="mdi-delete" color="red"></v-btn>
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
              v-model="memberInfo.name"
              @update:modelValue="updateFamilyMember"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              :class="`custom-input-${index}`"
              variant="outlined"
              append-inner-icon="mdi-calendar-week-begin-outline"
              v-model="memberInfo.dateOfBirth"
              @update:modelValue="updateFamilyMember"
              placeholder="روز / ماه / سال"
            >
            </v-text-field>
            <date-picker
              color="#536DFE"
              format="jYYYY/jMM/jDD"
              locale="fa"
              placeholder="روز / ماه / سال"
              v-model="memberInfo.dateOfBirth"
              :custom-input="`.custom-input-${index}`"
              type="date"
            ></date-picker>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6" sm="12">
            <v-select
              v-model="memberInfo.relation"
              @update:modelValue="updateFamilyMember"
              label="نسبت"
              variant="outlined"
              :items="relations"
              item-title="title"
              item-value="value"
            ></v-select>
          </v-col>
        </v-row>
      </v-form>
    </fieldset>
  </v-container>
</template>

<script setup>
import { convertDatee } from "@/composables/convertDate";
const { toJalali } = convertDatee();

const emit = defineEmits(['removeMember','updateMember']);

const relations = [
  { title: "دختر", value: "daughter" },
  { title: "پسر", value: "son" },
  { title: "همسر", value: "spouse" },
];

const props = defineProps({
  member: {
    type: Object,
    default: () => ({}),
  },
  index: {
    type: Number,
    required: true,
  },
});

const memberInfo = ref({
  name: "",
  dateOfBirth: "",
  relation: "",
});

const updateFamilyMember = () =>{
  emit("updateMember", props.index, memberInfo.value);
}

onMounted(() => {
  if (props.member) {
    memberInfo.value = {
      name: props.member.name || "",
      dateOfBirth: props.member.dateOfBirth ? toJalali(props.member.dateOfBirth) : "",
      relation: props.member.relation || "",
    };
  }
});
</script>
