import React from 'react';
import FormContainer from 'components/FormContainer'
import { useHistory } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import CheckoutSteps from 'components/CheckoutSteps';
import useStore from 'hooks/useStore';
import { useForm } from "react-hook-form";
import Message from 'components/Message';
import { useEffect } from 'react';

const ShippingScreen = () => {
  const {cartStore} = useStore();
  const {shippingAddress} = cartStore;  
  const history = useHistory();
  const {register, handleSubmit,reset, formState: {errors}} = useForm(); 

 
 useEffect(() => {
   reset({
     address:shippingAddress.address  || '',
     city: shippingAddress.city || '',
     country: shippingAddress.country ||  '',
     postalCode: shippingAddress.postalCode || ''
   })
 }, [])

  const submitHandler = data => {
      cartStore.saveShippingAddress({ address: data.address,city: data.city,postalCode: data.postalCode,country: data.country });
      history.push('/payment');
  }
  
  return (
   <FormContainer>
       <CheckoutSteps step1 step2  />
       <h1>Shipping</h1>
       <Form onSubmit={handleSubmit(submitHandler)}>
       
          <Form.Group controlId='address'>
             {errors.address && errors.address.type === 'required' && <Message variant='danger'>Address is required</Message>}
              <Form.Label>Address</Form.Label>
              <Form.Control
                type='address'
                placeholder='Enter address'
                {...register('address', {required: true})}
              ></Form.Control>
          </Form.Group>

          <Form.Group controlId='city'>
          {errors.city && errors.city.type === 'required' && <Message variant='danger'>City is required</Message>}
              <Form.Label>City</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter City'
                {...register('city', {required: true})}
              ></Form.Control>
          </Form.Group>


          <Form.Group controlId='postalCode'>
          {errors.postalCode && errors.postalCode.type === 'pattern' && <Message variant='danger'>Postal code should have only numbers</Message>}
          {errors.postalCode && errors.postalCode.type === 'required' && <Message variant='danger'>Postal code is required</Message>}
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter postal code'
                {...register('postalCode', {required: true, pattern: /^\d+$/})}
              ></Form.Control>
          </Form.Group>

          <Form.Group controlId='country'>
          {errors.country && errors.country.type === 'required' && <Message variant='danger'>Country is required</Message>}
              <Form.Label>Country</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter country'
                {...register('country', {required: true})}
              ></Form.Control>
          </Form.Group>

        <Button className='mt-3' type='submit' variant='primary'>Continue</Button>
       </Form>  
   </FormContainer>
  )
}

export default observer(ShippingScreen);