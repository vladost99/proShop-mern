import React from 'react'
import { Pagination } from 'react-bootstrap'
import { useHistory  } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

const Paginate = ({pages, page = 1, products, isAdmin = false, keyword = ''}) => {
  const history = useHistory();
  const handleLink = (pageN) => {
    let p = !isAdmin ? keyword ? `/search/${keyword}/page/${pageN}` : `/page/${pageN}` : `/admin/productlist/${pageN}`;
    history.push(p);
    }

  return pages > 1 && products.length > 0 && (
      <Pagination>
        {[...Array(pages).keys()].map(x => (
            <Pagination.Item onClick={() => handleLink(x + 1)}  activeLabel='' key={x + 1} active={x + 1 == page}>
               {x + 1}
            </Pagination.Item>
        ))}
      </Pagination>
  )
}

export default observer(Paginate);