import React, { useState } from 'react';
import { Container, Nav, Navbar, NavDropdown, Offcanvas } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import FavoritesSidebar from './FavoritesSidebar';

const AppNavbar = () => {

  const navigate = useNavigate()

  const logout = () => {
    localStorage.setItem('token', '')
    navigate('/login')
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar expand="md" variant='dark' bg='primary'>
        <Container>
          <Navbar.Brand as={Link} to='/'>Shop.Me</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to='/login'>Login</Nav.Link>
              <Nav.Link as={Link} to='/purchases'>Purchases</Nav.Link>
              <Nav.Link onClick={handleShow}>Cart</Nav.Link>
              <Nav.Link onClick={logout}>Log out</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <FavoritesSidebar show={show} handleClose={handleClose}/>
    </>
  );
};

export default AppNavbar;