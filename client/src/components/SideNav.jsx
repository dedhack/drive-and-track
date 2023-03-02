import React from "react";
import {
  HiChartPie,
  HiViewBoards,
  HiInbox,
  HiUser,
  HiShoppingBag,
  HiArrowSmRight,
  HiTable,
} from "react-icons/hi";
import { Sidebar } from "flowbite-react";
import { FcAutomotive } from "react-icons/fc";
import { NavLink } from "react-router-dom";

const SideNav = () => {
  return (
    <div className="h-screen w-10">
      <Sidebar className="w-fit h-screen">
        <NavLink to={"/home"}>
          <Sidebar.Logo className="">
            <FcAutomotive className="inline-block" />
            Drive & Track
          </Sidebar.Logo>
        </NavLink>

        <Sidebar.Items>
          <Sidebar.ItemGroup className="bg-transparent">
            <Sidebar.Item href="#" icon={HiChartPie}>
              Dashboard
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiViewBoards}>
              Kanban
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiInbox}>
              Inbox
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiUser}>
              Users
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiShoppingBag}>
              Products
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiArrowSmRight}>
              Sign In
            </Sidebar.Item>
            <Sidebar.Item href="/logout" icon={HiTable}>
              Logout
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
};

export default SideNav;
