import { Input, Button } from "@material-tailwind/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useUpdateUserAndJobMutation } from "../../../features/jobApi";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";
import { useUpdateUserForJOBMutation } from "../../../features/userApi";

const JobForm = ({ setPopup, jobID }) => {
  const [updateJob, { isLoading }] = useUpdateUserAndJobMutation();
  const [updateUserJob, { isLoading: isload }] = useUpdateUserForJOBMutation();
  const location = useLocation();
  const { token } = useSelector((store) => store.userInfo.userDetail);
  const jobSchema = Yup.object().shape({
    fullName: Yup.string().required("Required").min(3, "Too Short"),
    cv: Yup.mixed().test(
      "Invalid File Type",
      "Invalid file type",
      (value) => value && value.type === "application/pdf"
    ),
  });
  const formik = useFormik({
    initialValues: {
      fullName: "",
      cv: "",
    },
    validationSchema: jobSchema,
    onSubmit: async (value) => {
      try {
        const form = new FormData();
        form.append("fullName", value.fullName);
        form.append("CV", value.cv);
        form.append("jobID", jobID);
        const result = await updateJob({ form, token }).unwrap();
        await updateUserJob({ form, token }).unwrap();
        if (result.status === "error") {
          toast.error(result.message);
        } else {
          setPopup(false);
          <Navigate to={location.pathname} replace />;
          toast.success(result.message);
        }
      } catch (e) {
        toast.error(`${e}`);
      }
    },
  });

  return (
    <div className="w-[100%] h-[100%] z-20 absolute top-0 ">
      <div className=" fixed top-20 z-30 w-[40%] left-[50%] translate-x-[-50%] mmd:w-[60%] msm:w-[95%] ">
        <div className="relative bg-gray-50 shadow-lg py-10 px-4 msm:py-4 ">
          <h2 className="text-center text-xl font-semibold mb-8 pb-2">
            Apply Job
          </h2>
          <i
            className="fa-solid fa-xmark text-2xl px-5    hover:text-red-500 right-2 top-4 absolute"
            onClick={() => setPopup(false)}
          ></i>

          <div className="w-[80%] mx-auto msm:w-[100%]">
            <form className="space-y-8" onSubmit={formik.handleSubmit}>
              <div className="">
                <Input
                  size="lg"
                  label="Full Name"
                  name="fullName"
                  color="green"
                  onChange={formik.handleChange}
                  value={formik.values.fullName}
                  required
                />
                {formik.errors.fullName && formik.touched.fullName && (
                  <h2 className="pt-2"> {formik.errors.fullName}</h2>
                )}
              </div>

              <div className="">
                <Input
                  type="file"
                  label="CV"
                  name="cv"
                  accept="application/pdf"
                  onChange={(e) => {
                    const pdfFile = e.target.files[0];
                    formik.setFieldValue("cv", pdfFile);
                  }}
                />
                {formik.errors.cv && formik.touched.cv && (
                  <h2 className="pt-2"> {formik.errors.cv}</h2>
                )}
              </div>
              <div className="text-center">
                {isLoading ? (
                  <Button
                    disabled
                    className="select-none bg-color w-[90px]"
                    type="submit"
                  >
                    <div className=" w-4 h-4 border-2 mx-auto rounded-full border-t-green-800 animate-spin"></div>
                  </Button>
                ) : (
                  <Button className="  bg-color" type="submit">
                    Apply
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default JobForm;
