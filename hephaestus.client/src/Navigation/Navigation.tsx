import React from 'react'
import { Navbar, Nav } from "react-bootstrap";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import "./Navigation.css";
import AddFailure from '../Add_Failure/AddFailure';
import Edit_Failure from '../Edit_Failure/Edit_Failure';
import Failure_Details from '../Failure_Details/Failure_Details';
import Home from '../Home/Home';
import FailureList from '../Failure_List/FailureList';
function Navigation() {
    return (
        <Router>
            <Navbar bg="dark" variant="dark" className="custom-navbar">
                <Navbar.Brand>
                </Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to={"/"}>Strona Główna</Nav.Link>
                    <Nav.Link as={Link} to={"/failure/list"}>Lista awarii</Nav.Link>
                    <Nav.Link as={Link} to={"/failure/add"}>Dodaj awarię</Nav.Link>
                    <Nav.Link as={Link} to={"/failure/edit/:id"}>Edycja awarii</Nav.Link>
                </Nav>
            </Navbar>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/failure/list" element={<FailureList />} />
                <Route path="/failure/details/:id" element={<Failure_Details />} />
                <Route path="/failure/edit/:id" element={<Edit_Failure />} />
                <Route path="/failure/add" element={<AddFailure />} />
            </Routes>
        </Router>

    );
}

export default Navigation;