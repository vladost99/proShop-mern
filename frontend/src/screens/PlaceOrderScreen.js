import React, { useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card} from 'react-bootstrap'
//import FormContainer from 'components/FormContainer'
import CheckoutSteps from 'components/CheckoutSteps'
import Message from 'components/Message'
//import cartStore from 'store/cart'
//import ordersStore from 'store/orders'
import { observer } from 'mobx-react-lite'
import { Link, useHistory } from 'react-router-dom'

import { addDecimals } from 'utils/commonFunctions'
import useStore from 'hooks/useStore'
import { toJS } from 'mobx'

const PlaceOrderScreen = () => {
 const {cartStore, ordersStore} = useStore();

 const {shippingAddress, paymentMethod, cartItems} = cartStore;
 const {order, success, error} = ordersStore;
 const history = useHistory();
  


    

  const itemsPrice = addDecimals(cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));
  const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 100);
  const taxPrice = addDecimals(Number((0.15 * itemsPrice).toFixed(2)));
  const totalPrice = (Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)).toFixed(2);

  
  useEffect(() => {
    if(success) {
        history.push(`/orders/${order._id}`);
    }
  }, [success, history])
 

  const placeOrderHandler = () => {
        ordersStore.createOrder({
            orderItems: toJS(cartItems),
            shippingAddress: toJS(shippingAddress),
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        })
  }  


  return (
   <>
     <CheckoutSteps step1 step2 step3 step4 />
     <Row>
         <Col md={7}>
             <ListGroup variant='flush'>
                 <ListGroup.Item>
                     <h2>Shipping</h2>
                     <p>
                         <strong>Address: </strong>
                         {shippingAddress.address}, {shippingAddress.city} {shippingAddress.postalCode}, {shippingAddress.country}
                     </p>
                 </ListGroup.Item>
                 <ListGroup.Item>
                     <h2>Payment Method</h2>
                     <strong>Method: </strong>
                     {paymentMethod}
                 </ListGroup.Item>

                 <ListGroup.Item>
                     <h2>Order Items</h2>
                     {cartItems.length === 0 ? <Message>Your cart is empty</Message> : (
                         <ListGroup variant='flush'>
                             {cartItems.map((item, index) => (
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
         <Col md={5}>
             <Card>
                 <ListGroup variant='flush'>
                     <ListGroup.Item>
                         <h3 className='d-flex justify-content-center'>Order Summary</h3>
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
                             <Col>${shippingPrice}</Col>
                         </Row>
                     </ListGroup.Item>
                     <ListGroup.Item>
                         <Row>
                             <Col>Tax</Col>
                             <Col>${taxPrice}</Col>
                         </Row>
                     </ListGroup.Item>
                     <ListGroup.Item>
                         <Row>
                             <Col>Total</Col>
                             <Col>${totalPrice}</Col>
                         </Row>
                     </ListGroup.Item>
                     <ListGroup.Item>
                         {error && <Message variant='danger'>{error}</Message>}
                     </ListGroup.Item>
                     <ListGroup.Item>
                         <Button 
                           type='button'
                           className='btn-block'
                           disabled={cartItems.length === 0}
                           onClick={placeOrderHandler}
                          >Place Order</Button>
                     </ListGroup.Item>
                 </ListGroup>
             </Card>
         </Col>
     </Row>
   </>
  )
}

export default observer(PlaceOrderScreen);