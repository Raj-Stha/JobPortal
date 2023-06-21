import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useFormik } from "formik";
import { NavLink, useLocation } from "react-router-dom";
import * as Yup from "yup";
import { useUserLoginMutation } from "../features/userApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUserDetail } from "../features/userSlice";

const Login = () => {
  const [login, { isLoading }] = useUserLoginMutation();

  const nav = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location?.state || "/";

  const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .required("Required")
      .min(3, "Too Short !!!")
      .max(50, "Too long !!!"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,

    onSubmit: async (values) => {
      try {
        const result = await login(values).unwrap();
        if (result.status === "success") {
          dispatch(addUserDetail(result.users));
          if (result.users.token && result.isEmployee) {
            nav("/admin");
          } else {
            nav(path);
          }
        } else {
          toast.error(result.message);
        }
      } catch (e) {
        toast.error(`${e}`);
      }
    },
  });

  return (
    <div className="pb-[3%] mmd:pt-[4%] mb-[14%] pt-[1px]  mxl:mb-[10%] mmd:mb-[16%] msm:pt-[16%] msm:h-[80vh]">
      <div className=" text-center bg-gray-100 font-medium text-xl py-4">
        <h2>Login</h2>
      </div>

      <Card color="transparent" shadow={false}>
        <form
          className="pt-[2%] mt-9 mb-6 w-80 max-w-screen-lg sm:w-96 mx-auto msm:w-[85%] "
          onSubmit={formik.handleSubmit}
        >
          <div className="mb-4 flex flex-col gap-6">
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
              Login
            </Button>
          )}

          <Typography
            color="gray"
            className="mt-3  mb-[2px] text-center font-normal"
          >
            Not a member?{" "}
            <NavLink
              to={"/register-jobseeker"}
              className="font-medium text-green-500 transition-colors hover:text-green-700"
            >
              Register
            </NavLink>
          </Typography>
        </form>
      </Card>
    </div>
  );
};

export default Login;
