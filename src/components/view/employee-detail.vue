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
      <div class="d-flex mb-4" v-if="formType === 'update'">
        <delete-employee
          @closeEmployeeForm="$emit('closeEditEmployee')"
          :id="id"
        />
      </div>

      <Form
        :key="formKey"
        :validation-schema="employeeSchema"
        :initial-values="initialValues"
        @submit="submitForm"
      >
        <v-row>
          <v-col cols="12" md="6">
            <base-input label="نام" placeholder="سارا" field-key="firstName" />
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
          <v-btn @click="$emit('cancelAddEmployee')" color="grey">انصراف</v-btn>
        </div>
        <div v-if="formType === 'update'" class="text-center mt-3">
          <v-btn type="submit" color="green">بروزرسانی</v-btn>
        </div>
      </Form>
    </fieldset>
  </v-container>
</template>

<script setup>
import { computed } from 'vue'
import { Form } from 'vee-validate'
import { employeeSchema } from '@/validation/employeeSchema'
import { convertDatee } from '@/composables/convertDate'
import { useEmployeeStore } from '@/stores/employee'
import { toast } from '@/plugins/toast'

const { toJalali, toIso } = convertDatee()
const employeeStore = useEmployeeStore()
const emit = defineEmits(['cancelAddEmployee', 'closeEditEmployee'])

const props = defineProps({
  formData: Object,
  formType: { type: String, required: true },
  id: { type: String, default: '' },
})

const initialValues = computed(() => {
  if (props.formType === 'update' && props.formData) {
    return {
      firstName: props.formData.firstName || '',
      lastName: props.formData.lastName || '',
      email: props.formData.email || '',
      dateOfBirth: props.formData.dateOfBirth
        ? toJalali(props.formData.dateOfBirth)
        : '',
      family: (props.formData.family || []).map(member => ({
        ...member,
        dateOfBirth: member.dateOfBirth ? toJalali(member.dateOfBirth) : '',
      })),
    }
  }
  return {
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    family: [],
  }
})

const formKey = computed(() =>
  `${props.formType}-${props.id}-${JSON.stringify(props.formData)}`
)

const submitForm = (vals) => {
  const payload = {
    ...vals,
    dateOfBirth: vals.dateOfBirth ? toIso(vals.dateOfBirth) : '',
    family: vals.family.map(member => ({
      ...member,
      dateOfBirth: member.dateOfBirth ? toIso(member.dateOfBirth) : '',
    })),
  }

  if (props.formType === 'update') {
    employeeStore.updateEmployee(props.id, payload)
    toast.success('اطلاعات کارمند با موفقیت به‌روزرسانی شد')
    emit('closeEditEmployee')
  } else {
    employeeStore.addEmployee(payload)
    toast.success('کارمند با موفقیت اضافه شد!')
    emit('cancelAddEmployee')
  }
}
</script>
