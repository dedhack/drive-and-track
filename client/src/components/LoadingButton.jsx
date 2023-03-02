import React from "react";
import { Button, Spinner } from "flowbite-react";

const LoadingButton = ({ text }) => {
  return (
    <div className="">
      <Button>
        <Spinner />
        <span className="pl-3">{text}</span>
      </Button>
    </div>
  );
};

export default LoadingButton;
