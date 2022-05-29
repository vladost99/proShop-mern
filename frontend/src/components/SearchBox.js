import useInput from 'hooks/useInput'
import React from 'react'
import {Form, Button} from 'react-bootstrap'
import { useHistory } from 'react-router-dom';


const SearchBox = () => {
  const keyword = useInput('');  
  const history = useHistory();  

  const submitHandler = e => {
      e.preventDefault();
      
      if(keyword.value.trim()) {
        history.push(`/search/${keyword.value}`);
      } else {
          history.push(`/`);
      }
  }  

  return (
    <Form className='d-flex' onSubmit={submitHandler}>
        <Form.Control 
        type='text'
        name='q'
        value={keyword.value}
        onChange={keyword.hanlder}
        ></Form.Control>
        <Button type='submit' variant='outline-success' className='p-2 ml-2'>Search</Button>
    </Form>
  )
}

export default SearchBox