import useInput from 'hooks/useInput';
import React from 'react';
import FormContainer from 'components/FormContainer'
import { useHistory } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
//import  cartStore  from 'store/cart';
import CheckoutSteps from 'components/CheckoutSteps';
import useStore from 'hooks/useStore';


const ShippingScreen = () => {
  const {cartStore} = useStore();
  const {shippingAddress} = cartStore;  
  const history = useHistory();
  const address = useInput(shippingAddress.address  || '');
  const city = useInput( shippingAddress.city || '');
  const postalCode = useInput(shippingAddress.postalCode || '');
  const country = useInput(shippingAddress.country ||  ''); 

  const handleSubmit = (e) => {
      e.preventDefault();
      cartStore.saveShippingAddress({ address: address.value,city: city.value,postalCode: postalCode.value,country: country.value });
      history.push('/payment');
  }
  
  return (
   <FormContainer>
       <CheckoutSteps step1 step2  />
       <h1>Shipping</h1>
       <Form onSubmit={handleSubmit}>
       
          <Form.Group controlId='address'>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type='address'
                placeholder='Enter address'
                value={address.value}
                onChange={address.hanlder}
                required
              ></Form.Control>
          </Form.Group>

          <Form.Group controlId='city'>
              <Form.Label>City</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter City'
                value={city.value}
                onChange={city.hanlder}
                required
              ></Form.Control>
          </Form.Group>


          <Form.Group controlId='postalCode'>
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter postal code'
                value={postalCode.value}
                onChange={postalCode.hanlder}
                required
              ></Form.Control>
          </Form.Group>

          <Form.Group controlId='country'>
              <Form.Label>Country</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter country'
                value={country.value}
                onChange={country.hanlder}
                required
              ></Form.Control>
          </Form.Group>

        <Button className='mt-3' type='submit' variant='primary'>Continue</Button>
       </Form>  
   </FormContainer>
  )
}

export default observer(ShippingScreen);