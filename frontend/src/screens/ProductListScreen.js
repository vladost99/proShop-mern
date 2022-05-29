import React, {useEffect} from 'react'
import {observer} from 'mobx-react-lite';
import useStore from 'hooks/useStore';
import {Col, Row, Button, Table} from 'react-bootstrap';
import Loader from 'components/Loader';
import Message from 'components/Message';
import {Link as LinkContainer, useHistory, useParams} from 'react-router-dom';
import Paginate from 'components/Paginate';

const ProductListScreen = () => {
    const {productsStore} = useStore();
    const {loading, error, products} = productsStore;
    const {pageNumber} = useParams();

   

     const createProductHandler = async () => {
       await productsStore.createProduct();
     }

     const deleteHandler = (id) => {
      if(window.confirm('Are you sure?')) { 
         productsStore.delete(id);
      }
      console.log('remove product id', id);
 }
   
   
     useEffect(() => {
       productsStore.getProducts('', pageNumber);
     }, [pageNumber]);



  return (
    <>
    <Row className='align-items-center'>
        <Col>
            <h1>Products</h1>
        </Col>
        <Col className='justify-content-end d-flex'>
            <Button className='my-3' onClick={createProductHandler}>
              <i className='fas fa-plus'></i>  Create Product
            </Button>
        </Col>
    </Row>
    {loading ? (
      <Loader />
    ) : error ? (
      <Message variant='danger'>{error}</Message>
    ) : (
     <>
       <Table striped bordered hover responsive className='table-sm'>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>Category</th>
            <th>BRAND</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>
                ${product.price}
              </td>
               <td>{product.category}</td>
               <td>{product.brand}</td>
              <td className='d-flex justify-content-center'>
                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                  <Button variant='primary' className='btn-sm'>
                    <i className='fas fa-edit'></i>
                  </Button>
                </LinkContainer>
                
                <Button
                  type='button'
                  variant='danger'
                  className='btn-sm'
                  onClick={() => deleteHandler(product._id)}
                >
                  <i className='fas fa-trash'></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className='d-flex justify-content-center'>
            <Paginate page={pageNumber} pages={productsStore.pages} products={products} isAdmin={true} />
      </div>
     </>
    )}
  </>
  )
}

export default observer(ProductListScreen)