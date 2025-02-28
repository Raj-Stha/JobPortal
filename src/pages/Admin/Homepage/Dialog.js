import { Fragment } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { useDeleteJobPostMutation } from "../../../features/jobApi";
import { toast } from "react-toastify";

const PopUpBar = ({ popup, setPopup, jobID }) => {
  const { token } = useSelector((store) => store.userInfo.userDetail);

  const [deleteJobPost] = useDeleteJobPostMutation();

  const deleteJob = async () => {
    setPopup(false);
    try {
      const result = await deleteJobPost({ token, jobID }).unwrap();
      if (result) {
        if (result.status === "success") {
          toast.success(result?.message);
        } else {
          toast.error(result?.message);
        }
      } else {
        toast.error("Unable to Delete Post");
      }
    } catch (e) {
      toast.error(`${e}`);
    }
  };

  return (
    <Fragment>
      <Dialog open={popup} handler={() => setPopup(false)} className="">
        <DialogHeader className="text-sm">
          Do you want Delete the Job Post ?
        </DialogHeader>

        <DialogFooter className="space-x-4 msm:space-x-1 msm:mt-[-20%]  msm:space-y-2">
          <Button
            variant="text"
            color="red"
            onClick={() => setPopup(false)}
            className="mr-1 msm:mr-0 msm:px-3"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            className="msm:px-3 "
            color="green"
            onClick={() => deleteJob()}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
};
export default PopUpBar;
