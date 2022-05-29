import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite';
import useStore from 'hooks/useStore';
import useInput from 'hooks/useInput';
import { Link, useHistory, useParams } from 'react-router-dom';
import FormContainer from 'components/FormContainer';
import Loader from 'components/Loader';
import Message from 'components/Message';
import { Form, Button } from 'react-bootstrap';
import { compressImage } from 'utils/fileCompress';


const ProductEditScreen = () => {
  const {productsStore} = useStore(); 
  const {detailProduct, loading, error} = productsStore;
  const {id: productId} = useParams();
  const history = useHistory();
  
  const name = useInput('');
  const price = useInput(0);
  const image = useInput('');
  const brand = useInput('');
  const category = useInput('');
  const countInStock = useInput(0);
  const numReviews = useInput(0);
  const description = useInput('');

  useEffect(() => {
     productsStore.getDetailProduct(productId);
  }, [productId])

  useEffect(() => {
    if(detailProduct) {
        name.setValue(detailProduct.name);
        price.setValue(detailProduct.price);
        image.setValue(detailProduct.image);
        brand.setValue(detailProduct.brand);
        category.setValue(detailProduct.category);
        countInStock.setValue(detailProduct.countInStock);
        numReviews.setValue(detailProduct.numReviews);
        description.setValue(detailProduct.description);
    }
  }, [detailProduct]);


  const submitHandler = async (e) => {
      e.preventDefault();
     await productsStore.updateProduct(productId, {
          name: name.value,
          price: price.value,
          image: image.value || '/image/sample.jpg',
          brand: brand.value,
          category: category.value, 
          countInStock: countInStock.value,
          numReviews: numReviews.value,
          description: description.value
      });
      history.push('/admin/productlist');
  }

  const onChangeImage = async (e) => {
          let file = e.target.files[0];
          const reader = new FileReader();
          const resizeImage = await compressImage(file);      
          //image.setValue(resizeImage);
          reader.onload = () => {
                if(reader.readyState === 2) {
                        image.setValue(reader.result);
                }
          }

          reader.readAsDataURL(resizeImage);
  }
  
  return (
    <FormContainer>
        <Link to={`/admin/productlist`} className='btn btn-light my-3'>Go Back</Link>
        <h1>Edit Product</h1>
        {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> :
         (
            <Form onSubmit={submitHandler}>
    
                <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control 
                        type='text'
                        placeholder='Enter name'
                        value={name.value}
                        onChange={name.hanlder}
                        ></Form.Control>
                </Form.Group>

                <Form.Group controlId='price'>
                        <Form.Label>Price</Form.Label>
                        <Form.Control 
                        type='number'
                        placeholder='Enter price'
                        value={price.value}
                        onChange={price.hanlder}
                        ></Form.Control>
                </Form.Group>


               
                <Form.Group controlId="image">
                        <Form.Label>Image Upload</Form.Label>
                        <Form.Control type="file" 
                            onChange={onChangeImage}
                            accept='image/*'   
                        />
                </Form.Group>


                <Form.Group controlId='brand'>
                        <Form.Label>Brand</Form.Label>
                        <Form.Control 
                        type='text'
                        placeholder='Enter brand'
                        value={brand.value}
                        onChange={brand.hanlder}
                        ></Form.Control>
                </Form.Group>


                <Form.Group controlId='countInStock'>
                        <Form.Label>Count in Stock</Form.Label>
                        <Form.Control 
                        type='number'
                        placeholder='Enter count'
                        value={countInStock.value}
                        onChange={countInStock.hanlder}
                        ></Form.Control>
                </Form.Group>


                <Form.Group controlId='cateogry'>
                        <Form.Label>Category</Form.Label>
                        <Form.Control 
                        type='text'
                        placeholder='Enter category'
                        value={category.value}
                        onChange={category.hanlder}
                        ></Form.Control>
                </Form.Group>

    
            
    
            <Button disabled={image.value === '' || image.value === '/image/sample.jpg'} className='mt-3' type='submit' variant='primary'>Update</Button>    
        </Form>
         )
        }
      
    </FormContainer>
  )
}

export default observer(ProductEditScreen)