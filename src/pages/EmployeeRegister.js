import {
  Card,
  Input,
  Button,
  Typography,
  Textarea,
} from "@material-tailwind/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEmployeeRegisterMutation } from "../features/userApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const EmployeeRegister = () => {
  const [signupEmployee] = useEmployeeRegisterMutation();
  const nav = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [load, setLoad] = useState(false);

  const registerSchema = Yup.object().shape({
    companyName: Yup.string()
      .required("Company name is required")
      .min(3, "Too Short!")
      .max(50, "Too Long!"),
    address: Yup.string().required("Company location is required"),
    companyLogo: Yup.mixed()
      .required("Company logo is required")
      .test(
        "File Format",
        "Only PNG, JPG, and JPEG are allowed",
        (value) =>
          value && ["image/png", "image/jpg", "image/jpeg"].includes(value.type)
      ),
    email: Yup.string().email("Invalid email").required("Email is required"),
    companyDescription: Yup.string()
      .required("Company description is required")
      .min(3, "Too Short!")
      .max(400, "Too Long!"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(50, "Password too long"),
    confirmPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  const formik = useFormik({
    initialValues: {
      companyName: "",
      address: "",
      companyLogo: "",
      email: "",
      companyDescription: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerSchema,

    onSubmit: async (values) => {
      try {
        if (!values.companyLogo) {
          setLoad(false);
          return toast.error("Unable To Upload Image");
        }
        setLoad(true);
        const formData = new FormData();
        formData.append("file", values.companyLogo);
        formData.append("upload_preset", "JobPortal");
        formData.append("cloud_name", "ddvvgxnry");

        const cloudinaryResponse = await fetch(
          "https://api.cloudinary.com/v1_1/ddvvgxnry/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        const cloudinaryData = await cloudinaryResponse.json();
        const imageUrl = cloudinaryData.secure_url;

        if (!imageUrl) {
          setLoad(false);
          return toast.error("Unable To Upload Image");
        }

        const employee = {
          companyName: values.companyName,
          address: values.address,
          companyLogo: imageUrl,
          email: values.email,
          companyDescription: values.companyDescription,
          password: values.password,
        };

        const result = await signupEmployee(employee).unwrap();

        if (result.status === "success") {
          toast.success(result.message);
          setLoad(false);
          nav("/login");
        } else {
          setLoad(false);
          toast.error(result.message);
        }
      } catch (e) {
        setLoad(false);
        toast.error("Error occurred while uploading image or submitting form.");
      }
    },
  });

  return (
    <div className="pb-[3%] mmd:pt-[4%] msm:pt-[16%]">
      <div className="text-center bg-gray-100 font-medium text-xl py-4">
        <h2>Employee Register</h2>
      </div>

      <Card color="transparent" shadow={false}>
        <form
          className="mt-8 mb-6  sm:w-[35%] mx-auto msm:w-[85%]"
          onSubmit={formik.handleSubmit}
        >
          <div className="mb-4 flex flex-col gap-6">
            <Input
              size="lg"
              label="Company Name"
              name="companyName"
              color="green"
              onChange={formik.handleChange}
              value={formik.values.companyName}
              error={formik.touched.companyName && formik.errors.companyName}
            />
            <Input
              size="lg"
              label="Company Location"
              name="address"
              color="green"
              onChange={formik.handleChange}
              value={formik.values.address}
              error={formik.touched.address && formik.errors.address}
            />
            <Input
              size="lg"
              label="Official Email"
              name="email"
              color="green"
              onChange={formik.handleChange}
              value={formik.values.email}
              error={formik.touched.email && formik.errors.email}
            />
            {imagePreview && (
              <img
                className="w-[60%] h-[150px] mb-6 object-cover"
                src={imagePreview}
                alt="Company Logo Preview"
              />
            )}
            <Input
              type="file"
              label="Company Logo"
              name="companyLogo"
              accept="image/png, image/jpg, image/jpeg"
              required
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  formik.setFieldValue("companyLogo", file);
                  const reader = new FileReader();
                  reader.onload = () => setImagePreview(reader.result);
                  reader.readAsDataURL(file);
                } else {
                  setImagePreview(null);
                }
              }}
            />
            <Textarea
              label="Company Description"
              name="companyDescription"
              color="green"
              onChange={formik.handleChange}
              value={formik.values.companyDescription}
              error={
                formik.touched.companyDescription &&
                formik.errors.companyDescription
              }
            />
            <Input
              type="password"
              size="lg"
              label="Password"
              name="password"
              color="green"
              onChange={formik.handleChange}
              value={formik.values.password}
              error={formik.touched.password && formik.errors.password}
            />
            <Input
              type="password"
              size="lg"
              label="Confirm Password"
              name="confirmPassword"
              color="green"
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
              error={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
            />
          </div>

          {load ? (
            <Button
              disabled
              className="mt-7 select-none bg-color"
              type="submit"
              fullWidth
            >
              <div className=" w-4 h-4 border-2  mx-auto rounded-full border-t-green-800 animate-spin"></div>
            </Button>
          ) : (
            <Button className="mt-7  bg-color" type="submit" fullWidth>
              Register
            </Button>
          )}
          <Typography color="gray" className="mt-3 text-center font-normal">
            Already have an account?{" "}
            <span
              onClick={() => nav("/login")}
              className="font-medium text-green-500 hover:text-green-700 cursor-pointer"
            >
              Sign In
            </span>
          </Typography>
        </form>
      </Card>
    </div>
  );
};
