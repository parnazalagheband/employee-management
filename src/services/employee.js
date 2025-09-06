import axios from "@/plugins/axios";

const employeeService = {
  getEmployees() {
    return axios.get("/employee");
  },
  getEmployeeById(id) {
    return axios.get(`/employee/${id}`);
  },

  updateEmployee(id, payload) {
    return axios.put(`/employee/${id}`, payload);
  },

  addEmployee(payload) {
    return axios.post("/employee", payload);
  },

  deleteEmployee(id) {
    return axios.delete(`/employee/${id}`);
  },
};

export default employeeService;
