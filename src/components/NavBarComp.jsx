import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'react-tooltip/dist/react-tooltip.css';
import reactLogo from '../assets/react.svg';

const NavBarComp = () => {
    return (
        <Navbar expand="lg" className="p-3 bg-light fixed-top" style={{ height: '50px' }}>
            <Container style={{ display: 'flex', justifyContent: 'space-between'}}>
                {/* <Navbar.Brand as={Link} to="/">React App</Navbar.Brand> */}
                <img src={reactLogo} alt="React Logo" style={{ width: '40px', height: '40px', marginRight: '10px' }} />
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/home" data-tooltip-id="homeLink">Home</Nav.Link>
                        <Nav.Link as={Link} to="/about" data-tooltip-id="aboutLink">About</Nav.Link>
                        <Nav.Link as={Link} to="/news" data-tooltip-id="newsLink">News</Nav.Link>
                        <Nav.Link as={Link} to="/" data-tooltip-id="recipesLink">Recipes</Nav.Link>
                        <Nav.Link as={Link} to="/contact" data-tooltip-id="contactLink">Contact</Nav.Link>
                    </Nav>
                    <Nav className="ml-auto">
                        <Button as={Link} to="/login" variant="outline-primary" style={{ marginLeft: 'auto', fontWeight: 'bold', borderColor: 'blue' }}>
                            Login
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBarComp;
