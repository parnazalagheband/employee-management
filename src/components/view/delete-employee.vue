<template>
  <v-dialog max-width="400">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        size="small"
        variant="elevated"
        icon="mdi-delete"
        color="red"
        class="mr-auto"
      ></v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card class="pa-4">
        <v-card-text class="text-h6 font-weight-medium">
          <v-icon color="red-accent-1" size="30" class="mb-3"
            >mdi-alert-circle</v-icon
          >
          <span> آیا از حذف این کارمند مطمئن هستید؟</span>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="red-accent-4"
            variant="elevated"
            @click="() => { deleteEmployee(); isActive.value = false; }"
          >
            حذف
          </v-btn>
          <v-btn
            color="grey"
            variant="outlined"
            @click="isActive.value = false"
          >
            انصراف
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>

  </v-dialog>
</template>

<script setup>
import { useEmployeeStore } from "@/stores/employee";
const employeeStore = useEmployeeStore();

const emit = defineEmits(["closeEmployeeForm"]);


const props = defineProps({
  id: {
    type: String,
    default: "",
  },
});

const deleteEmployee = () => {
  employeeStore.deleteEmployee(props.id);
  emit("closeEmployeeForm");
};
</script>
