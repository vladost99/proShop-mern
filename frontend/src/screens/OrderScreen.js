import React, { useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card} from 'react-bootstrap'
import {PayPalButton} from 'react-paypal-button-v2';
import Message from 'components/Message'
import Loader from 'components/Loader'
import { observer } from 'mobx-react-lite'
import { Link, useParams } from 'react-router-dom'
import useStore from 'hooks/useStore'
import { addDecimals } from 'utils/commonFunctions'
import useInput from 'hooks/useInput'
import createPayPalScript from 'utils/createPayPalScript';



const OrderScreen = () => {
const {ordersStore, paymentStore, userStore} = useStore();
const {order, loading, error, successDelivered, loadingDelivered} = ordersStore;
const {loadingPay, successPay} = paymentStore;
const {userInfo} = userStore;
const {id: orderId} = useParams();

const sdkReady = useInput(false);
  
let itemsPrice = 0;

 if(!loading && order?._id) {
     itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0));
 }

const successPaymentHandler = (paymentResult) => {
    paymentStore.orderPay(orderId, paymentResult);
}

const deliveredHandler = () => { ordersStore.orderDeliveredUpdate(order)}
  
  useEffect(() => {
     const addPayPalScript = async () => {
        await createPayPalScript(() => sdkReady.setValue(true));
     }


        if(!successPay || successDelivered) {
            //ordersStore.getOrderDetails(orderId);
            ordersStore.changeUpdateDelivered(false);
        } else if(!order.isPaid) {
            if(!window.paypal) {
                addPayPalScript();
            } else {
                sdkReady.setValue(true);
            }
        }

  }, [successPay, order, successDelivered]);
 
useEffect(() => {
    ordersStore.getOrderDetails(orderId);
}, [orderId]);




return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
       <h1>Order {order?._id}</h1>
       {order?._id &&   <Row>
         <Col  md={12} sm={12} lg={7}>
             <ListGroup variant='flush'>
                 <ListGroup.Item>
                     <h2>Shipping</h2>
                     <p><strong>Name:</strong> {order.user.name}</p>
                     <p><strong>Email:</strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                     <p>
                         <strong>Address: </strong>
                         {order?.shippingAddress?.address}, {order?.shippingAddress?.city} {order?.shippingAddress?.postalCode}, {order?.shippingAddress?.country}
                     </p>
                     {order.isDelivered ? <Message variant='success'>Delivered on {order.deliveredAt}</Message> : <Message variant='danger'>Not Delivered</Message>}
                 </ListGroup.Item>
                 <ListGroup.Item>
                     <h2>Payment Method</h2>
                     <p>
                        <strong>Method: </strong>
                        {order.paymentMethod}
                     </p>
                     {order.isPaid ? <Message variant='success'>Paid on {order.paidAt}</Message> : <Message variant='danger'>Not Paid</Message>}
                 </ListGroup.Item>

                 <ListGroup.Item>
                     <h2>Order Items</h2>
                     {order?.orderItems?.length === 0 ? <Message>Your cart is empty</Message> : (
                         <ListGroup variant='flush'>
                             {order?.orderItems && order.orderItems.map((item, index) => (
                                 <ListGroup.Item key={index}>
                                     <Row>
                                         <Col md={1}>
                                             <Image src={item.image} alt={item.name} fluid rounded />
                                         </Col>
                                         <Col>
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                         </Col>
                                         <Col md={4}>
                                             {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                         </Col>
                                     </Row>
                                 </ListGroup.Item>
                             ))}
                         </ListGroup>
                     )}
                 </ListGroup.Item>
             </ListGroup>
         </Col>
         <Col md={12} sm={12} lg={5}>
             <Card style={{overflow: "hidden"}}>
                 <ListGroup variant='flush'>
                     <ListGroup.Item>
                         <h2>Order Summary</h2>
                     </ListGroup.Item>
                     <ListGroup.Item>
                         <Row>
                             <Col>Items</Col>
                             <Col>${itemsPrice}</Col>
                         </Row>
                     </ListGroup.Item>
                     <ListGroup.Item>
                         <Row>
                             <Col>Shipping</Col>
                             <Col>${order.shippingPrice}</Col>
                         </Row>
                     </ListGroup.Item>
                     <ListGroup.Item>
                         <Row>
                             <Col>Tax</Col>
                             <Col>${order.taxPrice}</Col>
                         </Row>
                     </ListGroup.Item>
                     <ListGroup.Item>
                         <Row>
                             <Col>Total</Col>
                             <Col>${order.totalPrice}</Col>
                         </Row>
                     </ListGroup.Item>
                     {!order.isPaid && (
                         <ListGroup.Item>
                             {loadingPay && <Loader/>}
                             {!sdkReady ? <Loader/> : (
                                 <PayPalButton
                                    amount={order.totalPrice}
                                    onSuccess={successPaymentHandler}
                                 />
                             )}
                         </ListGroup.Item>
                     )}
                     {loadingDelivered && <Loader />}
                     {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                         <ListGroup.Item>
                             <Button type='button' onClick={deliveredHandler} className='btn btn-block'>
                                Mark As Delivered
                             </Button>
                         </ListGroup.Item>
                     )}
                 </ListGroup>
             </Card>
         </Col>
     </Row> }
    </>
  )
}

export default observer(OrderScreen);