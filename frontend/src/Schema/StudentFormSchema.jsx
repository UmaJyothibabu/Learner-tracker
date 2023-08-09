import * as Yup from "yup";

const StudentFormSchema = Yup.object().shape({
  student_name: Yup.string().min(2).max(25).required("Please enter name"),
  email_id: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(
      /^(\d{3}[-. ]?\d{3}[-. ]?\d{4}|\d{10})$/,
      "Invalid Phonenumber format"
    ),
  course: Yup.string().required("Course is required"),
  batch: Yup.string().required("Batch is required"),
  project: Yup.string().required("Project is required"),
  course_status: Yup.string().required("Course status is required"),
  placement_status: Yup.string(),
  training_head: Yup.string().required("Training head is required"),
  placement_officer: Yup.string().required("Placement officer is required"),
  student_address: Yup.object().shape({
    address: Yup.string().required("Address is required"),
    district: Yup.string().required("District is required"),
    state: Yup.string().required("State is required"),
    pin: Yup.string()
      .matches(/^\b\d{6}\b$/, "Invalid pin format")
      .required("Pin is required"),
  }),
});

export default StudentFormSchema;
