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
import { Table, Input } from 'semantic-ui-react';

import NavBar from 'containers/NavBar/Loadable';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { selectSalesPageDomain } from './selectors';
import makeSelectRestaurantList from '../RestaurantList/selectors';
import { makeSelectRestaurantInfo } from '../RestaurantDashboard/selectors';
import { handleInput, updateSalesList } from './actions';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class SalesPage extends React.Component {
  componentDidMount() {
    this.props.handleMount(this.props.recipes);
  }

  render() {
    console.log(
      'this is supposed to be the sales page selector: ',
      this.props.salesPage.salesList,
    );
    return (
      <div>
        <Helmet>
          <title>SalesPage</title>
          <meta name="description" content="Description of SalesPage" />
        </Helmet>
        <NavBar />
        <h2>Enter Sales</h2>
        {this.props.recipes ? (
          <Table unstackable textAlign="right">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign="left">
                  Recipe Name
                </Table.HeaderCell>
                <Table.HeaderCell>Price</Table.HeaderCell>
                <Table.HeaderCell>Amount Sold</Table.HeaderCell>
                <Table.HeaderCell>Total Revenue</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.props.salesPage.salesList.map(row => (
                <Table.Row key={row.recipe_id}>
                  <Table.Cell textAlign="left">{row.recipe_name}</Table.Cell>
                  <Table.Cell>${row.price.toFixed(2)}</Table.Cell>
                  <Table.Cell>
                    <Input
                      placeholder="Search Ingredient"
                      onChange={e => this.props.handleChange(e, row.recipe_id)}
                    />
                  </Table.Cell>
                  <Table.Cell>{`$${row.price * row.quantity}`}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        ) : (
          <Table.Row>
            <Table.Cell textAlign="center" colSpan="4">
              Please make a recipe
            </Table.Cell>
          </Table.Row>
        )}
      </div>
    );
  }
}

SalesPage.propTypes = {
  // restaurant: PropTypes.any,
  recipes: PropTypes.any,
  handleChange: PropTypes.func,
  handleMount: PropTypes.func,
  salesPage: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  salesPage: selectSalesPageDomain,
  restaurant: makeSelectRestaurantList(),
  recipes: makeSelectRestaurantInfo(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    handleChange: (e, i) => {
      e.preventDefault();
      return dispatch(handleInput(i, e.target.value));
    },
    handleMount: list => dispatch(updateSalesList(list)),
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
