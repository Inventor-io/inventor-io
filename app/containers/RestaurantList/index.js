/**
 *
 * RestaurantList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Button } from 'semantic-ui-react';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectRestaurantList from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getRestaurants } from './actions';

/* eslint-disable react/prefer-stateless-function */
export class RestaurantList extends React.Component {
  // componentDidMount() {
  //   this.props.onPageLoad();
  // }

  render() {
    return (
      <div>
        {JSON.stringify(this.props.restaurantList)}
        <Button content="get Repos" onClick={this.props.onPageLoad} />
      </div>
    );
  }
}

RestaurantList.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  restaurantList: PropTypes.any,
  onPageLoad: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  restaurantList: makeSelectRestaurantList(),
});

function mapDispatchToProps(dispatch) {
  return {
    onPageLoad: e => {
      console.log('page load', e, '###############', getRestaurants);
      dispatch(getRestaurants());
    },
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
