import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
//import IconButton from '@material-ui/core/IconButton'
import { LinkContainer } from 'react-router-bootstrap'


function Header() {
    return (
        <header>
            <Navbar bg="light" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>E-Shop</Navbar.Brand>
                    </LinkContainer>
                    
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <LinkContainer to='/cart'>
                                <Nav.Link><ShoppingCartIcon /> Cart</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/login'>
                                <Nav.Link><AccountCircleIcon /> Sign Up/Log In</Nav.Link>
                            </LinkContainer>
                            
                            
                        </Nav>
                </Navbar.Collapse>

                </Container>
                
            </Navbar>
      </header>
    )
}

export default Header
