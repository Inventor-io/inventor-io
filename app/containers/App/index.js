/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import RecipePage from 'containers/RecipePage/Loadable';
import AddRecipePage from 'containers/AddRecipePage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import LandingPage from 'containers/LandingPage/Loadable';
import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Inventory from 'containers/Inventory/Loadable';
import AddInventory from 'containers/AddInventory/Loadable';
import ShoppingCart from 'containers/ShoppingCart/Loadable';
import RestaurantList from 'containers/RestaurantList/Loadable';
import RestaurantDashboard from 'containers/RestaurantDashboard/Loadable';
import Restaurant from 'containers/Restaurant/Loadable';
import Sales from 'containers/SalesPage/Loadable';
// import history from '../../utils/history';

import GlobalStyle from '../../global-styles';
export default function App() {
  return (
    <div>
      <Switch>
        <Route
          exact
          path="/"
          render={() =>
            localStorage.getItem('username') ? (
              <RestaurantList />
            ) : (
              <LandingPage />
            )
          }
        />
        <Route path="/recipe" component={RecipePage} />
        <Route path="/addrecipe" component={AddRecipePage} />
        <Route path="/editrecipe" component={AddRecipePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/sales" component={Sales} />

        {/* <Route
//           path="/recipe"
//           render={() =>
//            localStorage.getItem('username') ? (
//               <RecipePage />
//             ) : (
//               <Redirect to="/login" />
//             )
//           }
//         /> */}

        <Route
          path="/inventory"
          render={() =>
            localStorage.getItem('username') ? <Inventory /> : <LandingPage />
          }
        />
        <Route
          path="/shoppingCart"
          render={() =>
            localStorage.getItem('username') ? (
              <ShoppingCart />
            ) : (
              <LandingPage />
            )
          }
        />
        <Route
          path="/addInventory"
          render={() =>
            localStorage.getItem('username') ? (
              <AddInventory />
            ) : (
              <LandingPage />
            )
          }
        />
        <Route
          path="/restaurant"
          render={() =>
            localStorage.getItem('username') ? (
              <RestaurantList />
            ) : (
              <LandingPage />
            )
          }
        />
        <Route
          path="/addRestaurant"
          render={() =>
            localStorage.getItem('username') ? <Restaurant /> : <LandingPage />
          }
        />
        <Route
          path="/dashboard"
          render={() =>
            localStorage.getItem('username') ? (
              <RestaurantDashboard />
            ) : (
              <LandingPage />
            )
          }
        />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}
