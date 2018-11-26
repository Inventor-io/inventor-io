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
import { Table, Loader, Container } from 'semantic-ui-react';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectRestaurantDashboard, {
  makeSelectRestaurantInfo,
  makeSelectRestaurantId,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { loadInformation } from './actions';

/* eslint-disable react/prefer-stateless-function */
export class RestaurantDashboard extends React.Component {
  componentDidMount() {
    this.props.onLoad();
  }

  render() {
    return (
      <div>
        <Container>
          {this.props.info ? (
            <div>
              {/* <div>{JSON.stringify(this.props.info)}</div> */}
              <h1>Orders</h1>
              <Table celled>
                <Table.Header>
                  <Table.Row>
                    {Object.keys(this.props.info.orders[0])
                      .filter(key => key.indexOf('id') === -1)
                      .map(header => (
                        <Table.HeaderCell>{header}</Table.HeaderCell>
                      ))}
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {this.props.info.orders.map(order => (
                    <Table.Row>
                      <Table.Cell>{order.ndbno}</Table.Cell>
                      <Table.Cell>{order.price}</Table.Cell>
                      <Table.Cell>{order.quantity}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
              <h1>Sales</h1>
              <Table celled>
                <Table.Header>
                  <Table.Row>
                    {Object.keys(this.props.info.sales[0])
                      .filter(key => key !== 'id' && key !== 'restaurant_id')
                      .map(header => (
                        <Table.HeaderCell>{header}</Table.HeaderCell>
                      ))}
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {this.props.info.sales.map(sales => (
                    <Table.Row>
                      <Table.Cell>{sales.recipe_id}</Table.Cell>
                      <Table.Cell>{sales.quantity}</Table.Cell>
                      <Table.Cell>{sales.date}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
              <h1>Recipes</h1>
              <Table celled>
                <Table.Header>
                  <Table.Row>
                    {Object.keys(this.props.info.recipes[0])
                      .filter(key => key.indexOf('id') === -1)
                      .map(header => (
                        <Table.HeaderCell>{header}</Table.HeaderCell>
                      ))}
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {this.props.info.recipes.map(recipe => (
                    <Table.Row>
                      <Table.Cell>{recipe.recipe_name}</Table.Cell>
                      <Table.Cell>{recipe.price}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
              <h1>Restaurant Inventory</h1>
              <Table celled>
                <Table.Header>
                  <Table.Row>
                    {Object.keys(this.props.info.resInv[0])
                      .filter(key => key.indexOf('id') === -1)
                      .map(header => (
                        <Table.HeaderCell>{header}</Table.HeaderCell>
                      ))}
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {this.props.info.resInv.map(inventory => (
                    <Table.Row>
                      <Table.Cell>{inventory.ndbno}</Table.Cell>
                      <Table.Cell>{inventory.measurement}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
              {/* </Table.Header> */}
              {/* </Table> */}
            </div>
          ) : (
            <Loader active inline="centered" />
          )}
        </Container>
      </div>
    );
  }
}

RestaurantDashboard.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  onLoad: PropTypes.func,
  info: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  // restaurantDashboard: makeSelectRestaurantDashboard,
  info: makeSelectRestaurantInfo(),
  all: makeSelectRestaurantDashboard,
  id: makeSelectRestaurantId,
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
