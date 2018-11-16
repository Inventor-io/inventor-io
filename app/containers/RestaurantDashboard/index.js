/**
 *
 * RestaurantDashboard
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectRestaurantDashboard from './selectors';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class RestaurantDashboard extends React.Component {
  render() {
    return <div>restuarant dash</div>;
  }
}

RestaurantDashboard.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  restaurantDashboard: makeSelectRestaurantDashboard(),
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

const withReducer = injectReducer({ key: 'restaurantDashboard', reducer });
const withSaga = injectSaga({ key: 'restaurantDashboard', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(RestaurantDashboard);
