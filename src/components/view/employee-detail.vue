<template>
  <v-container outlined>
    <fieldset
      :class="{
        'border-none': formType === 'update',
        'border-md': formType === 'create',
        rounded: formType === 'create',
        'pa-5': true,
      }"
    >
      <legend v-if="formType === 'create'" class="text-h5 mr-5 pa-2">
        افزودن کارمند
      </legend>
      <div class="d-flex" v-if="formType === 'update'">
        <v-btn
          size="small"
          variant="elevated"
          icon="mdi-delete"
          color="red"
          class="mr-auto"
        ></v-btn>
      </div>
      <v-form @submit.prevent="submitForm" class="mt-3">
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              label="نام"
              placeholder="سارا"
              type="text"
              variant="outlined"
              v-model="employeeData.firstName"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              label="نام خانوادگی"
              placeholder="امینی"
              type="text"
              variant="outlined"
              v-model="employeeData.lastName"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              class="custom-input"
              variant="outlined"
              append-inner-icon="mdi-calendar-week-begin-outline"
              v-model="employeeData.dateOfBirth"
              placeholder="روز / ماه / سال"
            >
            </v-text-field>
            <date-picker
              color="#536DFE"
              format="jYYYY/jMM/jDD"
              locale="fa"
              placeholder="روز / ماه / سال"
              v-model="employeeData.dateOfBirth"
              custom-input=".custom-input"
              type="date"
            ></date-picker>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              label="ایمیل"
              placeholder="sara@gmail.com"
              type="email"
              variant="outlined"
              v-model="employeeData.email"
            ></v-text-field>
          </v-col>
        </v-row>
        <fieldset class="border-md rounded pa-3 mt-3">
          <legend class="text-h5 mr-5 pa-2">اعضای خانواده</legend>
          <div v-if="employeeData.family?.length">
            <family-member
              v-for="(member, index) in employeeData.family"
              :key="index"
              :index="index + 1"
              :member="member"
              @removeMember="removeMember"
              @updateMember="updateMember"
            />
          </div>
          <div v-else class="text-center text-grey text-body-2 pa-2">
            هیچ عضوی ثبت نشده است
          </div>
          <v-card-actions class="pr-4">
            <v-btn @click="addMember" variant="flat" color="blue"
              >افزودن عضو</v-btn
            >
          </v-card-actions>
        </fieldset>
        <div
          v-if="formType === 'create'"
          class="d-flex justify-space-between mt-3"
        >
          <v-btn type="submit" color="green">افزودن</v-btn>
          <v-btn @click="cancelAddEmployee" color="grey">انصراف</v-btn>
        </div>
        <div v-if="formType === 'update'" class="text-center mt-3">
          <v-btn type="submit" color="green">بروزرسانی</v-btn>
        </div>
      </v-form>
    </fieldset>
  </v-container>
</template>

<script setup>
import { convertDatee } from "@/composables/convertDate";
const { toJalali, toIso } = convertDatee();
import { useEmployeeStore } from "@/stores/employee";

const employeeStore = useEmployeeStore();
const emit = defineEmits(["cancelAddEmployee", "closeEditEmployee"]);

const props = defineProps({
  formData: {
    type: Object,
    default: () => ({}),
  },
  formType: {
    type: String,
    required: true,
    validator: (val) => ["create", "update"].includes(val),
  },
  id: {
    type: String,
    default: "",
  },
});

const employeeData = ref({
  firstName: "",
  lastName: "",
  email: "",
  dateOfBirth: "",
  family: [],
});

watch(
  () => props.formData,
  (newVal) => {
    if (props.formType === "update" && newVal) {
      employeeData.value.firstName = props.formData.firstName;
      employeeData.value.lastName = props.formData.lastName;
      employeeData.value.email = props.formData.email;
      employeeData.value.dateOfBirth = toJalali(props.formData.dateOfBirth);
      employeeData.value.family = props.formData.family;
    }
  },
  { immediate: true, deep: true }
);

const cancelAddEmployee = () => {
  emit("cancelAddEmployee");
  resetForm();
};

const addMember = () => {
  employeeData.value.family.push({
    name: "",
    relation: "",
    dateOfBirth: "",
  });
};

const removeMember = (index) => {
  employeeData.value.family.splice(index - 1, 1);
};

const updateMember = (index, member) => {
  employeeData.value.family[index - 1] = { ...member };
};

const submitForm = () => {
  const payload = {
    ...employeeData.value,
    dateOfBirth: toIso(employeeData.value.dateOfBirth),
    family: employeeData.value.family.map((member) => ({
      ...member,
      dateOfBirth: toIso(member.dateOfBirth),
    })),
  };

  if (props.formType === "update") {
    employeeStore.updateEmployee(props.id, payload);
    emit("closeEditEmployee");
  }
  else{
    employeeStore.addEmployee(payload);
    cancelAddEmployee();
  }
};

const resetForm = () => {
  employeeData.value.firstName = "";
  employeeData.value.lastName = "";
  employeeData.value.email = "";
  employeeData.value.dateOfBirth = "";
  employeeData.value.family = [];
};
</script>
