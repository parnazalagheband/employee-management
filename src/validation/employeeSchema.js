import * as yup from "yup";

export const employeeSchema = yup.object({
  firstName: yup.string().required("نام الزامی است"),

  lastName: yup.string().required("نام خانوادگی الزامی است"),

  email: yup.string().email("ایمیل معتبر نیست").required("ایمیل الزامی است"),

  dateOfBirth: yup.string().required("تاریخ تولد الزامی است"),

  family: yup.array().of(
    yup.object({
      name: yup.string().required("نام عضو خانواده الزامی است"),
      relation: yup.string().required("نسبت الزامی است"),
      dateOfBirth: yup.string().required("تاریخ تولد الزامی است"),
    })
  ),
});
