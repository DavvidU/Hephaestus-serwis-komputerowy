import React from 'react'
import { Navbar, Nav } from "react-bootstrap";
import { BrowserRouter as Router, Link} from "react-router-dom";
import "./Navigation.css";
function Navigation() {
    return (
      <Router>
        <Navbar bg="dark" variant="dark" className="custom-navbar">
        <Nav className="me-auto">
        <Nav.Link as={Link} to={"/"}>Strona Główna</Nav.Link>
        <Nav.Link as={Link} to={"/failure/list"}>Lista awarii</Nav.Link>
        <Nav.Link as={Link} to={"/failure/add"}>Dodaj awarię</Nav.Link>
        <Nav.Link as={Link} to={"/failure/edit"}>Edycja awarii</Nav.Link>
        </Nav>
        </Navbar>
      </Router>
     
    );
  }
  
  export default Navigation;