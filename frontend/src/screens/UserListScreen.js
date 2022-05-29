import React, { useEffect } from 'react'
import { Link as LinkContainer } from 'react-router-dom'
import {Form, Button, Row, Col, Table} from 'react-bootstrap'
import useStore from 'hooks/useStore'
import Message from 'components/Message'
import Loader from 'components/Loader'
import { observer } from 'mobx-react-lite'

const UserListScreen = () => {
  const {userStore} = useStore();
  const {userList, loading, error, message} = userStore;

  const deleteHandler = (id) => {
     if(window.confirm('Are you sure?')) {
        userStore.deleteUser(id);
     }
  }


  useEffect(() => {
     userStore.getUserList();
  }, []);

  

return (
    <>
      <h1>Users</h1>
      {message && <Message>{message}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className='fas fa-check d-flex justify-content-center' style={{ color: 'green' }}></i>
                  ) : (
                    <i className='fas fa-times d-flex justify-content-center' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td className='d-flex justify-content-center'>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant='primary' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
)
}

export default observer(UserListScreen)