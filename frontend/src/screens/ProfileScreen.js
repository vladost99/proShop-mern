import useInput from 'hooks/useInput'
import { observer } from 'mobx-react-lite'
import React, {useEffect} from 'react'
//import userStore from 'store/user'
import FormContainer from 'components/FormContainer'
import Message from 'components/Message'
import Loader from 'components/Loader'
import {Row, Col, Form, Button, Table} from 'react-bootstrap'
import { Link, useHistory} from 'react-router-dom'
import useStore from 'hooks/useStore'

const ProfileScreen = () => {
  const {userStore, ordersStore} = useStore();
  const {myOrders, loadingMyOrders} = ordersStore;

   const history = useHistory();


   const email = useInput('');
   const password = useInput('');
   const comfirmPassword = useInput('');
   const name = useInput('');
   const message = useInput(null);

   const {userInfo,user, error, loading, success} = userStore;

    

    const submitHandler = (e) => {
        e.preventDefault();

        if(password.value !== comfirmPassword.value) {
            message.setValue('Passwords do not match');
        }
        else {
            userStore.updateProfile({email: email.value, password: password.value, name: name.value,  id: user._id})
        }
    }

  useEffect(() => {
    if(!userInfo) {
      history.push('/login');
   }
   else {
    userStore.getUserDetail();
    ordersStore.getMyOrders();
   }
   
  }, []);

    useEffect(() => {
        if(!userInfo) {
            history.push('/login');
        } else {
           if(user) {
            email.setValue(user.email);
            name.setValue(user.name);
            
          }
        }
    }, [history, userInfo, user]);

  return (
    loading ? <Loader/> : (
      <Row>
        <Col md={5} lg={3}>
            <h1>User Profile</h1>
            {error && <Message variant='danger'>{error}</Message>}
    {message.value && <Message variant='danger'>{message.value}</Message>}
    {success && <Message variant='success'>Profile updated</Message>}
    {loading && <Loader/>}
     <Form onSubmit={submitHandler}>

     <Form.Group controlId='name'>
             <Form.Label>Name</Form.Label>
             <Form.Control 
               type='text'
               placeholder='Enter name'
               value={name.value}
               onChange={name.hanlder}
               ></Form.Control>
     </Form.Group>

          <Form.Group controlId='email'>
             <Form.Label>Email Address</Form.Label>
             <Form.Control 
               type='email'
               placeholder='Enter email'
               value={email.value}
               onChange={email.hanlder}
               ></Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
             <Form.Label>Password</Form.Label>
             <Form.Control 
               type='password'
               placeholder='Enter password'
               value={password.value}
               onChange={password.hanlder}
               ></Form.Control>
          </Form.Group>

          <Form.Group controlId='confirmPassword'>
             <Form.Label>Comfirm Password</Form.Label>
             <Form.Control 
               type='password'
               placeholder='Enter confirm password'
               value={comfirmPassword.value}
               onChange={comfirmPassword.hanlder}
               ></Form.Control>
          </Form.Group>

        

          <Button className='mt-3' type='submit' variant='primary'>Update</Button>    
     </Form>
        </Col>
        <Col md={7} lg={9}>
            <h1>My Orders</h1>
           {loadingMyOrders ? <Loader/> : (<Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {myOrders.map(order => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>${order.totalPrice}</td>
                    <td>{order.isPaid  ? order.paidAt.substring(0, 10) : (<i className='fas fa-times d-flex justify-content-center' style={{color: 'red'}}></i>)}</td>
                    <td >{order.isDelivered  ? order.deliveredAt.substring(0, 10) : (<i className='fas fa-times d-flex align-items-center justify-content-center' style={{color: 'red'}}></i>)}</td>
                    <td>
                      <Link to={`/orders/${order._id}`}>
                        <Button variant='light'>Details</Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>)}
        </Col>
    </Row>
    )
  )
}

export default observer(ProfileScreen);