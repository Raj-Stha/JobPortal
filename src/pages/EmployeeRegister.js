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

export const EmployeeRegister = () => {
  const [signupEmployee, { isLoading }] = useEmployeeRegisterMutation();

  const nav = useNavigate();

  const registerSchema = Yup.object().shape({
    companyName: Yup.string()
      .required("Required")
      .min(3, "Too Short !!!")
      .max(50, "Too long !!!"),
    companyLogo: Yup.mixed()
      .test(
        "File Format",
        "Unsupported File Format",
        (value) =>
          value && ["image/png", "image/jpg", "image/jpeg"].includes(value.type)
      )
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    companyDescription: Yup.string()
      .required("Required")
      .min(3, "Too Short !!!")
      .max(400, "Too long !!!"),
    password: Yup.string()
      .required("Required")
      .min(3, "Too Short !!!")
      .max(50, "Too long !!!"),
    confirmPassword: Yup.mixed()
      .test(
        "Password not match",
        "Password Doesn't match",
        (value) => value && value === formik.values.password
      )
      .required("Required"),
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
        const formData = new FormData();
        formData.append("companyName", values?.companyName);
        formData.append("address", values?.address);
        formData.append("companyLogo", values.companyLogo);
        formData.append("email", values.email);
        formData.append("companyDescription", values.companyDescription);
        formData.append("password", values.password);

        const result = await signupEmployee(formData).unwrap();
        if (result.status === "success") {
          toast.success(result.message);

          nav("/login");
        } else {
          toast.error(result.message);
        }
      } catch (e) {
        toast.error(`${e}`);
      }
    },
  });

  return (
    <div className="pb-[3%] mmd:pt-[4%] msm:pt-[16%]">
      <div className=" text-center bg-gray-100 font-medium text-xl py-4">
        <h2>Employee Register</h2>
      </div>

      <Card color="transparent" shadow={false}>
        <form
          className="mt-8 mb-6 w-80 max-w-screen-lg  sm:w-96 mx-auto msm:w-[85%] "
          onSubmit={formik.handleSubmit}
        >
          <div className="mb-4 flex flex-col gap-6 ">
            <div className="">
              <Input
                required
                size="lg"
                label="Company Name"
                name="companyName"
                color="green"
                onChange={formik.handleChange}
                value={formik.values.companyName}
              />{" "}
              {formik.errors.companyName && formik.touched.companyName && (
                <h2 className="pt-2">{formik.errors.companyName}</h2>
              )}
            </div>

            <div className="">
              <Input
                required
                size="lg"
                label="Company Location"
                name="address"
                color="green"
                onChange={formik.handleChange}
                value={formik.values.address}
              />{" "}
              {formik.errors.address && formik.touched.address && (
                <h2 className="pt-2">{formik.errors.address}</h2>
              )}{" "}
            </div>
            <div className="">
              <Input
                required
                size="lg"
                label="Official Email"
                color="green"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />{" "}
              {formik.errors.email && formik.touched.email && (
                <h2 className="pt-2">{formik.errors.email}</h2>
              )}{" "}
            </div>

            <div className="">
              {formik.values.imagePreview && (
                <img
                  className="w-[60%] h-[150px]  mb-6  object-cover"
                  src={`${formik.values.imagePreview}`}
                  alt=""
                />
              )}
              <Input
                required
                type="file"
                label="Company Image"
                name="companyLogo"
                accept="image/*"
                onChange={(e) => {
                  const logo = e.target.files[0];
                  formik.setFieldValue("companyLogo", logo);
                  const res = ["image/png", "image/jpg", "image/jpeg"].includes(
                    logo.type
                  );
                  if (res) {
                    const reader = new FileReader();
                    reader.readAsDataURL(logo);
                    reader.addEventListener("load", () => {
                      formik.setFieldValue("imagePreview", reader.result);
                    });
                  } else {
                    formik.setFieldValue("imagePreview", null);
                  }
                }}
              />{" "}
              {formik.errors.companyLogo && formik.touched.companyLogo && (
                <h2 className="pt-2">{formik.errors.companyLogo}</h2>
              )}{" "}
            </div>

            <div className="">
              <Textarea
                required
                label="Company Description"
                color="green"
                name="companyDescription"
                onChange={formik.handleChange}
                value={formik.values.companyDescription}
              />{" "}
              {formik.errors.companyDescription &&
                formik.touched.companyDescription && (
                  <h2 className="pt-2">{formik.errors.companyDescription}</h2>
                )}{" "}
            </div>
            <div className="">
              <Input
                required
                type="password"
                size="lg"
                label="Password"
                color="green"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />{" "}
              {formik.errors.password && formik.touched.password && (
                <h2 className="pt-2">{formik.errors.password}</h2>
              )}
            </div>
            <div className="">
              <Input
                required
                type="password"
                size="lg"
                label="Password (again)"
                color="green"
                name="confirmPassword"
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
              />{" "}
              {formik.errors.confirmPassword &&
                formik.touched.confirmPassword && (
                  <h2 className="pt-2">{formik.errors.confirmPassword}</h2>
                )}{" "}
            </div>
          </div>
          {isLoading ? (
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

          <Typography
            color="gray"
            className="mt-3  mb-[2px] text-center font-normal"
          >
            Already have an account?{" "}
            <span
              onClick={() => nav("/login")}
              className="font-medium text-green-500 transition-colors hover:text-green-700 cursor-pointer"
            >
              Sign In
            </span>
          </Typography>
        </form>
      </Card>
    </div>
  );
};
