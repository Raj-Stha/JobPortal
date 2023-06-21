import { useSelector } from "react-redux";
import Piechart from "./Homepage/Piechart";
import JobList from "./Homepage/JobList";
import {
  useGetCreatedJobQuery,
  useGetHomepageQuery,
} from "../../features/jobApi";
import LineChart from "./Homepage/LineChart";
import Loading from "../../components/Loading";

const AdminDashboard = () => {
  const { token } = useSelector((store) => store.userInfo.userDetail);
  const { data, isLoading } = useGetCreatedJobQuery(token);
  const { data: home, isLoading: isLoad } = useGetHomepageQuery();
  if (isLoading) {
    return (
      <div className="h-[85vh] py-[13%] mb-[3px] mmd:pt-[16%] msm:pt-[55%] msm:h-[89vh]">
        <Loading />
      </div>
    );
  }
  return (
    <div className="">
      <div className="pt-3 pb-6 bg-gray-50 ">
        <div className="grid grid-cols-3  gap-x-10 w-[75%] mx-auto   py-8 rounded-md mxl:w-[90%]  msm:grid-cols-1 msm:w-[100%]  msm:px-5 msm:space-y-2 msm:gap-y-5 msm:py-2">
          {data && <LineChart data={data} />}
          {data && <Piechart data={data} />}
        </div>
      </div>
      <div className="mlg:px-5">
        <JobList data={data} />
      </div>
    </div>
  );
};
export default AdminDashboard;
