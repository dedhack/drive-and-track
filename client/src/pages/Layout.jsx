import { Outlet } from "react-router-dom";
import SideNav from "../components/SideNav";

const Layout = () => {
  return (
    <div>
      <Outlet />
      <SideNav />
    </div>
  );
};

export default Layout;
