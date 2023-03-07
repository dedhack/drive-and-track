import React from "react";
import UsersList from "../components/Admin/UsersList";
const Admin = () => {
  return (
    <div className="text-center">
      <div className="text-2xl p-10">Admin Dashboard</div>

      <div className="text-xl">Users</div>
      <div>
        <UsersList />
      </div>
    </div>
  );
};

export default Admin;
