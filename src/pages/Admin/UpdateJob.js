import { useGetSingleJobDetailQuery } from "../../features/jobApi";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import JobUpdate from "./UpdateJob/JobUpdate";
import Loading from "../../components/Loading";

const UpdateJob = () => {
  const { id } = useParams();
  const { token } = useSelector((store) => store.userInfo.userDetail);

  const { data, isLoading: isload } = useGetSingleJobDetailQuery({
    token,
    id: id,
  });
  if (isload) {
    return (
      <div className="h-[85vh] py-[13%] mb-[3px] mmd:pt-[16%] msm:pt-[55%] msm:h-[89vh]">
        <Loading />
      </div>
    );
  }

  return <div className="">{data && <JobUpdate data={data} />}</div>;
};
export default UpdateJob;
