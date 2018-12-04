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
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import NavBar from 'containers/NavBar/Loadable';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { selectSalesPageDomain } from './selectors';
import makeSelectRestaurantList from '../RestaurantList/selectors';
import { selectRecipePageDomain } from '../RecipePage/selectors';
import { handleInput, updateSalesList } from './actions';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class SalesPage extends React.Component {
  componentDidMount() {
    this.props.handleMount(this.props.recipeList.recipeList);
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
      alert('Successfully posted (just comment out to add to db)');
      // axios.post('/api/auth/sales', {
      //   date: this.state.startDate,
      //   salesList: this.props.salesPage,
      // });
    } else alert('please input sales data for all recipes');
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>SalesPage</title>
          <meta name="description" content="Description of SalesPage" />
        </Helmet>
        <NavBar />
        <h2>Enter Sales</h2>
        {this.props.salesPage.salesList ? (
          <Table unstackable textAlign="right">
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
                      placeholder="Quantity"
                      onChange={e => this.props.handleChange(e, row.recipe_id)}
                    />
                  </Table.Cell>
                  <Table.Cell>{`$${(
                    row.price * parseInt(row.quantity, 10)
                  ).toFixed(2)}`}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        ) : (
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
              {this.props.recipeList.recipeList.map(row => (
                <Table.Row key={row.recipe_id}>
                  <Table.Cell textAlign="left">{row.recipe_name}</Table.Cell>
                  <Table.Cell>${row.price.toFixed(2)}</Table.Cell>
                  <Table.Cell>
                    <Input
                      placeholder="Quantity"
                      onChange={e => this.props.handleChange(e, row.recipe_id)}
                    />
                  </Table.Cell>
                  <Table.Cell>{`$${(
                    row.price * parseInt(row.quantity, 10)
                  ).toFixed(2)}`}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        )}
        {/* eslint-disable */}
        <div>
          Total Revenue: $
          {this.props.salesPage.salesList
            ? new Intl.NumberFormat('en-IN', {
              maximumSignificantDigits: 10,
            }).format(
              this.props.salesPage.salesList.reduce(
                (prev, curr) =>
                  prev + parseInt(curr.quantity, 10) * curr.price,
                0,
              ),
            )
            : '0'}
          0
        </div>
        <br />
        <div>
          <div>Sold on :</div>
          <br />
          <DatePicker
            inline
            selected={this.state.startDate}
            onChange={this.handleChange}
          />
        </div>
        <br />
        <div>{JSON.stringify(this.state.startDate)}</div>
        <br />
        <button type="button" onClick={this.handleSubmit}>
          HI NIK YOU ROCK
        </button>
        {/* eslint-enable */}
      </div>
    );
  }
}

SalesPage.propTypes = {
  // restaurant: PropTypes.any,
  recipeList: PropTypes.any,
  handleChange: PropTypes.func,
  handleMount: PropTypes.func,
  salesPage: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  salesPage: selectSalesPageDomain,
  restaurant: makeSelectRestaurantList(),
  recipeList: selectRecipePageDomain,
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
