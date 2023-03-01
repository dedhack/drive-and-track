import React, { react } from "react";
import { Navbar } from "flowbite-react";

const TopBar = () => {
  return (
    <div>
      <Navbar fluid={true} rounded={true}>
        <Navbar.Brand>
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Flowbite
          </span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link href="/navbars" active={true}>
            Home
          </Navbar.Link>
          <Navbar.Link>About</Navbar.Link>
          <Navbar.Link href="/home">Home</Navbar.Link>
          <Navbar.Link href="/login">Login</Navbar.Link>
          <Navbar.Link href="/register">Register</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default TopBar;
