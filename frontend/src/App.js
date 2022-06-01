import React from "react";
import Header from "components/Header";
import Footer from "components/Footer";
import {Container} from 'react-bootstrap';
import HomeScreen from "screens/HomeScreen";
import ProductScreen from "screens/ProductScreen";
import CartScreen from "screens/CartScreen";
import LoginScreen from "screens/LoginScreen";
import RegisterScreen from "screens/RegisterScreen";
import ProfileScreen from "screens/ProfileScreen";
import ShippingScreen from "screens/ShippingScreen";
import PaymentScreen from "screens/PaymentScreen";
import PlaceOrderScreen from "screens/PlaceOrderScreen";
import OrderScreen from "screens/OrderScreen";
import UserListScreen from "screens/UserListScreen";
import UserEditScreen from "screens/UserEditScreen";
import ProductListScreen from "screens/ProductListScreen";
import ProductEditScreen from "screens/ProductEditScreen";
import OrderListScreen from "screens/OrderListScreen";
import NotFound from "components/NotFound";

import PrivateRoute from "components/PrivateRoute";
import DevTools from 'mobx-react-devtools';


import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

function App() {

  return (
    <Router>
      <DevTools/>
      <Header/>
      <main className="py-3">
          <Container>
             <Switch>
              <Route path='/' component={HomeScreen}  exact/>
              <Route path='/search/:keyword' component={HomeScreen} exact />
              <Route path='/page/:pageNumber' component={HomeScreen} exact />
              <Route path='/login' component={LoginScreen}  />
              <Route path='/search/:keyword/page/:pageNumber' component={HomeScreen} exact />

              <PrivateRoute isAdmin path='/admin/userlist' >
                 <UserListScreen/>
              </PrivateRoute>

              <PrivateRoute isAdmin path='/admin/productlist' exact >
                 <ProductListScreen/>
              </PrivateRoute>
              
              <PrivateRoute isAdmin path='/admin/productlist/:pageNumber' exact >
                 <ProductListScreen/>
              </PrivateRoute>

              <PrivateRoute isAdmin path='/admin/product/:id/edit' >
                 <ProductEditScreen/>
              </PrivateRoute>

              <PrivateRoute isAdmin path='/admin/orderlist'>
                 <OrderListScreen/>
              </PrivateRoute>

              <PrivateRoute isAdmin path='/admin/user/:id/edit'>
                 <UserEditScreen/>
              </PrivateRoute>

              <PrivateRoute  path='/shipping'>
                 <ShippingScreen/>
              </PrivateRoute>

              <PrivateRoute  path='/payment' >
                 <PaymentScreen/>
              </PrivateRoute>

              <PrivateRoute  path='/placeorder' >
                 <PlaceOrderScreen/>
              </PrivateRoute>

            
  
          
              <PrivateRoute path='/profile' >
                  <ProfileScreen/>
              </PrivateRoute>
              
              <Route path='/orders/:id' component={OrderScreen}  />
              <Route path='/register' component={RegisterScreen}/>
              <Route path='/product/:id' component={ProductScreen} />
              <Route path='/cart/:id?' component={CartScreen}  />

              <Route path='*' component={NotFound} />
             </Switch>
          </Container>
      </main>
      <Footer/>
    </Router>
  );
}

export default observer(App);
