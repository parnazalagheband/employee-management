export const employeeRules = {
  firstName: (val) => (!!val ? true : "نام الزامی است"),
  
  lastName: (val) => (!!val ? true : "نام خانوادگی الزامی است"),

  email: (val) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ? true : "ایمیل معتبر نیست"),

  dateOfBirth: (val) => (!!val ? true : "تاریخ تولد الزامی است"),

  family: {
    name: (val) => (!!val ? true : "نام عضو خانواده الزامی است"),
    relation: (val) => (!!val ? true : "نسبت الزامی است"),
    dateOfBirth: (val) => (!!val ? true : "تاریخ تولد الزامی است"),
  },
};
