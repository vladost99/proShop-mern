import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite';
import useStore from 'hooks/useStore';
import Message from 'components/Message';
import Loader from 'components/Loader';
import { Table, Button } from 'react-bootstrap';
import { Link as LinkContainer } from 'react-router-dom';

const OrderListScreen = () => {
    const {ordersStore} = useStore();
    const {loading, error, myOrders: orders,} = ordersStore;


    useEffect(() => {
        ordersStore.getAllOrders();
    }, [])

  return (
    <>
    <h1>Orders</h1>
    {/* {message && <Message>{message}</Message>} */}
    {loading ? (
      <Loader />
    ) : error ? (
      <Message variant='danger'>{error}</Message>
    ) : (
      <Table striped bordered hover responsive className='table-sm'>
        <thead>
          <tr>
            <th>ID</th>
            <th>USER</th>
            <th>DATE</th>
            <th>TOTAL</th>
            <th>PAID</th>
            <th>DELIVERED</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.user?.name}</td>
              <td>{order.createdAt.substring(0, 10)}</td>
              <td>{order.totalPrice}</td>
              <td>
                {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                ) : (
                  <i className='fas fa-times d-flex justify-content-center' style={{ color: 'red' }}></i>
                )}
              </td>

              <td>
                {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                ) : (
                  <i className='fas fa-times d-flex justify-content-center' style={{ color: 'red' }}></i>
                )}
              </td>
              <td className='d-flex justify-content-center'>
                <LinkContainer to={`/admin/order/${order._id}/edit`}>
                  <Button variant='light' className='btn-sm'>
                     Details
                  </Button>
                </LinkContainer>
               
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    )}
  </>
  )
}

export default observer(OrderListScreen);