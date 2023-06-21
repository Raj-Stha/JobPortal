import jwtDecode from "jwt-decode";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router";

const CheckToken = () => {
  const data = useSelector((store) => store.userInfo.userDetail);
  const location = useLocation();

  if (data === null) {
    return <Outlet />;
  } else {
    const decode = jwtDecode(data.token);
    if (decode.isEmployee) {
      return <Navigate to={"/admin"} replace />;
    } else {
      if (location.state) {
        return <Navigate to={location.state} replace />;
      } else {
        return <Outlet />;
      }
    }
  }
};

export default CheckToken;
