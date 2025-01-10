import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Tooltip } from 'react-tooltip';

const NavBarComp = () => {
    return (
        <Navbar  expand="lg" style={{ marginLeft: '-10px', marginTop: '-30px' }}>
            <Container>
            <Navbar.Brand href="#home">React App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                <Nav.Link href="#home" data-tooltip-id="homeLink">Home</Nav.Link>
                    <Tooltip id="homeLink" content = "todo: homeLink" place="bottom" effect="solid" />
                <Nav.Link href="#about" data-tooltip-id="aboutLink">About</Nav.Link>
                    <Tooltip id="aboutLink" content = "todo: aboutLink" place="bottom" effect="solid" />
                <Nav.Link href="#news" data-tooltip-id="newsLink">News</Nav.Link>
                    <Tooltip id="newsLink" content = "todo: newsLink" place="bottom" effect="solid" />
                <Nav.Link href="#contact" data-tooltip-id="contactLink">Contact</Nav.Link>
                    <Tooltip id="contactLink" content = "todo: contactLink" place="bottom" effect="solid" />
                <Nav.Link href="#login" data-tooltip-id="loginLink">Login</Nav.Link>
                    <Tooltip id="loginLink" content = "todo: loginLink" place="bottom" effect="solid" />
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBarComp;