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
            <v-text-field
              label="نام"
              placeholder="سارا"
              v-model="firstName"
              :error-messages="firstNameError"
              variant="outlined"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              label="نام خانوادگی"
              placeholder="امینی"
              v-model="lastName"
              :error-messages="lastNameError"
              variant="outlined"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              class="custom-input"
              :value="dateOfBirth"
              readonly
              placeholder="تاریخ تولد"
              append-inner-icon="mdi-calendar-week-begin-outline"
              variant="outlined"
              :error-messages="birthdayError"
            />
            <date-picker
              v-model="dateOfBirth"
              custom-input=".custom-input"
              format="jYYYY/jMM/jDD"
              locale="fa"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              label="ایمیل"
              placeholder="sara@gmail.com"
              v-model="email"
              :error-messages="emailError"
              variant="outlined"
            />
          </v-col>
        </v-row>

        <fieldset class="border-md rounded pa-3 mt-3">
          <legend class="text-h5 mr-5 pa-2">اعضای خانواده</legend>
          <div v-if="familyFields.length">
            <family-member
              v-for="(member, index) in familyFields"
              :key="member.key"
              :index="index + 1"
              :memberName="`family.${index}.name`"
              :memberRelation="`family.${index}.relation`"
              :memberBirthday="`family.${index}.dateOfBirth`"
              @removeMember="removeMember(index)"
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
import { ref, watch } from "vue";
import { useForm, useField, useFieldArray } from "vee-validate";
import { toast } from "@/plugins/toast";
import { employeeRules } from "@/validation/employeeRules";
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

const { handleSubmit, errors, setFieldValue, resetForm } = useForm({
  initialValues: {
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    family: [],
  },
});

const { value: firstName, errorMessage: firstNameError } = useField(
  "firstName",
  employeeRules.firstName
);
const { value: lastName, errorMessage: lastNameError } = useField(
  "lastName",
  employeeRules.lastName
);
const { value: email, errorMessage: emailError } = useField(
  "email",
  employeeRules.email
);
const { value: dateOfBirth, errorMessage: birthdayError } = useField(
  "dateOfBirth",
  employeeRules.dateOfBirth
);

const { fields: familyFields, push, remove, replace } = useFieldArray("family");

if (props.formType === "update") {
  watch(
    () => props.formData,
    (newVal) => {
      if (newVal) {
        setFieldValue("firstName", newVal.firstName);
        setFieldValue("lastName", newVal.lastName);
        setFieldValue("email", newVal.email);

        if (newVal.dateOfBirth) {
          setFieldValue("dateOfBirth", toJalali(newVal.dateOfBirth));
        } else {
          setFieldValue("dateOfBirth", "");
        }

        const familyWithJalali = (newVal?.family || []).map((member) => ({
          ...member,
          dateOfBirth: member.dateOfBirth ? toJalali(member.dateOfBirth) : "",
        }));

        setFieldValue("family", familyWithJalali);
      }
    },
    { immediate: true }
  );
}


const addMember = () => push({ name: "", relation: "", dateOfBirth: "" });

const removeMember = (index) => remove(index);

const updateMember = (index, member) =>
  setFieldValue(`family.${index}`, member);

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
    toast.success("اطلاعات کارمند با موفقیت به روزرسانی شد.");
    emit("closeEditEmployee");
  } else {
    employeeStore.addEmployee(payload);
    toast.success("کارمند با موفقیت اضافه شد!");
    cancelAddEmployee();
  }
});
</script>
