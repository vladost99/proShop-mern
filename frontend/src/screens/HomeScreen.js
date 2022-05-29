import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap';
import Product from 'components/Product';
import Loader from 'components/Loader';
import Message from 'components/Message';
import {Helmet} from 'react-helmet';

import { observer } from 'mobx-react-lite';
import useStore from 'hooks/useStore';
import { Link, useHistory, useParams } from 'react-router-dom';
import Paginate from 'components/Paginate';
import ProductCarousel from 'components/ProductCarousel';
import Meta from 'components/Meta';


const HomeScreen = () => {
  const {productsStore} = useStore();
  const {keyword, pageNumber} = useParams();
  const history = useHistory();

  useEffect(() => {
    if(pageNumber > 1 && productsStore.products.length === 0) {
        history.push('/');
    }
  }, [pageNumber]);

  useEffect(() => {
    productsStore.getProducts(keyword, pageNumber);
  }, [keyword, pageNumber])

  const {products, error, loading} = productsStore;

  return (
    <>
        <Meta/>
        {!keyword  ? (<ProductCarousel/>) : (<Link to='/' className='btn btn-light'>Go Back</Link>) }
        <h1>Latest Products</h1>
        {loading ? (
          <Loader/>
        ) : error ? (
            <Message variant='danger'>{error}</Message>
        ) : (
          <>
            <Row>
          {products.map(product => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                 <Product product={product} />
              </Col>
          ))}
        </Row>
         <div className='d-flex justify-content-center'>
            <Paginate products={products} pages={productsStore.pages} page={productsStore.page} keyword={keyword ? keyword : ''} />
         </div>
          </>
        )}
       
    </>
  )
}

export default observer(HomeScreen);