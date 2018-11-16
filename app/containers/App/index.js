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
import SignupPage from 'containers/SignupPage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import LandingPage from 'containers/LandingPage/Loadable';
import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Restaurant from 'containers/Restaurant/Loadable';
import Inventory from 'containers/Inventory/Loadable';
import AddInventory from 'containers/AddInventory/Loadable';

import GlobalStyle from '../../global-styles';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/signup" component={SignupPage} />{' '}
        <Route exact path="/login" component={LoginPage} />{' '}
        <Route exact path="/landing" component={LandingPage} />{' '}
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
              <Restaurant />
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
