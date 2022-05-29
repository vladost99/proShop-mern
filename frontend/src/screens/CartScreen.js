import React, {useEffect} from 'react'
import {  useParams, Link, useHistory } from 'react-router-dom';
import Message from 'components/Message';
import {Row, Col, ListGroup, Image, Form, Button, Card} from 'react-bootstrap';
//import cartStore from 'store/cart';
import { observer } from 'mobx-react-lite';
import useQuery from 'hooks/useQuery';
import useStore from 'hooks/useStore';


const CartScreen = () => {
  const  {cartStore} = useStore();
  const {id} = useParams();
  const query = useQuery();
  const navigate = useHistory();
  let qty = Number(query.get('qty'));

  useEffect(() => {
    if(id) {
        cartStore.addToCart(id, qty);
    }
  },[id, qty]);

  const {cartItems} = cartStore;

  const subTotalItems = React.useMemo(() => cartItems.reduce((acc, item) => acc + item.qty,0), [cartItems]);
  const subTotalPrice = React.useMemo(() => cartItems.reduce((acc, item) => acc + (item.qty * item.price),0).toFixed(2), [cartItems]);

  const removeFromCartHandler = (id) => {
      cartStore.removeItem(id);
  }
  const checkoutHandler = () => {
      navigate.push('/login?redirect=shipping');
  }

  return (
    <Row>
        <Col md={12} lg={8}>
            <h1>Shopping Cart</h1>
            {cartItems.length === 0 ? <Message>Your cart is empty <Link to='/'>Go Back</Link></Message> :
             (<ListGroup variant='flush'>
                 {cartItems.map(item => (
                     <ListGroup.Item key={item.product}>
                         <Row>
                             <Col xs={12} sm={2} md={2}>
                                 <Image src={item.image} alt={item.name} fluid rounded />
                             </Col>
                             <Col className='d-flex align-items-center' xs={12} sm={3} md={3}>
                                 <Link to={`/product/${item.product}`}>{item.name}</Link>
                             </Col>
                             <Col className='d-flex align-items-center' xs={4} sm={2} md={2}>${item.price}</Col>
                             <Col className='d-flex align-items-center' xs={5} sm={3} md={3}>
                                <Form.Control size='sm' as='select' value={item.qty} onChange={(e) => cartStore.addToCart(item.product, Number(e.target.value))} >
                                    { [...Array(item.countInStock).keys()].map(x => (
                                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                                    ))}
                                </Form.Control>
                             </Col>
                             <Col className='d-flex align-items-center' xs={3} sm={2} md={2}>
                                 <Button type='button' variant='light' onClick={() => removeFromCartHandler(item.product)}>
                                     <i className='fas fa-trash'></i>
                                 </Button>
                             </Col>
                         </Row>
                     </ListGroup.Item>
                 ))}
             </ListGroup>)
            }
        </Col>
        <Col md={12} lg={4}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Subtotal ({subTotalItems}) items</h2>
                        ${subTotalPrice}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Button 
                         type='button'
                         className='btn-block'
                         disabled={cartItems.length === 0}
                         onClick={() => checkoutHandler()}
                          >Proceed To Checkout</Button>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
    </Row>
  )
}

export default observer(CartScreen);