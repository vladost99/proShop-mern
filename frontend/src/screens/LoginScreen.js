import React, {useEffect} from 'react'
import {Link, useHistory, useLocation} from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import Loader from 'components/Loader'
import Message from 'components/Message'
import FormContainer from 'components/FormContainer'

import { observer } from 'mobx-react-lite'
import useInput from 'hooks/useInput'
import useStore from 'hooks/useStore'

const LoginScreen = () => {
    const {userStore} = useStore();
    const email = useInput('');
    const password = useInput('');
    const location = useLocation();
    const history = useHistory();

    const {userInfo, error, loading} = userStore;

    const redirect = location.search ? location.search.split('=')[1] : '/';

    const submitHandler = (e) => {
        e.preventDefault();

        userStore.login({email: email.value, password: password.value});
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
        {loading && <Loader/>}
         <Form onSubmit={submitHandler}>
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