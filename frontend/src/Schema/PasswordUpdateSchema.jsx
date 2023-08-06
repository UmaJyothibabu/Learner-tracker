import * as Yup from "yup";

export const passwordUpdateSchema = Yup.object({
  currentPassword: Yup.string().required("Provide the current password"),
  password: Yup.string()
    .min(8, "password is too short")
    .max(32, "password is too long")
    .required("Password is required")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{7,32}$/,
      "Password must contain  \n 1.Atleast one uppercase letter, \n 2.Atleast one lowercase letter,\n 3 Atleast one number, 4.Atleast one special character"
    ),
  confirmpassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Password must match"),
});
