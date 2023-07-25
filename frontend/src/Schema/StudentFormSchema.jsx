import * as Yup from "yup";

const StudentFormSchema = Yup.object().shape({
  student_name: Yup.string().required("Student name is required"),
  email_id: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  course: Yup.string().required("Course is required"),
  batch: Yup.string().required("Batch is required"),
  project: Yup.string().required("Project is required"),
  course_status: Yup.string().required("Course status is required"),
  placement_status: Yup.string().required("Placement status is required"),
  training_head: Yup.string().required("Training head is required"),
  placement_officer: Yup.string().required("Placement officer is required"),
  student_address: Yup.object().shape({
    address: Yup.string().required("Address is required"),
    district: Yup.string().required("District is required"),
    state: Yup.string().required("State is required"),
    pin: Yup.number().required("Pin is required"),
  }),
});

export default StudentFormSchema;
