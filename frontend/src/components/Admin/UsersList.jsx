import React, { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { getAllUsers, deleteUser } from "../../apis/usersAPI";
import useAuth from "../../hooks/useAuth";
const UsersList = () => {
  const { auth } = useAuth();

  const [users, setUsers] = useState([]);
  // fetch list of users

  const fetchUsers = async () => {
    // need to pass in auth token
    const [data, error] = await getAllUsers(auth);
    if (Array.isArray(data)) {
      setUsers(data);
      console.log("users: ", users);
    } else if (data?.message) {
      console.log("message: ", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  // handle delete of users
  const handleDelete = async (user_id) => {
    console.log("Delete", user_id);
    const [data, error] = await deleteUser({ id: user_id }, auth);
    if (data?.message) {
      console.log("message: ", data.message);
    }
    if (error?.message) {
      console.log("message: ", error.message);
    }
    await fetchUsers();
  };

  // map over users and create a row for each user
  let content = null;
  if (users) {
    content = users.map((user) => {
      return (
        <tr>
          <td>
            <div className="flex items-center space-x-2">
              <div className="avatar">
                <FaUserAlt size="2.0rem" className="m-2" />
              </div>
              <div>
                <div className="font-bold">{user.username}</div>
              </div>
            </div>
          </td>
          <td>
            {user.email}
            <br />
            <span className="badge badge-ghost badge-sm">{user.id}</span>
          </td>
          <td>{user.is_admin}</td>
          <th>
            <button
              className="btn btn-ghost btn-xs"
              onClick={() => handleDelete(user.id)}
            >
              Delete
            </button>
          </th>
        </tr>
      );
    });
  }

  return (
    <div>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Administrator</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {content}
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Administrator</th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default UsersList;
