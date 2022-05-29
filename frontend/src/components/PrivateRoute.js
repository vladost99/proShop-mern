import useStore from 'hooks/useStore'
import React from 'react'
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({children,isAdmin, ...rest}) => {
  const {userStore} = useStore(); 
  const {userInfo} = userStore;

  if(isAdmin) {
    return (
        <Route
            {...rest}
            render={({location}) => 
            userInfo && userInfo.isAdmin ? (children) : (
                <Redirect to={{pathname: '/', state: {from: location}}} />
            )
        }    
        >

        </Route>
  )
  }
  
    return (
        <Route
            {...rest}
            render={({location}) => 
            userInfo ? (children) : (
                <Redirect to={{pathname: '/login', state: {from: location}}} />
            )
        }    
        >

        </Route>
  )
}

export default PrivateRoute