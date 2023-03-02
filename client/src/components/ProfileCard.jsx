import React from "react";
import { Card, Dropdown } from "flowbite-react";

const ProfileCard = () => {
  return (
    <div className="max-w-sm">
      <Card>
        <div className="flex justify-end px-4 pt-4"></div>
        <div className="flex flex-col items-center pb-10">
          <img
            className="mb-3 h-24 w-24 rounded-full shadow-lg"
            src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
            alt="Bonnie image"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            Bonnie Green
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Visual Designer
          </span>
        </div>
      </Card>
    </div>
  );
};

export default ProfileCard;
