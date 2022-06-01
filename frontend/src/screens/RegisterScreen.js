import useInput from 'hooks/useInput'
import { observer } from 'mobx-react-lite'
import React, {useEffect} from 'react'
import FormContainer from 'components/FormContainer'
import Message from 'components/Message'
import Loader from 'components/Loader'
import {Row, Col, Form, Button} from 'react-bootstrap'
import { Link, useHistory, useLocation } from 'react-router-dom'
import useStore from 'hooks/useStore'
import { useForm } from "react-hook-form";

const RegisterScreen = () => {
  const {userStore} = useStore();


   const history = useHistory();
   const location = useLocation(); 
   const {register, handleSubmit,getValues, formState: {errors}} = useForm(); 

   const {userInfo, error, loading} = userStore;

    const redirect = location.search ? location.search.split('=')[1] : '/';

    const submitHandler = (data) => {
        userStore.register({email: data.email, password: data.password, name: data.name});
    }

    useEffect(() => {
        if(userInfo) {
            history.push(redirect);
        }
    }, [history, userInfo, redirect]);

  return (
    <FormContainer>
    <h1>Register</h1>
    {error && <Message variant='danger'>{error}</Message>}
    {/* {message.value && <Message variant='danger'>{message.value}</Message>} */}
    {loading && <Loader/>}
     <Form onSubmit={handleSubmit(submitHandler)}>

     <Form.Group controlId='name'>
       {errors.name && errors.name.type === 'required' && <Message variant='danger' >Name is required</Message>}
             <Form.Label>Name</Form.Label>
             <Form.Control 
               type='text'
               placeholder='Enter name'
               {...register('name', { required: true })}
               ></Form.Control>
     </Form.Group>

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

          <Form.Group controlId='confirmPassword'>
          {errors.comfirmPassword && errors.comfirmPassword.type === 'required' && <Message variant='danger' >Comfirm Password is required</Message>}
          {errors.comfirmPassword && errors.comfirmPassword.type === 'validate' && <Message variant='danger' >Confirmed password does not match</Message>}
             <Form.Label>Comfirm Password</Form.Label>
             <Form.Control 
               type='password'
               placeholder='Enter confirm password'
               {...register('comfirmPassword', { required: true, validate: (value) => value === getValues('password') })}
               ></Form.Control>
          </Form.Group>

          <Button className='mt-3' type='submit' variant='primary'>Register</Button>    
     </Form>
     <Row className='py-3'>
           <Col>
            Have an Account ? <Link to={redirect ? `/login?redirect=${redirect}` : '/Login'}>Login</Link>
           </Col> 
     </Row>
</FormContainer>
  )
}

export default observer(RegisterScreen);