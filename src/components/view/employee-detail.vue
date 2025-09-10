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
        <delete-employee
          @closeEmployeeForm="$emit('closeEditEmployee')"
          :id="id"
        />
      </div>
      <v-form @submit.prevent="submitForm" class="mt-3">
        <v-row>
          <v-col cols="12" md="6">
            <base-input
              label="نام"
              placeholder="سارا"
              field-key="firstName"
            />
          </v-col>
          <v-col cols="12" md="6">
            <base-input
              label="نام خانوادگی"
              placeholder="امینی"
              field-key="lastName"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <base-date-picker
              placeholder="تاریخ تولد"
              field-key="dateOfBirth"
              :id="id"
            />
          </v-col>
          <v-col cols="12" md="6">
            <base-input
              label="ایمیل"
              placeholder="sara@gmail.com"
              field-key="email"
            />
          </v-col>
        </v-row>

        <fieldset class="border-md rounded pa-3 mt-3">
          <legend class="text-h5 mr-5 pa-2">اعضای خانواده</legend>
          <family-member-array field-key="family" />
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
import { ref, watch } from "vue";
import { useForm, useField, useFieldArray } from "vee-validate";
import { toast } from "@/plugins/toast";
import { employeeSchema } from "@/validation/employeeSchema";
import { convertDatee } from "@/composables/convertDate";
const { toJalali, toIso } = convertDatee();
import { useEmployeeStore } from "@/stores/employee";

const employeeStore = useEmployeeStore();
const emit = defineEmits(["cancelAddEmployee", "closeEditEmployee"]);

const props = defineProps({
  formData: Object,
  formType: { type: String, required: true },
  id: { type: String, default: "" },
});

const { handleSubmit, errors, resetForm, setValues } = useForm({
  validationSchema: employeeSchema,
  initialValues: {
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    family: [],
  },
});

if (props.formType === "update") {
  watch(
    () => props.formData,
    (newVal) => {
      if (newVal) {
        setValues({
          firstName: newVal.firstName,
          lastName: newVal.lastName,
          email: newVal.email,
          dateOfBirth: newVal.dateOfBirth ? toJalali(newVal.dateOfBirth) : "",
          family: (newVal.family || []).map((member) => ({
            ...member,
            dateOfBirth: member.dateOfBirth ? toJalali(member.dateOfBirth) : "",
          })),
        });
      }
    },
    { immediate: true }
  );
}

const cancelAddEmployee = () => {
  resetForm();
  emit("cancelAddEmployee");
};

const submitForm = handleSubmit((vals) => {
  const payload = {
    ...vals,
    dateOfBirth: toIso(vals.dateOfBirth),
    family: vals.family.map((member) => ({
      ...member,
      dateOfBirth: member.dateOfBirth ? toIso(member.dateOfBirth) : "",
    })),
  };

  if (props.formType === "update") {
    employeeStore.updateEmployee(props.id, payload);
    toast.success("اطلاعات کارمند با موفقیت به روزرسانی شد");
    emit("closeEditEmployee");
  } else {
    employeeStore.addEmployee(payload);
    toast.success("کارمند با موفقیت اضافه شد!");
    cancelAddEmployee();
  }
});
</script>
