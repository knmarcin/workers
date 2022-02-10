import React from "react";
import Navbar from "react-bootstrap/Navbar";
import NavbarBrand from "react-bootstrap/NavbarBrand";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <Navbar>
      <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
        <NavbarBrand>Workers.App</NavbarBrand>
      </Link>
    </Navbar>
  );
};

export default Header;
