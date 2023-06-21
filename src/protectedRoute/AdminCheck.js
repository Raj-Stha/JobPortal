import jwtDecode from "jwt-decode";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const AdminCheck = () => {
  const data = useSelector((store) => store.userInfo.userDetail);
  if (data === null) {
    return <Navigate to={"/login"} replace />;
  } else {
    const decode = jwtDecode(data.token);
    if (decode.isEmployee) {
      return <Outlet />;
    } else {
      return <Navigate to={"/"} replace />;
    }
  }
};
export default AdminCheck;
