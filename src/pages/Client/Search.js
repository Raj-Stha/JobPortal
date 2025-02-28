import { useNavigate, useParams } from "react-router";
import { useGetSearchedJobQuery } from "../../features/jobApi";
import Loading from "../../components/Loading";

const Search = () => {
  const { jobName } = useParams();
  const { data, isLoading } = useGetSearchedJobQuery(jobName);
  const nav = useNavigate();
  return (
    <>
      {isLoading ? (
        <div className="h-[84vh] mb-[2px] pt-[12%] mmd:h-[86vh] msm:pt-[45%]">
          <Loading />
        </div>
      ) : (
        <div className="py-5 w-[92%] mx-auto ">
          {data?.status === "error" ? (
            <div className="text-center h-[79vh] pt-[18%] msm:h-[81vh] mmd:pt-[30%] msm:pt-[55%]">
              <h2 className="  text-xl  text-center pb-8">
                No Search Result Found
              </h2>
            </div>
          ) : (
            <div className="h-[79vh] ">
              <h2 className="text-xl pb-4  msm:pt-[5%] ">
                <span className="font-semibold text-color">
                  {" "}
                  Search Result :{" "}
                </span>{" "}
                {jobName}
              </h2>
              <div className="grid grid-cols-3 gap-x-6 gap-y-8 mlg:grid-cols-2 msm:grid-cols-1 msm:gap-y-4">
                {data?.details.map((job, index) => {
                  return (
                    <div
                      className="flex items-center shadow-md py-4 px-4  space-x-5  cursor-pointer mmd:space-x-4"
                      key={index}
                      onClick={() => nav(`/job/${job?._id}`)}
                    >
                      <div className="w-[20%] msm:hidden">
                        <div className="">
                          <img
                            src={job?.createdBy?.companyLogo}
                            alt=""
                            className="w-[100%] h-[100%] object-cover rounded-md"
                          />
                        </div>
                      </div>
                      <div className="w-[75%]  space-y-1 border-l-2   px-6 mmd:px-4 msm:border-l-0 msm:px-0">
                        <h2 className="text-lg font-semibold ">
                          {job?.jobTitle}
                        </h2>
                        <h2 className="font-semibold text-color">
                          {job?.createdBy?.companyName}
                        </h2>

                        <div className="flex space-x-2  items-center text-xs ">
                          <i className="fa-solid fa-location-dot text-color"></i>
                          <h2 className=" text-sm">
                            {job?.createdBy?.address}
                          </h2>
                        </div>

                        <div className="flex space-x-2 items-center text-xs ">
                          <i className="fa-solid fa-clock text-color"></i>
                          <h2 className=" text-sm">{job?.jobType}</h2>
                        </div>

                        <h3 className="text-sm  pt-1 font-medium">
                          Deadline:{" "}
                          {new Date(job?.applicationDeadline).toDateString()}
                        </h3>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
export default Search;
