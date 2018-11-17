/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import RecipePage from 'containers/RecipePage/Loadable';
import AddRecipePage from 'containers/AddRecipePage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import LandingPage from 'containers/LandingPage/Loadable';
import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Inventory from 'containers/Inventory/Loadable';
import AddInventory from 'containers/AddInventory/Loadable';
import RestaurantList from 'containers/RestaurantList/Loadable';
import RestaurantDashboard from 'containers/RestaurantDashboard/Loadable';

import GlobalStyle from '../../global-styles';
export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/recipe" component={RecipePage} />
        <Route path="/addrecipe" component={AddRecipePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/landing" component={LandingPage} />
        <Route
          path="/recipe"
          render={() =>
            sessionStorage.getItem('username') ? (
              <RecipePage />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
        <Route
          path="/inventory"
          render={() =>
            sessionStorage.getItem('username') ? (
              <Inventory />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
        <Route
          path="/addInventory"
          render={() =>
            sessionStorage.getItem('username') ? (
              <AddInventory />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
        <Route
          path="/restaurant"
          render={() =>
            sessionStorage.getItem('username') ? (
              <RestaurantList />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
        <Route
          path="/addRestaurant"
          render={() =>
            sessionStorage.getItem('username') ? (
              <RestaurantList />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
        <Route
          path="/dashboard"
          render={() =>
            sessionStorage.getItem('username') ? (
              <RestaurantDashboard />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}
