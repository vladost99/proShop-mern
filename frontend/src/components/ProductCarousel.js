import React, {useEffect} from 'react'
import { observer } from 'mobx-react-lite';
import useStore from 'hooks/useStore';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import Loader from './Loader';
import Message from './Message';

const ProductCarousel = () => {
  const {productsStore} = useStore();
  
  const {loadingProductsTop, productsTop, errorProductsTop: error} = productsStore;


  useEffect(() => {
    productsStore.getProductsTop();
  }, []);

  return loadingProductsTop ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
      <Carousel pause='hover' className='bg-dark'>
          {productsTop.map(product => (
              <Carousel.Item key={product._id}>
                  <Link to={`/product/${product._id}`}>
                      <Image src={product.image} alt={product.name} fluid />
                      <Carousel.Caption className='carousel-caption'>
                          <h2>{product.name} (${product.price})</h2>
                      </Carousel.Caption>
                  </Link>
              </Carousel.Item>
          ))}
      </Carousel>
  )
}

export default observer(ProductCarousel);