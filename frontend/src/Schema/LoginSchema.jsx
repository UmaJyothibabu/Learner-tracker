import * as Yup from "yup";

export const LoginSchema = Yup.object({
  username: Yup.string().required("Please provide your Username "),
  password: Yup.string().required("Please provide your password"),
});
