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
import { updateSearchTerm, sendQuery, updateSelect, saveToDB } from './actions';
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
            onClick={e => this.props.handleSearch(e, this.props.searchTerm)}
          />
        </form>

        <select
          name="ingredients"
          onChange={this.props.handleSelect}
          placeholder="Select your ingredient"
        >
          {this.props.options
            ? this.props.options.map((obj, i) => (
              <option key={i.toString()} value={i} text={obj.name}>{obj.name}</option>
            ))
            : ''}
        </select>

        <div>
          <h3>Selected Items:</h3>
          {this.props.addedIngredients
            ? this.props.addedIngredients.map((obj, i) => <li key={i.toString()}>{obj.inventory_name}</li>)
            : ''}

          <Button
            content="Add to inventory list"
            onClick={e => this.props.saveToDB(e)}
          />
        </div>
      </div>
    );
  }
}

// TODO: worry about stuff here
AddInventory.propTypes = {
  // functions
  handleChange: PropTypes.func,
  handleSearch: PropTypes.func,
  handleSelect: PropTypes.func,
  saveToDB: PropTypes.func,
  // states
  searchTerm: PropTypes.any,
  options: PropTypes.any,
  // ingredient: PropTypes.any,
  addedIngredients: PropTypes.any,
};

// selectors extract state from the store and update only those
const mapStateToProps = createStructuredSelector({
  // term updated by 'handleChange'
  searchTerm: makeSearchTermSelect(),
  // dropdown options to show after 'handleSearch'
  options: makeOptionsSelect(),
  // i selected by 'handleSelect'
  ingredient: makeIngredientSelect(),
  // array of all objects to send to 'saveToDB'
  addedIngredients: makeAddIngredientSelect(),
});

function mapDispatchToProps(dispatch) {
  return {
    // input change
    handleChange: e => dispatch(updateSearchTerm(e.target.value)),
    // click button after input
    handleSearch: (e, searchTerm) => {
      e.preventDefault();
      return dispatch(sendQuery(searchTerm));
    },
    // select item from dropdown
    handleSelect: e => dispatch(updateSelect(e.target.value)),
    // send all selected items to db
    saveToDB: e => {
      e.preventDefault();
      return dispatch(saveToDB());
    },
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
