import useStore from 'hooks/useStore';
import { observer } from 'mobx-react-lite';
import React from 'react';
import {Navbar, Nav, Container, NavDropdown, Badge} from 'react-bootstrap';
import {Link as LinkContainer, useHistory} from 'react-router-dom';
import SearchBox from './SearchBox';


const Header = () => {
  const {cartStore, userStore} = useStore();
  const {userInfo } = userStore;
  const {cartItems} = cartStore;
  const countCart = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const history = useHistory()

  const logoutHandler = () => {
      userStore.logout();
      history.push('/');
  };



  return (
    <header>
        <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
            <Container>
              <LinkContainer to='/'>
              <Navbar.Brand >Proshop</Navbar.Brand>
              </LinkContainer>
            <Navbar.Toggle className='mb-2' aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <SearchBox/> 
            <Nav className="ml-auto">
                 <LinkContainer to="/cart" className='mr-4 d-flex align-items-center dropdown-toggle nav-link'>
                    <div  style={{color: '#fff', position: 'relative'}}><i className='fas fa-shopping-cart'></i> Cart
                    {cartItems.length !== 0 && <span style={{top: '-5px', position: 'absolute'}} className='badge bg-success badge-pill'>
                        {countCart}
                    </span>}
                     </div>
                 </LinkContainer>
                 {
                   userInfo ? (
                      <NavDropdown title={userInfo.name} id='username'>
                        <LinkContainer to='/profile'>
                          <NavDropdown.Item as='div'>Profile</NavDropdown.Item>
                        </LinkContainer>
                          <NavDropdown.Item as='button' onClick={logoutHandler}>Logout</NavDropdown.Item>
                      </NavDropdown>
                   ) : (
                    <LinkContainer to="/login"  className='d-flex mb-1  align-items-center'>
                    <div style={{color: '#fff'}}><i className='fas fa-user'></i> Sign In</div>
                    </LinkContainer>
                   )
                 }

                 {userInfo && userInfo.isAdmin && (
                    <NavDropdown title='Admin' id='users'>
                      <LinkContainer to='/admin/userlist'>
                        <NavDropdown.Item as='div'>Users</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/productlist'>
                        <NavDropdown.Item as='div'>Products</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/orderlist'>
                        <NavDropdown.Item as='div'>Orders</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                 )}
                
            </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default observer(Header);