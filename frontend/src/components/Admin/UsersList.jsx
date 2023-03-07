import React from "react";
import { FaUserAlt } from "react-icons/fa";

const UsersList = () => {

    
  const handleDelete = () => {
    console.log("Delete");
  };

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
            <tr>
              <td>
                <div className="flex items-center space-x-2">
                  <div className="avatar">
                    <FaUserAlt size="2.0rem" className="m-2" />
                  </div>
                  <div>
                    <div className="font-bold">username</div>
                  </div>
                </div>
              </td>
              <td>
                email
                <br />
                <span className="badge badge-ghost badge-sm">id</span>
              </td>
              <td>is_admin</td>
              <th>
                <button className="btn btn-ghost btn-xs" onClick={handleDelete}>
                  Delete
                </button>
              </th>
            </tr>
            {/* row 2 */}
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
