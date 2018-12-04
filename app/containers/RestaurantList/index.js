/**
 *
 * RestaurantList
 *
 */
/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { Button, Card, Container } from 'semantic-ui-react';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import NavBar from 'containers/NavBar/Loadable';
import makeSelectRestaurantList from './selectors';
import makeSelectLandingPage from '../LandingPage/selectors';
import reducer from './reducer';
import saga from './saga';
import { getRestaurants, deleteRestaurant } from './actions';
import RestaurantCard from '../../components/RestaurantCard';
import { selectedRes } from '../RestaurantDashboard/actions';
import history from '../../utils/history';
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
        <NavBar restaurant="true" />
        <div>
          Welcome {localStorage.getItem('username')}
          {JSON.stringify(this.props.userInfo.id)}
          Welcome {sessionStorage.getItem('username')}
          <Button floated="right" onClick={this.props.addRestaurant}>
            Add Restaurant
          </Button>
        </div>
        <Container text>
          <Card.Group>
            {this.props.restaurantList.restaurants
              ? this.props.restaurantList.restaurants.map((restaurant, key) => (
                  <RestaurantCard
                    key={key}
                    header={restaurant.restaurants_name}
                    delete={this.props.onDelete}
                    edit={this.props.onEdit}
                    id={restaurant.id}
                    description={
                      <div>
                        <div>
                          {' '}
                          <b>Address:</b>
                          <br /> {restaurant.restaurant_address}
                        </div>
                        <div>
                          <b>Phone Number:</b> <br />
                          {restaurant.restaurant_phone_number}
                        </div>
                        <div>
                          <b>Website: </b> <br />
                          {restaurant.restaurant_website}
                        </div>
                      </div>
                    }
                  />
                ))
              : null}
          </Card.Group>
          {/* <Button content="get Repos" onClick={this.props.onPageLoad} /> */}
        </Container>
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
  userInfo: makeSelectLandingPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    onPageLoad: (userId = 1) => {
      dispatch(getRestaurants(userId));
    },
    onClick: e => {
      console.log('CLICKED');
      const resID = e.target.id;
      dispatch(selectedRes(resID));
      // console.log(resID);
    },
    addRestaurant: () => {
      history.push('/addrestaurant');
    },
    onEdit: () => {
      console.log('EDIT CLICKED');
    },
    onDelete: e => {
      console.log('DELETE CLICKED', e.target.id);
      dispatch(deleteRestaurant(e.target.id));
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
