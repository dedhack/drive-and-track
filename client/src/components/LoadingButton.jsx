import React from "react";
import { Button, Spinner } from "flowbite-react";

const LoadingButton = () => {
  return (
    <div className="">
      <Button>
        <Spinner />
        <span className="pl-3">Loading...</span>
      </Button>
    </div>
  );
};

export default LoadingButton;
