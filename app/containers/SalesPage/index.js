/**
 *
 * SalesPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import NavBar from 'containers/NavBar/Loadable';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectSalesPage from './selectors';
import makeSelectRestaurantList from '../RestaurantList/selectors';
import { makeSelectRestaurantInfo } from '../RestaurantDashboard/selectors';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class SalesPage extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>SalesPage</title>
          <meta name="description" content="Description of SalesPage" />
        </Helmet>
        <NavBar />
        <h1>{this.props.restaurant.restaurants[0].restaurants_name}</h1>
        <h2>Enter Sales</h2>
        {this.props.recipes.recipes.map(recipe => (
          <h1>{recipe.recipe_name}</h1>
        ))}
      </div>
    );
  }
}

SalesPage.propTypes = {
  restaurant: PropTypes.any,
  recipes: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  salesPage: makeSelectSalesPage(),
  restaurant: makeSelectRestaurantList(),
  recipes: makeSelectRestaurantInfo(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'salesPage', reducer });
const withSaga = injectSaga({ key: 'salesPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SalesPage);
