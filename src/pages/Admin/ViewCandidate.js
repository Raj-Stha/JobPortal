import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { useGetSingleJobDetailQuery } from "../../features/jobApi";
import Loading from "../../components/Loading";

const ViewCandidate = () => {
  const { id } = useParams();
  const { token } = useSelector((store) => store.userInfo.userDetail);

  const { data, isLoading } = useGetSingleJobDetailQuery({
    token,
    id: id,
  });

  console.log(data);
  if (isLoading) {
    return (
      <div className="h-[85vh] py-[13%] mb-[3px] mmd:pt-[16%] msm:pt-[55%] msm:h-[89vh]">
        <Loading />
      </div>
    );
  }
  return (
    <div className="h-[85vh] mb-[3px]">
      <div className=" text-center bg-gray-100 font-medium text-xl py-4">
        <h2>Candidate List</h2>
      </div>
      {data?.jobs.appliedCandidate.length === 0 ? (
        <div className="h-[80vh] pt-[14%] msm:pt-[40%]">
          <h3 className="text-center text-xl"> Not Aplied Yet !!!</h3>
        </div>
      ) : (
        <table className="  my-8 msm:mt-6 mx-auto border  border-collapse msm:px-2  ">
          <tbody>
            <tr className="  bg-color text-center text-white h-[45px] msm:text-sm  ">
              <td className="px-7 msm:px-2 msm:w-5">S.No</td>
              <td className="px-7 msm:px-2">Applicant Name</td>
              <td className="px-7 msm:px-2">Applied Date</td>
              <td className=" px-7 msm:px-2">Bio Data</td>
            </tr>

            {data?.jobs.appliedCandidate.map((job, index) => {
              return (
                <tr key={index} className="cursor-pointer msm:text-sm">
                  <td className="px-7 py-4 msm:px-1 msm:py-2 msm:w-5">
                    {index + 1}
                  </td>
                  <td className="px-7 py-4 msm:px-1 msm:py-2 msm:w-5">
                    {job.fullName}
                  </td>
                  <td className="px-7 py-4 msm:px-1 msm:py-2 msm:w-5">
                    {new Date(job.appliedDate).toDateString()}
                  </td>
                  <td className="px-7 py-4 msm:px-1 msm:py-2 msm:w-18">
                    <a href={job.cv} target="_blank" rel="noreferrer">
                      {job.fullName} CV
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};
export default ViewCandidate;
