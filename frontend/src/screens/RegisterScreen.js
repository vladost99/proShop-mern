import useInput from 'hooks/useInput'
import { observer } from 'mobx-react-lite'
import React, {useEffect} from 'react'
import FormContainer from 'components/FormContainer'
import Message from 'components/Message'
import Loader from 'components/Loader'
import {Row, Col, Form, Button} from 'react-bootstrap'
import { Link, useHistory, useLocation } from 'react-router-dom'
import useStore from 'hooks/useStore'

const RegisterScreen = () => {
  const {userStore} = useStore();


   const history = useHistory();
   const location = useLocation(); 

   const email = useInput('');
   const password = useInput('');
   const comfirmPassword = useInput('');
   const name = useInput('');
   const message = useInput(null);

   const {userInfo, error, loading} = userStore;

    const redirect = location.search ? location.search.split('=')[1] : '/';

    const submitHandler = (e) => {
        e.preventDefault();

        if(password.value !== comfirmPassword.value) {
            message.setValue('Passwords do not match');
        }
        else {
            userStore.register({email: email.value, password: password.value, name: name.value})
        }
    }

    useEffect(() => {
        if(userInfo) {
            history.push(redirect);
        }
    }, [history, userInfo, redirect]);

  return (
    <FormContainer>
    <h1>Sign In</h1>
    {error && <Message variant='danger'>{error}</Message>}
    {message.value && <Message variant='danger'>{message.value}</Message>}
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