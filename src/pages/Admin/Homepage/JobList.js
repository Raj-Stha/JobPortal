import { useNavigate } from "react-router";
import { useGetCreatedJobQuery } from "../../../features/jobApi";
import { useSelector } from "react-redux";
import { useState } from "react";
import PopUpBar from "./Dialog";

const JobList = ({ data }) => {
  const nav = useNavigate();
  const convertedDate = (dates) => {
    const date = new Date(dates);
    return date.toDateString();
  };

  const [popup, setPopup] = useState(false);
  const [jobID, setjobID] = useState("");

  return (
    <div className="mb-[3px] h-auto">
      <div className=" text-center  font-medium text-xl pt-4  bg-gray-50 pb-6">
        <h2>My Jobs List</h2>
      </div>

      <table className=" mb-8 mx-auto border  border-collapse ">
        <thead className="mlg:text-sm">
          <tr className="  bg-color text-white h-[45px] ">
            <td className="px-5 mlg:px-3 msm:px-2 ">Title</td>

            <td className="px-5 mlg:px-3 mlg:w-32 msm:hidden">Job Type</td>
            <td className="px-5 mlg:px-3 mlg:w-40 msm:hidden">Posted Date</td>
            <td className="px-5 mlg:px-3 mlg:w-38 msm:hidden">
              Application Deadline
            </td>
            <td className="px-5 mlg:px-3 msm:px-2 ">Job Status</td>

            <td className="px-5 mlg:px-3 mlg:w-[20px] mlg:text-cente msm:hidden">
              No of Candidate
            </td>

            <td className=" px-8  msm:px-5" colSpan={3}>
              Actions
            </td>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-300 mlg:text-sm">
          {data?.jobs.map((job, index) => {
            return (
              <tr
                key={index}
                className={`cursor-pointer ${
                  (index + 1) % 2 === 1 && "bg-gray-50"
                }`}
              >
                <td className="px-5 py-4 msm:px-2 msm:py-3">{job?.jobTitle}</td>
                <td className="px-5 py-4 msm:hidden">{job?.jobType}</td>
                <td className="px-5 py-4 msm:hidden">
                  {convertedDate(job?.createdAt)}
                </td>
                <td className="px-5 py-4 msm:hidden">
                  {convertedDate(job?.applicationDeadline)}
                </td>

                {job?.jobStatus === "Active" ? (
                  <td className="text-center text-color ">{job?.jobStatus} </td>
                ) : (
                  <td className="text-center text-red-500 ">
                    {job?.jobStatus}
                  </td>
                )}

                {job?.appliedCandidate.length === 0 ? (
                  <td className="text-center msm:hidden">0</td>
                ) : (
                  <td className="text-center msm:hidden">
                    {job?.appliedCandidate.length}
                  </td>
                )}

                <td className="text-center">
                  <i
                    className="fa-regular fa-eye p-3  hover:text-red-400 mmd:px-2  msm:p-0"
                    onClick={() => nav(`/admin/view/${job?._id}`)}
                  ></i>
                </td>
                <td className="text-center">
                  <i
                    className="fa-solid fa-pen p-3 mmd:px-2 msm:p-0 hover:text-red-400"
                    onClick={() => nav(`/admin/update/${job?._id}`)}
                  ></i>
                </td>
                <td className="text-center">
                  <i
                    className="fa-sharp fa-solid fa-trash p-3  pr-6 mmd:px-2 msm:p-0 hover:text-red-400"
                    onClick={() => {
                      setjobID(job?._id);
                      setPopup(!popup);
                    }}
                  ></i>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {popup && jobID && (
        <PopUpBar jobID={{ jobID }} setPopup={setPopup} popup={popup} />
      )}
    </div>
  );
};
export default JobList;
