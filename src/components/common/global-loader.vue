<template>
  <div v-if="employeeStore.loading" class=" global-loader d-flex justify-center align-center">
    <div class="spinner"></div>
  </div>
</template>

<script setup>
import { useEmployeeStore } from "@/stores/employee";
const employeeStore = useEmployeeStore();
</script>

<style scoped>
.global-loader {
  position: fixed;
  inset: 0;
  background: rgba(255, 255, 255, 0.7);
  z-index: 9999;
}
.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid gray;
  border-top-color: blue;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>
