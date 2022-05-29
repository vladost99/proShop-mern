import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite';
import useStore from 'hooks/useStore';
import useInput from 'hooks/useInput';
import { Link, useHistory, useParams } from 'react-router-dom';
import FormContainer from 'components/FormContainer';
import Loader from 'components/Loader';
import Message from 'components/Message';
import { Form, Button } from 'react-bootstrap';

const UserEditScreen = () => {
  const {userStore}  = useStore();
  const {loading, error, selectedUser, userInfo} = userStore;
  const {id} = useParams();
  const history = useHistory();
  const name = useInput('');
  const email = useInput('');
  const isAdmin = useInput(false);

  useEffect(() => {
     if(selectedUser) {
         name.setValue(selectedUser.name);
         email.setValue(selectedUser.email);
         isAdmin.setValue(selectedUser.isAdmin);
     }
  }, [selectedUser]);

  useEffect(() => {
    if(id === userInfo._id) {
        history.push('/profile');
     }

     if(id !== userInfo._id) {
         userStore.getUserById(id);
     }
  }, [])

  const submitHandler = (e) => {
      e.preventDefault();
      userStore.updateUser(id, {
          email: email.value,
          name:  name.value,
          isAdmin: isAdmin.value
      }).then(() => history.push('/admin/userlist'));
  }

  return (
    <FormContainer>
        <Link to={`/admin/userlist`} className='btn btn-light my-3'>Go Back</Link>
        <h1>Edit User</h1>
        {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> :
         (
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
    
                    <Form.Group controlId='isAdmin'>

                        <Form.Check 
                            type='checkbox'
                            label='Is Admin'
                            checked={isAdmin.value}
                            onChange={isAdmin.hanlderCheck}
                        ></Form.Check>
                    </Form.Group>
    
    
            <Button className='mt-3' type='submit' variant='primary'>Update</Button>    
        </Form>
         )
        }
      
    </FormContainer>
  )
}

export default observer(UserEditScreen);