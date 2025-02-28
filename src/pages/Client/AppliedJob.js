import { useSelector } from "react-redux";
import { useGetClientDetailQuery } from "../../features/userApi";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import Loading from "../../components/Loading";

const AppliedJob = () => {
  const { token } = useSelector((store) => store.userInfo.userDetail);

  const { data, isLoading } = useGetClientDetailQuery(token);

  useEffect(() => {}, [data]);
  const nav = useNavigate();

  return (
    <div className="pt-4 pb-5 w-[92%] mx-auto h-[84vh] mb-[3px]">
      {isLoading ? (
        <div className="h-[84vh] mb-[2px] pt-[12%] mmd:h-[86vh] msm:pt-[45%]">
          <Loading />
        </div>
      ) : (
        <div className="pt-[5] msm:pt-[8%]  msm:px-4 ">
          {data?.details?.appliedJob.length === 0 && (
            <h2 className="text-center font-semibold pt-[15%] text-lg  pb-16 ">
              No Job Applied Yet
            </h2>
          )}
          {data && data?.details?.appliedJob.length !== 0 && (
            <div className="">
              <h2 className=" text-xl font-semibold text-center  pb-8 msm:pb-3">
                Applied Job List
              </h2>
              <div className="grid grid-cols-4 gap-6 mmd:grid-cols-3 msm:grid-cols-1 msm:gap-3">
                {data?.details?.appliedJob.map((job, index) => {
                  return (
                    <div
                      className="shadow-md px-6 py-4 space-y-1  rounded-md hover:scale-110 duration-150 hover:sease-in-out cursor-pointer"
                      key={index}
                      onClick={() => nav(`/job/${job?.jobID._id}`)}
                    >
                      <h2 className="font-semibold text-lg">
                        {job.jobID.jobTitle}
                      </h2>
                      <div className="flex items-center space-x-3 text-sm">
                        <i className="fa-solid fa-box-open text-color"></i>
                        <h3>{job.jobID.jobCategories}</h3>
                      </div>
                      <div className="flex items-center space-x-3 text-sm">
                        <i className="fa-solid fa-clock text-color"></i>
                        <h3>{job.jobID.jobType}</h3>
                      </div>

                      <div className="flex items-center space-x-3 text-sm">
                        <i className="fa-regular fa-clock text-color"></i>
                        <h4>
                          {new Date(
                            job.jobID.applicationDeadline
                          ).toDateString()}
                        </h4>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default AppliedJob;
