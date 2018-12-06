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
import { Table, Input, Button } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import axios from 'axios';

import NavBar from 'containers/NavBar/Loadable';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { selectSalesPageDomain } from './selectors';
import history from '../../utils/history';
import { makeSelectRestaurantInfo } from '../RestaurantDashboard/selectors';
import { handleInput, updateSalesList } from './actions';
import reducer from './reducer';
import saga from './saga';

const styles = {
  textAlign: 'right',
};

/* eslint-disable react/prefer-stateless-function */
export class SalesPage extends React.Component {
  componentDidMount() {
    this.props.handleMount(this.props.restaurant.recipes);
  }

  state = {
    startDate: new Date(),
  };

  handleChange = this.handleChange.bind(this);

  handleSubmit = this.handleSubmit.bind(this);

  handleChange(date) {
    this.setState({
      startDate: date,
    });
  }

  handleSubmit() {
    const checkSubmit = () => {
      let result = true;
      const { salesList } = this.props.salesPage;
      for (let i = 0; i < salesList.length; i += 1) {
        if (salesList[i].quantity === '') {
          result = false;
        }
      }
      return result;
    };
    if (checkSubmit()) {
      // alert('Successfully posted (just comment out to add to db)');
      axios.post('/api/auth/sales', {
        date: this.state.startDate,
        salesList: this.props.salesPage,
      });
      history.push('/dashboard');
    } else alert('please input amounts or zero for all recipes');
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>SalesPage</title>
          <meta name="description" content="Description of SalesPage" />
        </Helmet>
        <NavBar />
        <div className="salesPage">
          <br />
          <h2 className="sales-header">Enter Sales</h2>
          {this.props.salesPage.salesList ? (
            <Table unstackable textAlign="right" className="sales-table">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell textAlign="left">
                    Recipe Name
                  </Table.HeaderCell>
                  <Table.HeaderCell>Price</Table.HeaderCell>
                  <Table.HeaderCell>Amount Sold</Table.HeaderCell>
                  <Table.HeaderCell>Revenue</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {this.props.salesPage.salesList.map(row => (
                  <Table.Row key={row.recipe_id}>
                    <Table.Cell textAlign="left">{row.recipe_name}</Table.Cell>
                    <Table.Cell>${row.price.toFixed(2)}</Table.Cell>
                    <Table.Cell>
                      <Input
                        type="number"
                        min="0"
                        pattern="[0-9]"
                        name="quantity"
                        placeholder="Quantity"
                        onChange={e =>
                          this.props.handleChange(e, row.recipe_id)
                        }
                      />
                    </Table.Cell>
                    {/* eslint-disable */}
                      <Table.Cell>
                        {row.quantity
                          ? `$${(row.price * parseInt(row.quantity, 10)).toFixed(
                              2,
                            )}`
                          : '$0'}
                      </Table.Cell>
                      {/* eslint-enable */}
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          ) : (
            <Table unstackable textAlign="right" className="sales-table">
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
                {this.props.restaurant.recipes.map(row => (
                  <Table.Row key={row.recipe_id}>
                    <Table.Cell textAlign="left">{row.recipe_name}</Table.Cell>
                    <Table.Cell>${row.price.toFixed(2)}</Table.Cell>
                    <Table.Cell>
                      <Input
                        type="number"
                        name="quantity"
                        placeholder="Quantity"
                        onChange={e =>
                          this.props.handleChange(e, row.recipe_id)
                        }
                      />
                    </Table.Cell>
                    {/* eslint-disable */}
                      <Table.Cell>
                        {row.quantity === 1
                          ? `$${(row.price * parseInt(row.quantity, 10)).toFixed(
                              2,
                            )}`
                          : '$0'}
                      </Table.Cell>
                      {/* eslint-enable */}
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          )}
          {/* eslint-disable */}
          <h2 style={styles} className="sales-total">
            Total Revenue: $
            {this.props.salesPage.salesList
              ?
                this.props.salesPage.salesList.reduce(
                  (prev, curr) => 
                    prev + (parseInt(curr.quantity, 10) ? parseInt(curr.quantity, 10): 0) * curr.price,
                  0,
                ).toFixed(2)
              : '0'}
          </h2>
          <br />
          <h2 className="sales-header-sold">Sold on : {moment(this.state.startDate).format('MM/DD/YYYY')}</h2>
          <div className="sales-sold">
            <br />
            <DatePicker
              inline
              selected={this.state.startDate}
              onChange={this.handleChange}
            />
          </div>
          <br />
          <br />
          <Button type="button" onClick={this.handleSubmit} className="enter-sales">
            Add Sales Information
          </Button>
        </div>
        {/* eslint-enable */}
      </div>
    );
  }
}

SalesPage.propTypes = {
  // restaurant: PropTypes.any,
  handleChange: PropTypes.func,
  handleMount: PropTypes.func,
  salesPage: PropTypes.any,
  restaurant: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  salesPage: selectSalesPageDomain,
  restaurant: makeSelectRestaurantInfo(),
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
