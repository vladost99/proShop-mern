import useInput from 'hooks/useInput';
import React from 'react';
import FormContainer from 'components/FormContainer'
import { useHistory } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
//import  cartStore  from 'store/cart';
import CheckoutSteps from 'components/CheckoutSteps';
import {Col} from 'react-bootstrap';
import useStore from 'hooks/useStore';


const PaymentScreen = () => {
  const {cartStore} = useStore();
  const {shippingAddress, paymentMethod: cartPaymentMethod} = cartStore;  
  const history = useHistory();
  const paymentMethod = useInput(cartPaymentMethod || 'PayPal');
  

  if(Object.keys(shippingAddress).length === 0) {
      history.push('/shipping');
  }

  const handleSubmit = (e) => {
      e.preventDefault();
      cartStore.savePaymentMethod(paymentMethod.value);
      history.push('/placeorder');
  }
  
  return (
   <FormContainer>
       <CheckoutSteps step1 step2 step3  />
       <h1>Payment</h1>
       <Form onSubmit={handleSubmit}>
       
          <Form.Group>
              <Form.Label as='legend'>Select Method</Form.Label>
          </Form.Group>

          <Col>
             <Form.Check 
              type='radio'
              label='PayPal or Credit Card'
              id='PayPal'
              name='paymentMehod'
              value='PayPal'
              checked
              onChange={paymentMethod.hanlder}
              ></Form.Check>

            <Form.Check 
              type='radio'
              label='Stripe'
              id='Stripe'
              name='paymentMehod'
              value='Stripe'             
              onChange={paymentMethod.hanlder}
              disabled
              ></Form.Check>
          </Col>

        <Button className='mt-3' type='submit' variant='primary'>Continue</Button>
       </Form>  
   </FormContainer>
  )
}

export default observer(PaymentScreen);