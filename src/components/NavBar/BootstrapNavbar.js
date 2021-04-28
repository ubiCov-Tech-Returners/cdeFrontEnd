import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BootstrapNavbar.css';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'

class BootstrapNavbar extends React.Component {


    render() {


        return (
            <Navbar bg="dark" expand="lg">
                <Navbar.Brand href="#home"><img src="../images/ubiCov-logo2.png" class="ubi_logo" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavDropdown title="Questions" id="basic-nav-dropdown" className="invert">
                            <NavDropdown.Item className="nav-link" href="#action/3.1" >Is vaccination uptake lesser in areas with lower income?</NavDropdown.Item>
                            <NavDropdown.Item className="nav-link" href="#action/3.2">Have covid cases fallen enough to safely reopen my business?</NavDropdown.Item>
                            <NavDropdown.Item className="nav-link" href="#action/3.3">How has Covid-19 affected businesses in your area?</NavDropdown.Item>
                            <NavDropdown.Item className="nav-link" href="#action/3.4">Is the spread of Covid-19 in your area related to nights out?</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default BootstrapNavbar;