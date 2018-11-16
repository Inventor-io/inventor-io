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
// import { Button } from 'semantic-ui-react';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectRestaurantList from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getRestaurants } from './actions';
import RestaurantCard from '../../components/RestaurantCard';

/* eslint-disable react/prefer-stateless-function */
export class RestaurantList extends React.Component {
  // componentDidMount() {
  //   this.props.onPageLoad();
  // }

  componentDidMount() {
    this.props.onPageLoad();
  }

  render() {
    return (
      <div>
        {this.props.restaurantList.restaurants
          ? this.props.restaurantList.restaurants.map(restaurant => (
            <RestaurantCard
              header={restaurant.restaurants_name}
              description={
                <ul>
                  <li>{restaurant.restaurant_address}</li>
                  <li>{restaurant.restaurant_phone_number}</li>
                  <li>{restaurant.restaurant_website}</li>
                </ul>
              }
            />
          ))
          : null}
        {/* <Button content="get Repos" onClick={this.props.onPageLoad} /> */}
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
      console.log(e);
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
