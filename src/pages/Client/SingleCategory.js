import { useNavigate, useParams } from "react-router";
import { useGetJobByCategoryQuery } from "../../features/jobApi";
import { baseURL } from "../../constant/Constant";
import { ScrollTop } from "../../components/ScrollTop";
import Loading from "../../components/Loading";

const SingleCategory = () => {
  ScrollTop();

  const { categoryName } = useParams();
  let url;
  const nav = useNavigate();

  const res = categoryName.split("-");
  if (res.length > 1) {
    const data = res.map((d) =>
      d.substring(0, 1).toUpperCase().concat(d.substring(1))
    );
    url = data.join(" ");
  } else {
    url = res[0].substring(0, 1).toUpperCase().concat(res[0].substring(1));
  }

  const { data, isLoading } = useGetJobByCategoryQuery(url);

  return (
    <>
      {isLoading ? (
        <div className="h-[84vh] py-[13%] mb-[2px] mmd:pt-[16%] msm:pt-[55%] msm:h-[89vh]">
          <Loading />
        </div>
      ) : (
        <div className="pt-5 pb-10 mx-8 px-8 mxl:px-4 mxl:mx-4 msm:px-2 msm:mx-2 mmd:pt-[1%] msm:pt-[15%]">
          {data && data?.status === "error" ? (
            <div className="h-[76vh] msm:h-[71vh] mb-[1px]">
              <h2 className="font-semibold text-2xl pt-4 text-center pb-4">
                {url}{" "}
              </h2>
              <div className="pt-[11%] msm:pt-[30%] ">
                <h2 className="  text-xl  msm:text-base text-center pb-8">
                  No Jobs Added to this Category
                </h2>
              </div>
            </div>
          ) : (
            <div className="h-[76vh] mb-[1px] ">
              <h2 className="font-semibold text-2xl  text-center pb-8 mxl:pb-4 msm:text-xl msm:pt-[6%] mlg:pt-[2%]">
                {url}
              </h2>
              <div className="grid grid-cols-3 gap-x-6 gap-y-8 mlg:grid-cols-2 msm:grid-cols-1">
                {data?.detail.map((job, index) => {
                  return (
                    <div
                      className="flex items-center shadow-md py-4 px-4  space-x-5  cursor-pointer"
                      key={index}
                      onClick={() => nav(`/job/${job?._id}`)}
                    >
                      <div className="w-[20%] mxl:w-[25%] mmd:w-[22%]  msm:hidden ">
                        <div className=" h-[75px] mmd:h-[65px]  ">
                          <img
                            src={`${baseURL}${job?.createdBy?.companyLogo}`}
                            alt=""
                            className="w-[100%] h-[100%] object-cover rounded-md"
                          />
                        </div>
                      </div>
                      <div className="w-[75%] msm:w-[100%]  space-y-1 border-l-2   px-6 mxl:px-2 mmd:px-4 mmd:space-y-0 msm:border-l-0">
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
export default SingleCategory;
