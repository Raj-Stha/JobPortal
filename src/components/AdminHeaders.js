import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { removeUserDetail } from "../features/userSlice";

const AdminHeader = () => {
  const nav = useNavigate();
  const [dropdown, setDp] = useState(false);
  const dispatch = useDispatch();
  return (
    <div className="relative">
      <div className="flex items-center justify-between px-6 py-3 sticky top-0 msm:px-3">
        <div className="">
          <h1
            className="text-2xl font-semibold text-color cursor-pointer msm:text-base"
            onClick={() => {
              setDp(false);
              nav("/admin");
            }}
          >
            JobsPortal
          </h1>
        </div>
        <div className="flex space-x-6 pr-8 text-color items-center select-none cursor-pointer msm:space-x-3 mmd:pr-0 msm:pr-0 ">
          <NavLink
            className="font-medium   hover:text-red-500 py-2 px-2 msm:text-sm"
            to={"/admin/add-job"}
            onClick={() => setDp(false)}
          >
            Add a Job
          </NavLink>
          <div
            className={`flex space-x-3 items-center  px-3 py-1 rounded-md msm:space-x-2 msm:py-2 ${
              dropdown ? "bg-green-700" : "bg-color"
            }`}
            onClick={() => setDp(!dropdown)}
          >
            <img
              alt="user 1"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
              className="relative inline-block h-9 w-9 rounded-full border-2 border-white object-cover object-center msm:w-6 msm:h-6"
            />{" "}
            {dropdown ? (
              <i className="fa-solid text-white fa-angle-down pt-1 rotate-180"></i>
            ) : (
              <i className="fa-solid text-white fa-angle-down pt-1"></i>
            )}
          </div>
        </div>
      </div>
      {dropdown && (
        <div className="select-none cursor-pointer absolute  right-16 space-y-2 shadow-md  z-30    bg-white  text-base flex flex-col mmd:right-6 msm:right-2 ">
          <NavLink
            className="hover:text-green-800 px-4  pt-3 pb-3 msm:p-3"
            onClick={() => {
              setDp(false);
              dispatch(removeUserDetail());
            }}
          >
            Sign out
          </NavLink>
        </div>
      )}
    </div>
  );
};
export default AdminHeader;
