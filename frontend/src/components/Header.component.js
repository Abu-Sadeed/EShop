import React from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
//import IconButton from '@material-ui/core/IconButton'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../action/userAction'


function Header() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        dispatch(logout())
    }

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
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
                            {userInfo ? (
                                <NavDropdown title={userInfo.data.name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>Log Out</NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                            <LinkContainer to='/login'>
                                <Nav.Link>
                                    <AccountCircleIcon />Log In
                                </Nav.Link>
                            </LinkContainer>)}
                                                       
                            
                        </Nav>
                </Navbar.Collapse>

                </Container>
                
            </Navbar>
      </header>
    )
}

export default Header
