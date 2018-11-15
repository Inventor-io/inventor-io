/**
 *
 * RestaurantList
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectRestaurantList from './selectors';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class RestaurantList extends React.Component {
  render() {
    return <div>restaurant list</div>;
  }
}

RestaurantList.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  restaurantList: makeSelectRestaurantList(),
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

const withReducer = injectReducer({ key: 'restaurantList', reducer });
const withSaga = injectSaga({ key: 'restaurantList', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(RestaurantList);
