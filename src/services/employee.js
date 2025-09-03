import axios from "@/plugins/axios";

const employeeService = {
  getEmployees() {
    return axios.get("/employee");
  },
  getEmployeeById(id) {
    return axios.get(`/employee/${id}`);
  },
};

export default employeeService;
