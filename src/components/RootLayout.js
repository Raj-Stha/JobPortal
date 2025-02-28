import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import AdminHeader from "./AdminHeaders";

const RootLayout = () => {
  const data = useSelector((store) => store.userInfo.userDetail);
  let decode;
  if (data) {
    decode = jwtDecode(data.token);
  }

  return (
    <div>
      {decode && decode.isEmployee ? <AdminHeader /> : <Header />}
      <Outlet />
      <Footer />
    </div>
  );
};
export default RootLayout;
