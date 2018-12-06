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
import {
  Button,
  Card,
  Container,
  Modal,
  Header,
  Icon,
  Input,
  Grid,
  Image,
} from 'semantic-ui-react';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import NavBar from 'containers/NavBar/Loadable';
import makeSelectRestaurantList from './selectors';
import makeSelectLandingPage from '../LandingPage/selectors';
import reducer from './reducer';
import saga from './saga';
import { getRestaurants, deleteRestaurant, updateRestaurant } from './actions';
import RestaurantCard from '../../components/RestaurantCard';
import { selectedRes } from '../RestaurantDashboard/actions';
import history from '../../utils/history';
import { RSA_NO_PADDING } from 'constants';
/* eslint-disable react/prefer-stateless-function */
export class RestaurantList extends React.Component {
  constructor() {
    super();
    this.state = {
      checkDelete: false,
      modalOpen: false,
      id: 0,
      name: '',
      address: '',
      phoneNumber: 5,
      website: '',
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeNumber = this.onChangeNumber.bind(this);
    this.onChangeWebsite - this.onChangeWebsite.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.verifyDelete = this.verifyDelete.bind(this);
    this.delete = this.delete.bind(this);
  }
  // componentDidMount() {
  //   this.props.onPageLoad();
  // }
  handleOpen = e => {
    console.log('handle open', e.target.id);
    console.log(this.props);
    //const res = undefined;
    // this.props.restaurantList.restaurants.map(restaurant => {
    //   console.log(Number(restaurant.id));
    //   console.log(Number(e.target.id));
    //   console.log(Number(restaurant.id) === Number(e.target.id));
    // });
    const res = this.props.restaurantList.restaurants.filter(
      restaurant => Number(restaurant.id) === Number(e.target.id),
    )[0];
    console.log(res);
    this.setState({
      modalOpen: false,
      id: Number(e.target.id),
      name: res.restaurants_name,
      address: res.restaurant_address,
      phoneNumber: res.restaurant_phone_number,
      website: res.restaurant_website,
    });
    this.setState({ modalOpen: true });
  };

  componentDidMount() {
    this.props.onPageLoad();
  }

  handleClose = e => {
    this.setState({ modalOpen: false, checkDelete: false });
  };
  onChangeName = e => {
    this.setState({ name: e.target.value });
  };

  onChangeAddress = e => {
    this.setState({ address: e.target.value });
  };

  onChangeNumber = e => {
    this.setState({ phoneNumber: e.target.value });
  };

  onChangeWebsite = e => {
    this.setState({ website: e.target.value });
  };

  onSubmitForm = e => {
    e.preventDefault();
    this.props.update(this.state);
    this.handleClose();
    //this.setState({ modalOpen: false });
  };

  verifyDelete = e => {
    this.setState({ checkDelete: true, id: e.target.id });
  };

  delete = e => {
    this.props.onDelete(this.state.id);
    this.handleClose();
  };

  render() {
    return (
      <div>
        <NavBar restaurant="true" />
        <div>
          <Button floated="right" onClick={this.props.addRestaurant}>
            Add Restaurant
          </Button>
        </div>
        <Grid>
          <Grid.Column width={1} />
          <Grid.Column width={10}>
            Welcome {localStorage.getItem('username')}
            <br />
            <Card.Group>
              {this.props.restaurantList.restaurants
                ? this.props.restaurantList.restaurants.map(
                    (restaurant, key) => (
                      <RestaurantCard
                        key={key}
                        header={restaurant.restaurants_name}
                        click={this.props.onClick}
                        delete={this.verifyDelete}
                        edit={this.handleOpen}
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
                    ),
                  )
                : null}
            </Card.Group>
          </Grid.Column>
          {/* <Button content="get Repos" onClick={this.props.onPageLoad} /> */}
          <Grid.Column width={1} />
        </Grid>

        <Modal
          //trigger={<Button onClick={this.handleOpen}>Show Modal</Button>}
          open={this.state.modalOpen}
          onClose={this.handleClose}
          basic
          size="small"
        >
          {/* <Header icon="" content="Cookies policy" /> */}
          <Modal.Content>
            <h2>Edit Restaurant</h2>
            <div>
              <form onSubmit={this.props.onSubmitForm}>
                <Input
                  value={this.state.name}
                  onChange={this.onChangeName}
                  size="large"
                  placeholder="Name"
                />
                <br />
                <Input
                  value={this.state.address}
                  onChange={this.onChangeAddress}
                  size="large"
                  placeholder="Address"
                />
                <br />
                <Input
                  value={this.state.phoneNumber}
                  onChange={this.onChangeNumber}
                  size="large"
                  placeholder="Phone Number"
                />
                <br />
                <Input
                  value={this.state.website}
                  onChange={this.onChangeWebsite}
                  size="large"
                  placeholder="Website"
                />
                <br />
                <Button content="Submit" onClick={this.onSubmitForm} />
              </form>
            </div>
          </Modal.Content>
          <Modal.Actions>
            <Button color="red" onClick={this.handleClose} inverted>
              <Icon name="checkmark" /> Exit
            </Button>
          </Modal.Actions>
        </Modal>
        <Modal
          //trigger={<Button onClick={this.handleOpen}>Show Modal</Button>}
          open={this.state.checkDelete}
          onClose={this.handleClose}
          basic
          size="small"
        >
          <Modal.Content>
            <h3>
              ARE YOU SURE YOU WANT TO DELETE? All information will be lost.
            </h3>
          </Modal.Content>
          <Modal.Actions>
            <Button color="green" onClick={this.handleClose} inverted>
              <Icon name="checkmark" /> GO BACK
            </Button>
            <Button color="red" onClick={this.delete} inverted>
              <Icon name="checkmark" /> DELETE EVERYTHING
            </Button>
          </Modal.Actions>
        </Modal>
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
      console.log('onPageLoad', userId);
      dispatch(getRestaurants(userId));
    },
    onClick: e => {
      const resID = e.target.id;
      console.log('restaruant CLICKED', resID);
      dispatch(selectedRes(resID));
      // console.log(resID);
    },
    addRestaurant: () => {
      history.push('/addrestaurant');
    },
    onDelete: e => {
      console.log('DELETE CLICKED', e);
      dispatch(deleteRestaurant(e));
    },
    onClose: e => {
      this.setState({ modalOpen: false });
    },
    update: upRes => {
      dispatch(updateRestaurant(upRes));
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
