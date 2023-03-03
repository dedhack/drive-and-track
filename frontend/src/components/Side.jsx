import { Avatar } from "flowbite-react";
import React, { useState } from "react";

import {
  FaCarAlt,
  FaGasPump,
  FaSignOutAlt,
  FaHome,
  FaScrewdriver,
  FaChartPie,
  FaUserCircle,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import UserAvatar from "./UserAvatar";

const Side = () => {
  const [isOpen, setIsOpen] = useState(false);

  // TODO: props for vehicles to be done at vehicle page

  return (
    <>
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-100 text-base-content">
            <li>
              <a>Sidebar Item 1</a>
            </li>
            <li>
              <a>Sidebar Item 2</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Side;
