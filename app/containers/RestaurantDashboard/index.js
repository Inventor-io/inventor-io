/**
 *
 * RestaurantDashboard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import axios from 'axios';
import makeSelectRestaurantDashboard from './selectors';
import reducer from './reducer';
import saga from './saga';
import { loadInformation } from './actions';

/* eslint-disable react/prefer-stateless-function */
export class RestaurantDashboard extends React.Component {
  componentDidMount() {
    this.props.onLoad();
  }

  render() {
    return <div>restuarant dash</div>;
  }
}

RestaurantDashboard.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  onLoad: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  restaurantDashboard: makeSelectRestaurantDashboard(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onLoad: () => dispatch(loadInformation()),
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
