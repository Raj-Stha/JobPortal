import { useGetJobByCompanyQuery } from "../../../features/jobApi";
import { useNavigate } from "react-router";
import Loading from "../../../components/Loading";

const Company = () => {
  const { data, isLoading } = useGetJobByCompanyQuery();
  const nav = useNavigate();

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="px-10 mx-10 pt-2 pb-9 mxl:px-5 mxl:mx-5 msm:px-2 msm:mx-2 msm:pb-6">
          <h2 className="font-semibold text-2xl msm:text-xl   msm:pb-4 text-center pb-6">
            Companies{" "}
          </h2>
          <div className="grid grid-cols-3 gap-x-7 gap-y-5 mmd:grid-cols-2 msm:grid-cols-1">
            {data?.details.map((job, index) => {
              return (
                <div
                  className="flex items-center bg-gray-50 rounded-sm shadow-md py-3 px-3  space-x-5"
                  key={index}
                >
                  <div className="w-[125px]   ">
                    <img
                      src={job?.companyLogo}
                      alt=""
                      className="w-[100%] h-[100%] object-cover rounded-md"
                    />
                  </div>
                  <div className="w-[70%] mlg:w-[100%]">
                    <h2 className="text-lg font-semibold">
                      {job?.companyName}
                    </h2>
                    <div className="flex space-x-2 items-center text-xs ">
                      <i className="fa-solid fa-location-dot text-color"></i>
                      <h2 className=" text-sm">{job?.address}</h2>
                    </div>

                    <div className="px-5 pt-1">
                      <ul className="list-disc cursor-pointer text-sm select-none ">
                        {job?.createdJobs.map((jobList, index) => {
                          if (index < 2 && jobList.jobID !== null) {
                            return (
                              <li
                                className="text-color hover:text-red-500"
                                key={index}
                                onClick={() =>
                                  nav(`/job/${jobList.jobID?._id}`)
                                }
                              >
                                {jobList.jobID.jobTitle}
                              </li>
                            );
                          }
                          return null;
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
export default Company;
