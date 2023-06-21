import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

export const RedirectHomepage = () => {
  const data = useSelector((store) => store.userInfo.userDetail);

  if (data === null) {
    return <Navigate to={"/"} replace />;
  } else {
    return <Outlet />;
  }
};
export default RedirectHomepage;
