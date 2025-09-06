import employeeServices from "@/services/employee";

export const actions = {
  async getEmployees() {
    this.loading = true;
    try {
      const response = await employeeServices.getEmployees();
      this.employees = response.data;
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
    }
  },

  async getEmployeeById(id) {
    this.loading = true;
    try {
      const response = await employeeServices.getEmployeeById(id);
      this.employeeDetail = response.data;
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
    }
  },

  async updateEmployee(id, payload) {
    this.loading = true;
    try {
      const response = await employeeServices.updateEmployee(id, payload);
      console.log(response, 111);
      const index = this.employees.findIndex((emp) => emp.id === id);
      if (index !== -1) {
        this.employees[index] = {
          ...this.employees[index],
          firstName: response.data.firstName,
          lastName: response.data.lastName,
        };
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
    }
  },

  async addEmployee(payload) {
    this.loading = true;

    try {
      const response = await employeeServices.addEmployee(payload);
      console.log(response);
      this.employees.push({
        id: response.data.id,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
    }
  },
  async deleteEmployee(id) {
    this.loading = true;
    try {
      await employeeServices.deleteEmployee(id);
      this.employees = this.employees.filter((emp) => emp.id !== id);
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
    }
  },
};
