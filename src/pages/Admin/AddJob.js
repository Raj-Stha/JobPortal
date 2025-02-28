import { Input, Button, Select, Option } from "@material-tailwind/react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { useFormik } from "formik";
import { useAddJobPostMutation } from "../../features/jobApi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { useNavigate } from "react-router";

const AddJob = () => {
  const [jobDesc, setDesc] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const { token } = useSelector((store) => store.userInfo.userDetail);
  const nav = useNavigate();

  const [addPost] = useAddJobPostMutation();

  const jobSchema = Yup.object().shape({
    jobTitle: Yup.string().required("Required"),

    qualification: Yup.string().required("Required").min(3, "Too Short"),
  });

  const formik = useFormik({
    initialValues: {
      jobTitle: "",
      jobCategories: "Information Technology",
      jobType: "Full Time",

      experience: "Below 1 yrs",
      qualification: "",
      salary: "Rs 5,000 to Rs 10,000",
    },

    validationSchema: jobSchema,
    onSubmit: async (value) => {
      try {
        let details = {
          jobTitle: value.jobTitle,
          jobCategories: value.jobCategories,
          jobType: value.jobType,
          experience: value.experience,
          qualification: value.qualification,
          salary: value.salary,
          createdData: startDate,
          jobDescription: jobDesc,
        };

        const result = await addPost({ details, token }).unwrap();
        if (result.status === "success") {
          toast.success(result.message);
          nav("/admin");
        } else {
          toast.error(result.message);
        }
      } catch (e) {
        toast.error({ e });
      }
    },
  });

  return (
    <div>
      <div className=" text-center bg-gray-100 font-medium text-xl py-4">
        <h2>Create a Job</h2>
      </div>
      <div className="px-4">
        <form
          className="mt-8  w-[55%] mlg:w-[70%] mmd:w-[90%] msm:w-[100%] max-w-screen-lg  border-2 border-b  px-10 py-8 mb-8  mx-auto msm:px-4 msm:mx-0 msm:mt-6 "
          onSubmit={formik.handleSubmit}
        >
          <div
            className="grid grid-cols-2 gap-x-10 gap-y-9    
        msm:flex msm:flex-col "
          >
            <div className="space-y-3 col-span-2 msm:col-span-full ">
              <label htmlFor="" className="font-medium">
                Job Title
              </label>
              <Input
                variant="standard"
                placeholder="Laravel Developer"
                name="jobTitle"
                className="border-2  rounded-sm pb-4 outline-none px-4  border-green-600 outline-green-700  "
                color="green"
                value={formik.values.jobTitle}
                onChange={formik.handleChange}
              />
              {formik.errors.jobTitle && formik.touched.jobTitle && (
                <h2>{formik.errors.jobTitle}</h2>
              )}
            </div>

            <div className="col-span-1 padding-wrapper space-y-3 ">
              <label htmlFor="" className="font-medium">
                Job Categories
              </label>
              <Select
                variant="standard"
                name="jobCategories"
                className="border-2  rounded-sm pt-2 outline-none px-4   "
                color="green"
                value={formik.values.jobCategories}
                onChange={(e) => formik.setFieldValue("jobCategories", e)}
              >
                <Option value="Information Technology">
                  Information Technology
                </Option>
                <Option value="Accounting">Accounting</Option>
                <Option value="Customer Service">Customer Service</Option>
                <Option value="Marketing">Marketing</Option>
                <Option value="Electrician">Electrician</Option>
                {/* {
              jobCategoriesList.map((cat, index) => {
                return (
                  <Option key={index}
                    value={cat}>
                    {cat}</Option>
                )

              })
            }  */}
              </Select>
            </div>
            <div className="col-span-1 padding-wrapper space-y-3 ">
              <label htmlFor="" className="font-medium">
                Job Type
              </label>
              <Select
                variant="standard"
                className="border-2  rounded-sm pt-2 outline-none px-4   "
                color="green"
                name="jobType"
                value={formik.values.jobType}
                onChange={(e) => formik.setFieldValue("jobType", e)}
              >
                <Option value="Full Time">Full Time</Option>
                <Option value="Part Time">Part Time</Option>
              </Select>
            </div>

            <div className="col-span-1 padding-wrapper space-y-3 ">
              <label htmlFor="" className="font-medium">
                Salary Range
              </label>
              <Select
                variant="standard"
                className="border-2  rounded-sm pt-2 outline-none px-4   "
                color="green"
                name="jobType"
                value={formik.values.salary}
                onChange={(e) => formik.setFieldValue("salary", e)}
              >
                <Option value="Rs 5,000 to Rs 10,000">
                  Rs 5,000 to Rs 10,000
                </Option>
                <Option value="Rs 15,000 to Rs 30,000">
                  Rs 15,000 to Rs 30,000
                </Option>
                <Option value="Rs 30,000 to Rs 60,000">
                  Rs 30,000 to Rs 60,000
                </Option>
                <Option value="Rs 60,000 to Rs 90,000">
                  Rs 60,000 to Rs 90,000
                </Option>
                <Option value="Above 1 Lakh">Above 1 Lakh</Option>
                <Option value="Negotiable">Negotiable</Option>
              </Select>
            </div>

            <div className="col-span-1 padding-wrapper space-y-3 ">
              <label htmlFor="" className="font-medium">
                Experience
              </label>
              <Select
                variant="standard"
                className="border-2  rounded-sm pt-2 outline-none px-4   "
                color="green"
                name="jobType"
                value={formik.values.experience}
                onChange={(e) => formik.setFieldValue("experience", e)}
              >
                <Option value="Below 1 yrs">Below 1 yrs</Option>
                <Option value="1 to 2 yrs">1 to 2 yrs</Option>
                <Option value="2 to 4 yrs">2 to 4 yrs</Option>
                <Option value="4 to 8 yrs">4 to 8 yrs</Option>
                <Option value="Above 10yrs">Above 10 yrs</Option>
              </Select>
            </div>

            <div className="space-y-3 col-span-1 ">
              <label htmlFor="" className="font-medium">
                Qualification
              </label>
              <Input
                variant="standard"
                className="border-2  rounded-sm pb-4 outline-none px-4  border-green-600 outline-green-700  "
                color="green"
                placeholder="Bachelor Completed"
                name="qualification"
                value={formik.values.qualification}
                onChange={formik.handleChange}
              />
              {formik.errors.qualification && formik.touched.qualification && (
                <h2>{formik.errors.qualification}</h2>
              )}
            </div>

            <div className="col-span-1 space-y-3">
              <label htmlFor="" className="font-medium">
                Application Deadline
              </label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="border-2 border-green-600 outline-green-700 mt-1 py-[8px] px-4 w-[100%]"
              />
            </div>

            <div className="col-span-2">
              <ReactQuill
                theme="snow"
                value={jobDesc}
                onChange={setDesc}
                className="h-[300px] msm:h-[250px]"
              />
            </div>
            <div className="text-center msm:pt-[12%] col-span-2 ">
              <Button type="submit" className="mt-[10%]  bg-color ">
                Create Job
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddJob;
