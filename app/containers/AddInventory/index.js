/**
 *
 * AddInventory
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Input, Button } from 'semantic-ui-react';
import axios from 'axios';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectAddInventory from './selectors';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class AddInventory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: [],
      searchTerm: '',
      ingredient: [],
      addedIngredients: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.saveToDB = this.saveToDB.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    event.persist();

    this.setState({
      searchTerm: event.target.value,
    });
  }

  handleSearch(event) {
    event.preventDefault();
    event.persist();

    const { searchTerm } = this.state;

    const options = {
      url: '/api/inventory/usdaSearch',
      method: 'post',
      data: { searchTerm },
    };

    axios(options).then(data => {
      this.setState({
        options: data.data,
      });
    });
  }

  handleSelect(event) {
    event.preventDefault();
    event.persist();
    this.setState(
      {
        ingredient: event.target.value, // i
      },
      () => {
        const i = this.state.ingredient;
        // show on screen
        const ingObj = this.state.options[i];
        this.setState(state => ({
          addedIngredients: state.addedIngredients.concat([ingObj]),
        }));
      },
    );
  }

  saveToDB() {
    const options = {
      url: '/api/inventory/addIngToDB',
      method: 'post',
      data: { ingObj: this.state.addedIngredients },
    };

    // TODO: react routers should redirect to inventoryList page
    axios(options)
      .then(() => {
        alert('added to db!');
      })
      .catch(() => {
        alert(
          'error communicating with server while saving inventory item to db!',
        );
      });
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>AddInventory</title>
          <meta name="description" content="Description of AddInventory" />
        </Helmet>

        <h1>Add an ingredient..!</h1>
        <form>
          <Input
            placeholder="Search Ingredient"
            onChange={this.handleChange}
            size="large"
          />
          <Button content="Search!" onClick={this.handleSearch} />
        </form>

        <select
          name="ingredients"
          onChange={this.handleSelect}
          placeholder="Select your ingredient"
        >
          {this.state.options.map((obj, i) => (
            <option key={i.toString()} value={i}>
              {obj.name}
            </option>
          ))}
        </select>

        <div>
          <h3>Selected Items:</h3>
          {this.state.addedIngredients.map((obj, i) => (
            <li key={i.toString()}>{obj.inventory_name}</li>
          ))}
          <Button content="Add to inventory list" onClick={this.saveToDB} />
        </div>
      </div>
    );
  }
}

// AddInventory.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };

const mapStateToProps = createStructuredSelector({
  addInventory: makeSelectAddInventory(),
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

const withReducer = injectReducer({ key: 'addInventory', reducer });
const withSaga = injectSaga({ key: 'addInventory', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AddInventory);
