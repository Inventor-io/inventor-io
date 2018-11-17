/**
 *
 * AddInventory
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Input, Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
  makeOptionsSelect,
  makeSearchTermSelect,
  makeIngredientSelect,
  makeAddIngredientSelect,
} from './selectors';
import {
  updateSearchTerm,
  updateDropdownOptions,
  updateSelect,
  saveToDB,
} from './actions';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class AddInventory extends React.Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     options: [],
  //     searchTerm: '',
  //     ingredient: [],
  //     addedIngredients: [],
  //   };

  // this.handleChange = this.handleChange.bind(this);
  // this.handleSearch = this.handleSearch.bind(this);
  // this.handleSelect = this.handleSelect.bind(this);
  // this.saveToDB = this.saveToDB.bind(this);

  // handleChange(event) {
  //   event.preventDefault();
  //   event.persist();

  //   this.setState({
  //     searchTerm: event.target.value,
  //   });
  // }

  // handleSearch(event) {
  //   event.preventDefault();
  //   event.persist();

  //   const { searchTerm } = this.state;
  //   // the rest of the code moved to saga.js
  //   // const options = {
  //   //   url: '/api/inventory/usdaSearch',
  //   //   method: 'post',
  //   //   data: { searchTerm },
  //   // };

  //   // axios(options).then(data => {
  //   //   this.setState({
  //   //     options: data.data,
  //   //   });
  //   // });
  // }

  // MOVED TO SAGA
  // handleSelect(event) {
  //   event.preventDefault();
  //   event.persist();
  //   this.setState(
  //     {
  //       ingredient: event.target.value, // i
  //     },
  //     () => {
  //       const i = this.state.ingredient;
  //       // show on screen
  //       const ingObj = this.state.options[i];
  //       this.setState(state => ({
  //         addedIngredients: state.addedIngredients.concat([ingObj]),
  //       }));
  //     },
  //   );
  // }

  // MOVED TO SAGA
  // saveToDB() {
  //   const options = {
  //     url: '/api/inventory/addIngToDB',
  //     method: 'post',
  //     data: { ingObj: this.state.addedIngredients },
  //   };

  //   // TODO: react routers should redirect to inventoryList page
  //   axios(options)
  //     .then(() => {
  //       alert('added to db!');
  //     })
  //     .catch(() => {
  //       alert(
  //         'error communicating with server while saving inventory item to db!',
  //       );
  //     });
  // }

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
            onChange={this.props.handleChange}
            size="large"
          />
          <Button
            content="Search!"
            onClick={() => this.props.handleSearch(this.props.searchTerm)}
          />
        </form>

        <select
          name="ingredients"
          onChange={this.props.handleSelect}
          placeholder="Select your ingredient"
        >
          {/* {this.props.options.map((obj, i) => (
            <option key={i.toString()} value={i} text={obj.name}>
              {obj.name}
            </option>
          ))} */}
          {console.log(this.props.options)}
        </select>

        <div>
          <h3>Selected Items:</h3>
          {/* {this.props.addedIngredients.map((obj, i) => (
            <li key={i.toString()}>{obj.inventory_name}</li>
          ))} */}
          <Button
            content="Add to inventory list"
            onClick={() => this.props.saveToDB(this.props.addedIngredients)}
          />
        </div>
      </div>
    );
  }
}

// TODO: worry about stuff here
AddInventory.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  handleChange: PropTypes.func,
  handleSearch: PropTypes.func,
  handleSelect: PropTypes.func,
  saveToDB: PropTypes.func,
  options: PropTypes.any,
  searchTerm: PropTypes.any,
  // ingredient: PropTypes.any,
  addedIngredients: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  // addInventory: makeSelectAddInventory(),
  options: makeOptionsSelect,
  searchTerm: makeSearchTermSelect,
  ingredient: makeIngredientSelect,
  addedIngredients: makeAddIngredientSelect,
});

function mapDispatchToProps(dispatch) {
  return {
    // dispatch,
    handleChange: e => dispatch(updateSearchTerm(e.target.value)),
    handleSearch: searchTerm => dispatch(updateDropdownOptions(searchTerm)),
    handleSelect: e => dispatch(updateSelect(e.target.value)),
    saveToDB: addedIngredients => dispatch(saveToDB(addedIngredients)),
  };
}

// TODO: don't worry about stuff down here
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
