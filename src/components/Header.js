import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { removeUserDetail } from "../features/userSlice";
import { useFormik } from "formik";

const Header = () => {
  const nav = useNavigate();
  const user = useSelector((store) => store.userInfo.userDetail);

  const [dropdown, setDp] = useState(false);
  const [account, setAccount] = useState(false);
  const dispatch = useDispatch();
  const [search, setSearch] = useState(false);
  const [menubar, setMenubar] = useState(false);
  const fromik = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: (value, { resetForm }) => {
      if (value.search) {
        setSearch(false);
        resetForm();
        nav(`search/${value.search}`);
      }
    },
  });
  return (
    <div className="relative mb-[5%]">
      <div className="fixed top-0 w-[100%] bg-white z-30">
        <div className="flex items-center justify-between px-7 py-3     msm:px-4">
          <div className="">
            <h1
              className="text-2xl font-semibold text-color cursor-pointer msm:text-xl"
              onClick={() => {
                setSearch(false);
                setMenubar(false);
                setAccount(false);
                setDp(false);
                nav("/");
              }}
            >
              JobsPortal
            </h1>
          </div>

          <>
            {/* Small MenuBar */}
            <div className="hidden mlg:flex items-center space-x-2 text-xl msm:text-base msm:space-x-3">
              <i
                className="fa-solid fa-magnifying-glass  px-2 py-1 msm:px-1"
                onClick={() => {
                  setDp(false);
                  setMenubar(false);
                  return setSearch(!search);
                }}
              ></i>
              {user === null && (
                <i
                  className="fa-solid fa-user  px-2 py-1 msm:px-1"
                  onClick={() => {
                    setSearch(false);
                    setDp(false);
                    return setMenubar(!menubar);
                  }}
                ></i>
              )}
              <i
                className="fa-solid fa-bars  px-2 py-1 msm:px-1 "
                onClick={() => {
                  setSearch(false);
                  setMenubar(false);
                  return setDp(!dropdown);
                }}
              ></i>
            </div>

            {/* Ends Here */}

            {/* Large Menubar */}
            <div className="flex space-x-6 pr-5 text-color items-center select-none cursor-pointer mlg:hidden mxl:space-x-3 mxl:pr-0  ">
              <form className="" onSubmit={fromik.handleSubmit}>
                <div className="flex  items-center border-1 rounded-md border-gray-200 overflow-hidden ">
                  <input
                    className="  py-2 px-4  outline-none w-[400px]   border-2 mxl:w-[300px]  "
                    type="text"
                    name="search"
                    placeholder="Search by job title ............ "
                    onChange={fromik.handleChange}
                    value={fromik.values.search}
                  />
                  <i
                    className="fa-solid fa-magnifying-glass px-5 py-3 hover:text-red-500 border-r-2  border-t-2
                      border-b-2 border-l-0 border-gray-200 border-l-white"
                    onClick={fromik.handleSubmit}
                  ></i>
                </div>
              </form>

              <Link
                className="font-medium   hover:text-red-500 py-2 px-1"
                to={"/categories"}
                replace
                onClick={() => {
                  setDp(false);
                  setMenubar(false);
                  return setAccount(false);
                }}
              >
                Categories
              </Link>
              <Link
                className="font-medium   hover:text-red-500 py-2 px-1"
                to={"/companies"}
                replace
                // reloadDocument={true}
                onClick={() => {
                  setDp(false);
                  setMenubar(false);
                  return setAccount(false);
                }}
              >
                Companies
              </Link>

              {/* Not Login User */}
              {user === null ? (
                <>
                  <NavLink
                    className="font-medium  hover:text-red-500 py-2 px-1"
                    to={"/login"}
                    onClick={() => setMenubar(false)}
                  >
                    Login
                  </NavLink>
                  <div
                    className="flex space-x-2 items-center font-medium"
                    onClick={() => setMenubar(!menubar)}
                  >
                    <h2 className="  py-2 px-1">Register</h2>
                    {dropdown ? (
                      <i className="fa-solid fa-angle-down pt-1 rotate-180"></i>
                    ) : (
                      <i className="fa-solid fa-angle-down pt-1"></i>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <Link
                    className="font-medium   hover:text-red-500 py-2 px-1"
                    to={"/applied-job"}
                    replace
                    // reloadDocument={true}
                    onClick={() => {
                      return setAccount(false);
                    }}
                  >
                    Applied Job
                  </Link>

                  <div
                    className={`flex space-x-3 items-center  px-3 py-1 rounded-md  ${
                      account ? "bg-green-700" : "bg-color"
                    }`}
                    onClick={() => setAccount(!account)}
                  >
                    <img
                      alt="user 1"
                      src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
                      className="relative inline-block h-9 w-9 rounded-full border-2 border-white object-cover object-center"
                    />{" "}
                    {account ? (
                      <i className="fa-solid text-white fa-angle-down pt-1 rotate-180"></i>
                    ) : (
                      <i className="fa-solid text-white fa-angle-down pt-1"></i>
                    )}
                  </div>
                </>
              )}
            </div>
            {/* Ends Here */}
          </>
        </div>

        {menubar && user === null && (
          <div className="select-none cursor-pointer absolute  right-0 space-y-2 shadow-md   mr-10 bg-white  text-base flex flex-col  mmd:mr-0 msm:space-y-1">
            <NavLink
              className="hover:text-green-800 px-4 msm:pt-2  pt-2 msm:px-2 hidden mlg:flex"
              to={"/login"}
              onClick={() => setDp(false)}
            >
              Login
            </NavLink>
            <NavLink
              className="hover:text-green-800 px-4   msm:px-2"
              to={"/register-employee"}
              onClick={() => setDp(false)}
            >
              Employer Register
            </NavLink>
            <NavLink
              className="hover:text-green-800 px-4 msm:pb-2  pb-3 msm:px-2"
              to={"/register-jobseeker"}
              onClick={() => setDp(false)}
            >
              JobSeeker Register
            </NavLink>
          </div>
        )}

        {account && user && (
          <div className="select-none cursor-pointer absolute  right-14 space-y-2 shadow-md  z-30    bg-white  text-base flex flex-col ">
            <NavLink
              className="hover:text-green-800 px-4  pt-3 pb-3"
              onClick={() => {
                setAccount(false);
                dispatch(removeUserDetail());
              }}
            >
              Sign out
            </NavLink>
          </div>
        )}

        {dropdown && user && (
          <div className="select-none cursor-pointer absolute  right-0 px-3 space-y-2 shadow-md  z-30    bg-white  text-base flex flex-col ">
            <Link
              className="font-medium   hover:text-red-500 pt-2 px-2"
              to={"/categories"}
              replace
              onClick={() => {
                setDp(false);
                return setAccount(false);
              }}
            >
              Categories
            </Link>
            <Link
              className="font-medium   hover:text-red-500  px-2"
              to={"/companies"}
              replace
              onClick={() => {
                setDp(false);
                return setAccount(false);
              }}
            >
              Companies
            </Link>

            <Link
              className="font-medium   hover:text-red-500  px-2"
              to={"/applied-job"}
              replace
              onClick={() => {
                setDp(false);
                return setAccount(false);
              }}
            >
              Applied Job
            </Link>

            <NavLink
              className="hover:text-green-800 px-4   pb-3"
              onClick={() => {
                setDp(false);
                setAccount(false);
                dispatch(removeUserDetail());
              }}
            >
              Sign out
            </NavLink>
          </div>
        )}

        {dropdown && user == null && (
          <div className="select-none cursor-pointer absolute  right-0 px-3 space-y-2 shadow-md  z-30    bg-white  text-base flex flex-col ">
            <Link
              className="font-medium   hover:text-red-500 pt-2 px-2"
              to={"/categories"}
              replace
              onClick={() => {
                setDp(false);
                return setAccount(false);
              }}
            >
              Categories
            </Link>
            <Link
              className="font-medium   hover:text-red-500  px-2 pb-3"
              to={"/companies"}
              replace
              onClick={() => {
                setDp(false);
                return setAccount(false);
              }}
            >
              Companies
            </Link>
          </div>
        )}

        {search && (
          <form
            className="space-x-2 absolute top-[12%] z-30 px-5  w-[50%] left-[50%] translate-x-[-50%] msm:w-[100%] msm:top-[105%] msm:text-xs"
            onSubmit={() => fromik.handleSubmit}
          >
            <div className="flex  items-center border-2 rounded-md overflow-hidden msm:border-none">
              <input
                className="  py-2 px-4  outline-none w-[96%] msm:py-[10px]"
                type="text"
                name="search"
                placeholder="Search by job title ............ "
                onChange={fromik.handleChange}
                value={fromik.values.search}
              />
              <i
                className="fa-solid fa-magnifying-glass px-4 py-3  text-white bg-green-700  "
                onClick={fromik.handleSubmit}
              ></i>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
export default Header;
