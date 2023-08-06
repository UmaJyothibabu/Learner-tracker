import * as Yup from "yup";

export const UserFormUpdateSchema = Yup.object({
  name: Yup.string().min(2).max(25).required("Please enter name"),
  username: Yup.string()
    .min(7, "Username must be of alteast 7 characters")
    .required("Username is required"),
  email: Yup.string().email().required("Please enter email"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(
      /^(\d{3}[-. ]?\d{3}[-. ]?\d{4}|\d{10})$/,
      "Invalid Phonenumber format"
    ),
  designation: Yup.string().required("Please select the designation"),
  course: Yup.array().test(
    "courseOrBatchRequired",
    "Select  a course",
    function (value) {
      return value && value.length > 0
        ? true
        : this.parent.batch && this.parent.batch.length > 0;
    }
  ),
  batch: Yup.array().test(
    "courseOrBatchRequired",
    "Select a batch",
    function (value) {
      return value && value.length > 0
        ? true
        : this.parent.course && this.parent.course.length > 0;
    }
  ),
  //   password: Yup.string()
  //     .min(8, "password is too short")
  //     .max(100, "password is too long")
  //     .required("Password is required")
  //     .matches(
  //       /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{7,32}$/,
  //       "Password must contain  \n 1.Atleast one uppercase letter, \n 2.Atleast one lowercase letter,\n 3 Atleast one number, 4.Atleast one special character"
  //     ),
  //   confirmpassword: Yup.string()
  //     .required()
  //     .oneOf([Yup.ref("password"), null], "Password must match"),
});
