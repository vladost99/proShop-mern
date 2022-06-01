import React, {useEffect} from 'react'
import {Link, useHistory, useLocation} from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import Loader from 'components/Loader'
import Message from 'components/Message'
import FormContainer from 'components/FormContainer'

import { observer } from 'mobx-react-lite'
import useStore from 'hooks/useStore'
import { useForm } from "react-hook-form";

const LoginScreen = () => {
    const {userStore} = useStore();
    const {register, handleSubmit, formState: {errors}} = useForm(); 
    const location = useLocation();
    const history = useHistory();

    const {userInfo, error, loading} = userStore;

    const redirect = location.search ? location.search.split('=')[1] : '/';

    const submitHandler = (data) => userStore.login({email: data.email, password: data.password})

    useEffect(() => {
        if(userInfo) {
            history.push(redirect);
        }
    }, [history, userInfo, redirect]);

  return (
    <FormContainer>
        <h1>Sign In</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader/>}
         <Form onSubmit={handleSubmit(submitHandler)}>
              <Form.Group controlId='email'>
                {errors.email && errors.email.type === 'required' && <Message variant='danger' >Email is required</Message>}
                {errors.email && errors.email.type === 'pattern' && <Message variant='danger' >Email invalid</Message>}
                 <Form.Label>Email Address</Form.Label>
                 <Form.Control 
                   type='email'
                   placeholder='Enter email'
                   {...register('email', { required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g })}
                   ></Form.Control>
              </Form.Group>

              <Form.Group controlId='password'>
              {errors.password && errors.password.type === 'required' && <Message variant='danger' >Password is required</Message>}
                 <Form.Label>Password</Form.Label>
                 <Form.Control 
                   type='password'
                   placeholder='Enter password'
                   {...register('password', { required: true })}
                   ></Form.Control>
              </Form.Group>

              <Button className='mt-3' type='submit' variant='primary'>Sign In</Button>    
         </Form>
         <Row className='py-3'>
               <Col>
               New Customer ? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
               </Col> 
         </Row>
    </FormContainer>
  )
}

export default observer(LoginScreen);