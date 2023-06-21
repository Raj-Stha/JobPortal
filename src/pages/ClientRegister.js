import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useFormik } from "formik";
import { useLocation } from "react-router-dom";
import * as Yup from "yup";
import { useClientRegisterMutation } from "../features/userApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ClientRegister = () => {
  const [signClient, { isLoading }] = useClientRegisterMutation();

  const nav = useNavigate();

  const location = useLocation();

  const registerSchema = Yup.object().shape({
    fullName: Yup.string()
      .required("Required")
      .min(3, "Too Short !!!")
      .max(50, "Too long !!!"),
    email: Yup.string().email("Invalid email").required("Required"),
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
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerSchema,

    onSubmit: async (values) => {
      try {
        const data = {
          fullName: values.fullName,
          email: values.email,
          password: values.password,
        };
        const result = await signClient(data).unwrap();
        if (result.status === "success") {
          toast.success(result.message);
          location.state
            ? nav("/login", { state: location.state.pathname })
            : nav("/login");
        } else {
          toast.error(result.message);
        }
      } catch (e) {
        toast.error(`${e}`);
      }
    },
  });

  return (
    <div className="pb-[3%] mb-[6%] mmd:pt-[4%] msm:pt-[16%]">
      <div className=" text-center bg-gray-100 font-medium text-xl py-4">
        <h2>JobSeeker Register</h2>
      </div>

      <Card color="transparent" shadow={false}>
        <form
          className="pt-[2%] pb-[8px] mt-8 mb-6 w-80 max-w-screen-lg sm:w-96 mx-auto msm:w-[85%] "
          onSubmit={formik.handleSubmit}
        >
          <div className="mb-4 flex flex-col gap-6">
            <div className="">
              <Input
                size="lg"
                label="Full Name"
                name="fullName"
                color="green"
                onChange={formik.handleChange}
                value={formik.values.fullName}
                required
              />{" "}
              {formik.errors.fullName && formik.touched.fullName && (
                <h2 className="pt-2"> {formik.errors.fullName}</h2>
              )}{" "}
            </div>
            <div className="">
              <Input
                required
                size="lg"
                label="Email Address"
                color="green"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />{" "}
              {formik.errors.email && formik.touched.email && (
                <h2 className="pt-2"> {formik.errors.email}</h2>
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
                <h2 className="pt-2"> {formik.errors.password}</h2>
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
                  <h2 className="pt-2"> {formik.errors.confirmPassword}</h2>
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
              onClick={() =>
                location.state
                  ? nav("/login", { state: location.state.pathname })
                  : nav("/login")
              }
              className="font-medium text-green-500 transition-colors hover:text-green-700"
            >
              Sign In
            </span>
          </Typography>
        </form>
      </Card>
    </div>
  );
};

export default ClientRegister;
