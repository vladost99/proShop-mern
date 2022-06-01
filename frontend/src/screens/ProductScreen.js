import React, {useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {Row, Col, Image, ListGroup, Card, Button, Form} from 'react-bootstrap'
import Rating from 'components/Rating'

import { useParams, useHistory } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import Loader from 'components/Loader'
import Message from 'components/Message'
import useStore from 'hooks/useStore'
import Meta from 'components/Meta';
import NotFound from 'components/NotFound';
import { useForm } from "react-hook-form";

const ProductScreen = () => {

  const {productsStore: productStore, reviewsStore, userStore} = useStore(); 

  const {id} = useParams();
  const navigate = useHistory()
  const [qty, setQty] = useState(0);

  const {register,reset, handleSubmit, formState: {errors}} = useForm(); 
 
  

  useEffect(() => {
        productStore.getDetailProduct(id);    
  }, []);

  const addToCartHandler = () => {
     let count =  +qty + 1;
    navigate.push(`/cart/${id}?qty=${count}`);
  }

  const {detailProduct: product, loading, error} = productStore;
  const {errorRev, success} = reviewsStore;
  const {userInfo} = userStore;


  const submitHandler = data => {
      reviewsStore.createProductReview({
           rating: Number(data.rating),
           comment: data.comment,
          _id: id
      })
  }

  useEffect(() => {
    if(success) {
      alert('Review Submitted');
      reset({rating: 1, comment: ''})
      productStore.getDetailProduct(id);
    }
  }, [success])

  if(!product) return <NotFound/>

  return (
   <>
     <Meta title={product.name} />
      <Link className='btn btn-light my-3' to='/'>Go Back</Link>
      {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
        <>  
        <Row>
           <Col md={12} lg={5}>
              <Image src={product.image} alt={product.name} fluid />
           </Col>
           <Col md={10} lg={4}>
              <ListGroup variant='flush'>
                  <ListGroup.Item>
                      <h3>{product.name}</h3>
                  </ListGroup.Item>
  
                  <ListGroup.Item>
                      <Rating value={product.rating && product.rating || 0} text={`${product.numReviews} reviews`}/>
                  </ListGroup.Item>
  
                  <ListGroup.Item>
                      Price: ${product.price}
                  </ListGroup.Item>
  
                  <ListGroup.Item>
                      Description: ${product.description}
                  </ListGroup.Item>
              </ListGroup>
           </Col>
           <Col md={10} lg={3}>
               <Card>
                   <ListGroup variant='flush'>
                       <ListGroup.Item>
                           <Row>
                               <Col>
                                  Price:
                               </Col>
                               <Col>
                                  <strong>${product.price}</strong>
                               </Col>
                           </Row>
                       </ListGroup.Item>
  
                       <ListGroup.Item>
                           <Row>
                               <Col>
                                  Status:
                               </Col>
                               <Col>
                                 {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                               </Col>
                           </Row>
                       </ListGroup.Item>

                       {product.countInStock > 0 && (
                           <ListGroup.Item>
                               <Row>
                                   <Col>Qty</Col>
                                   <Col md={3} sm={3} xs={6} lg={6}>
                                        <Form.Control  size='sm' as='select' value={qty} onChange={(e) => setQty(e.target.value)} >
                                           { [...Array(product.countInStock).keys()].map(x => (
                                                <option key={x + 1} value={x}>{x + 1}</option>
                                            ))}
                                        </Form.Control>
                                   </Col>
                               </Row>
                           </ListGroup.Item>
                       )}
                       
                       <ListGroup.Item>
                          <Button onClick={() => addToCartHandler()} className='btn-block' type='button' disabled={product.countInStock === 0}>
                              Add To Cart
                          </Button>
                       </ListGroup.Item>
                   </ListGroup>
               </Card>
           </Col>
        </Row>
        <Row>
            <Col md={6}>
                 <h2>Reviews</h2>
                 {product.reviews.length === 0 && <Message>No reviews</Message>}
                 <ListGroup variant='flush'>
                      {product.reviews.map(review => (

                          <ListGroup.Item key={review._id}>
                              <strong>{review.name}</strong>
                              <Rating value={review.rating} />
                              <p>{review.createdAt.substring(0, 10)}</p>
                              <p>{review.comment}</p>
                          </ListGroup.Item>

                      ))}  
                      <ListGroup.Item>
                              <h2>Write a Customer Review</h2>
                              {errorRev && <Message variant='danger'>{errorRev}</Message>}
                              {userInfo ? (
                              <Form onSubmit={handleSubmit(submitHandler)}>
                                  <Form.Group controlId='rating'>
                                      {errors.rating && errors.rating.type === 'required' && <Message variant='danger'>Rating is required</Message>}
                                      {errors.rating && errors.rating.type === 'min' && <Message variant='danger'>The rating must be at least 1</Message>}
                                      <Form.Label>Rating</Form.Label>
                                      <Form.Control as='select' {...register('rating', {required: true, min: 1})}>
                                          <option value=''>Select...</option>
                                          <option value='1'>1 - Poor</option>
                                          <option value='2'>2 - Fair</option>
                                          <option value='3'>3 - Good</option>
                                          <option value='4'>4 - Very Good</option>
                                          <option value='5'>5 - Excellent</option>
                                      </Form.Control>
                                  </Form.Group>
                                  <Form.Group className='mt-3' controlId='comment'>
                                      {errors.comment && errors.comment.type === 'required' && <Message variant='danger'>Comment is required</Message>}
                                      <Form.Label>Comment</Form.Label>
                                      <Form.Control row='3'{...register('comment', {required: true})} as='textarea'></Form.Control> 
                                  </Form.Group>
                                  <Button  className='mt-3' type='submit' variant='primary'>Submit</Button>
                              </Form>
                              )
                               : <Message>Please <Link to='/login'>sign in</Link> to write a review</Message>}
                          </ListGroup.Item>                    
                 </ListGroup>                          
            </Col>
        </Row>
        </>  
      )}
     
   </>
  )
}

export default observer(ProductScreen);