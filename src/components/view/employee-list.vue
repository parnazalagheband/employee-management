<template>
  <v-container>
    <v-list
      class="rounded pa-0"
      v-model:opened="open"
      @update:opened="handleOpened"
    >
      <v-list-group
        v-for="employee in employeeStore.employees"
        :key="employee.id"
        :value="employee.id"
        class="pa-2 border rounded"
      >
        <template #activator="{ props }">
          <v-list-item v-bind="props">
            <v-list-item-content class="d-flex ga-1">
              <v-icon color="indigo-accent-2">mdi-account</v-icon>
              <v-list-item-title>{{ employee.firstName }} {{ employee.lastName }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>

        <employee-detail
          @closeEditEmployee="closeEmployeeForm"
          formType="update"
          :formData="employeeStore.employeeDetail"
          :id="open[0]"
        />
      </v-list-group>
    </v-list>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useEmployeeStore } from "@/stores/employee";

const employeeStore = useEmployeeStore();
const open = ref([]);

const handleOpened = (newOpened) => {
  const currentOpen = newOpened[newOpened.length - 1];
  if (currentOpen) {
    employeeStore.getEmployeeById(currentOpen);
    open.value = [currentOpen]; 
  } else {
    open.value = [];
  }
};

const closeEmployeeForm = () => {
  open.value = [];
};

onMounted(() => {
  employeeStore.getEmployee();
});
</script>
