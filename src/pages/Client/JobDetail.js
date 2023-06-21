import { useLocation, useNavigate, useParams } from "react-router";
import { useGetJobDetailQuery } from "../../features/jobApi";
import { baseURL } from "../../constant/Constant";
import { useEffect, useState } from "react";
import JobForm from "./Job Form/Jobform";
import { useSelector } from "react-redux";
import { ScrollTop } from "../../components/ScrollTop";
import Loading from "../../components/Loading";

const JobDetail = () => {
  const { id } = useParams();
  let token = useSelector((store) => store.userInfo.userDetail);
  token = token || "";
  const { data, isloading } = useGetJobDetailQuery({ id, token });

  ScrollTop();
  useEffect(() => {
    if (data?.detail?.jobDescription) {
      const value = document.querySelector(".desc-wrapper");
      value.innerHTML = data?.detail?.jobDescription;
    }
  }, [data]);

  const [popUp, setPopup] = useState(false);
  const location = useLocation();

  const nav = useNavigate();

  return (
    <>
      {isloading || data === undefined ? (
        <div className="h-[84vh] py-[13%] mb-[2px] mmd:pt-[16%] msm:pt-[55%] msm:h-[89vh]">
          <Loading />
        </div>
      ) : (
        <div>
          {data?.status === "error" ? (
            <div className="">
              <h2>{data?.message}</h2>
            </div>
          ) : (
            <div className="px-10  pt-4 pb-9 w-[70%] mxl:w-[80%] mmd:w-[100%] mmd:pt-[4%] mx-auto relative msm:px-2">
              <div className=" items-center bg-gray-100 rounded-t-sm flex   py-4 space-x-5 px-4  msm:space-x-0">
                <div className="pl-2 w-[15%] msm:hidden">
                  <img
                    src={`${baseURL}${data?.detail?.createdBy?.companyLogo}`}
                    alt=""
                    className=" w-[92%] object-cover"
                  />
                </div>
                <div className="w-[80%] space-y-4 msm:w-[100%] msm:pt-4 ">
                  <h2 className="font-semibold text-2xl  text-center  ">
                    {data?.detail?.createdBy?.companyName}
                  </h2>
                  <p className="text-justify">
                    {" "}
                    {data?.detail?.createdBy?.companyDescription.substring(
                      0,
                      250
                    )}
                  </p>
                  <div className="flex space-x-2 items-center text-xs justify-end ">
                    <i className="fa-solid fa-location-dot text-color"></i>
                    <h2 className=" text-sm text-green-800">
                      {" "}
                      {data?.detail?.createdBy?.address}
                    </h2>
                  </div>
                </div>
              </div>

              <div className="border-l-2 border-r-2">
                <div className="border-t-2 border-b-2 py-4 px-4 flex justify-between msm:px-3 msm:py-3">
                  <h3 className="font-semibold">{data?.detail?.jobTitle}</h3>
                  <h4 className="text-sm msm:hidden">
                    <span className="font-medium">Deadline :</span> &nbsp;
                    {new Date(data?.detail?.applicationDeadline).toDateString()}
                  </h4>
                </div>
                <div className="border-t-2 border-b-2 px-4 py-4  msm:px-3 msm:py-3 ">
                  <h3 className="font-semibold col-span-2  pt-2 pb-4">
                    Basic Job Information
                  </h3>
                  <div className="text-sm flex space-x-10 pt-2 pb-1 ">
                    <h2 className="font-medium w-[17%] ">Job Catagory</h2>
                    <h2 className="">
                      : &nbsp; &nbsp; &nbsp;{data?.detail?.jobCategories}
                    </h2>
                  </div>
                  <div className="text-sm pt-2 flex space-x-10 pb-1">
                    <h2 className="font-medium w-[17%]">Employement Type </h2>
                    <h2 className="">
                      :&nbsp; &nbsp; &nbsp; {data?.detail?.jobType}
                    </h2>
                  </div>
                  <div className="text-sm pt-2 flex space-x-10 pb-1">
                    <h2 className="font-medium w-[17%]">Education Level</h2>
                    <h2 className="">
                      :&nbsp; &nbsp; &nbsp; {data?.detail?.qualification}
                    </h2>
                  </div>
                  <div className="text-sm pt-2 flex space-x-10 pb-1">
                    <h2 className="font-medium w-[17%]">Experience </h2>
                    <h2 className="">
                      :&nbsp; &nbsp; &nbsp; {data?.detail?.experience}
                    </h2>
                  </div>
                  <div className="text-sm pt-2 flex space-x-10 pb-1">
                    <h2 className="font-medium w-[17%]">Offered Salary </h2>
                    <h2 className="">
                      :&nbsp; &nbsp; &nbsp; {data?.detail?.salary}
                    </h2>
                  </div>

                  <div className="text-sm pt-2 flex space-x-10 pb-1">
                    <h2 className="font-medium w-[17%]">
                      Application Deadline{" "}
                    </h2>
                    <h2 className="">
                      :&nbsp; &nbsp; &nbsp;{" "}
                      {new Date(
                        data?.detail?.applicationDeadline
                      ).toDateString()}
                    </h2>
                  </div>
                </div>

                <div className=" border-b-2 py-2 px-4 flex justify-between items-center">
                  {data?.detail?.jobStatus === "Expired" ? (
                    <>
                      <h3 className="font-semibold">Job Status</h3>
                      <h4 className="text-base px-4 text-color  py-2 font-medium ">
                        Expired
                      </h4>
                    </>
                  ) : data?.detail?.jobStatus === "Active" &&
                    data?.appliedStatus ? (
                    <>
                      <h3 className="font-semibold">Job Status</h3>
                      <h4 className="text-base px-4 text-color  py-2 font-medium ">
                        Applied
                      </h4>
                    </>
                  ) : (
                    <>
                      <h3 className="font-semibold">Job Action</h3>
                      <h4
                        className="text-sm px-4 bg-color py-3 text-white rounded-md cursor-pointer hover:bg-green-800 hover:text-gray-100 msm:px-3 msm:py-2 "
                        onClick={() => {
                          token === ""
                            ? nav("/register-jobseeker", { state: location })
                            : setPopup(!popUp);
                        }}
                      >
                        Apply Now
                      </h4>
                    </>
                  )}
                </div>

                <div className=" border-b-2 py-4 px-4 msm:px-3 msm:py-3 ">
                  <p className="text-sm px-2  py-2 desc-wrapper rounded-md "></p>

                  {data?.detail?.jobStatus === "Active" &&
                    data?.appliedStatus === false && (
                      <div className="flex  justify-end ">
                        <h4
                          className="text-sm px-4 bg-color py-3 text-white rounded-md cursor-pointer hover:bg-green-800 hover:text-gray-100 msm:px-3 msm:py-2"
                          onClick={() => {
                            token === ""
                              ? nav("/register-jobseeker", { state: location })
                              : setPopup(!popUp);
                          }}
                        >
                          Apply Now
                        </h4>
                      </div>
                    )}
                </div>
              </div>
            </div>
          )}
          {popUp && <JobForm setPopup={setPopup} jobID={data?.detail?._id} />}
        </div>
      )}
    </>
  );
};
export default JobDetail;
