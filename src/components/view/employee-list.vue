<template>
  <v-container class="mx-auto" width="700">
    <v-list v-model:opened="open" @update:opened="getEmployeeDetail">
      <v-list-group
      class="border rounded"
        v-for="employee in employeeStore.employees"
        :key="employee.id"
        :value="employee.id"
      >
        <template #activator="{ props }">
          <v-list-item  v-bind="props">
            <v-list-item-content class="d-flex ga-1">
              <v-icon color="indigo-accent-2">mdi-account</v-icon>
              <v-list-item-title
                >{{ employee.firstName }}
                {{ employee.lastName }}</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </template>
        <employee-detail formType="update" :formData="employeeStore.employeeDetail" />
      </v-list-group>
    </v-list>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useEmployeeStore } from "@/stores/employee";

const employeeStore = useEmployeeStore();
const open = ref([]);
let previousOpenedIds = [];

const getEmployeeDetail = (newIds) => {
  const openedId = newIds.find((id) => !previousOpenedIds.includes(id));

  if (openedId) {
    employeeStore.getEmployeeById(openedId);
    open.value = [openedId];
  } else {
    open.value = [];
  }
  previousOpenedIds = [...open.value];
};

onMounted(() => {
  employeeStore.getEmployee();
});
</script>
