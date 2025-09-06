<template>
  <v-container class="d-flex flex-column justify-center" width="700">
    <div class="pr-5">
      <h1>کارمندان</h1>
    </div>
    <employee-list />
    <v-col
      v-show="!showAddEmployee"
      @click="showAddEmployee = true"
      class="text-center"
    >
      <v-btn size="large" color="green">افزودن کارمند</v-btn>
    </v-col>
    <employee-detail
      @cancelAddEmployee="cancel"
      v-show="showAddEmployee"
      formType="create"
    />
  </v-container>
</template>

<script setup>
const showAddEmployee = ref(false);

const cancel = () => {
  showAddEmployee.value = false;
};
</script>
