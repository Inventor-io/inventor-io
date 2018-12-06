/**
 *
 * AddIngredients
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  Input,
  Button,
  Dropdown,
  Container,
  Header,
  Divider,
  List,
  Form,
} from 'semantic-ui-react';
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
  sendQuery,
  updateSelect,
  // saveToDB,
  removeItem,
} from './actions';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class AddIngredients extends React.Component {
  render() {
    return (
      <div>
        <Container>
          <Header as="h1">Search for an ingredient</Header>
          <Form>
            <Form.Field>
              <Input
                placeholder="Search Ingredient"
                onChange={this.props.handleChange}
                size="large"
              />
            </Form.Field>
            <Button
              content="Search!"
              onClick={e => this.props.handleSearch(e, this.props.searchTerm)}
            />
          </Form>

          <Dropdown
            selection
            onChange={this.props.handleSelect}
            placeholder="Select your ingredient"
            /* eslint-disable */
            options={
              this.props.options
                ? this.props.options.map((obj, i) => ({
                  text: obj.inventory_name,
                  value: i,
                }))
                : []
            }
            /* eslint-enable */
          />
          <Divider />
          <div>
            <Header as="h3">Selected Items:</Header>
            {/* eslint-disable */}
            <List bulleted>
              {this.props.addedIngredients
                ? this.props.addedIngredients.map((obj, i) => (
                  <List.Item key={i.toString()}>
                    {obj.inventory_name}
                    <Button icon="delete" onClick={this.props.handleRemove} value={obj.inventory_name}/>
                  </List.Item>
                ))
                : ''}
            </List>
            {/* eslint-enable */}

            <Button
              content="Add to inventory list"
              onClick={() => {
                // const prom1 = new Promise(() => this.props.saveToDB(e));
                const prom2 = new Promise(() =>
                  this.props.importList(this.props.addedIngredients),
                );
                Promise.all([prom2]).then(this.props.close);
              }}
            />
          </div>
        </Container>
      </div>
    );
  }
}

// TODO: worry about stuff here
AddIngredients.propTypes = {
  // functions
  handleChange: PropTypes.func,
  handleSearch: PropTypes.func,
  handleSelect: PropTypes.func,
  handleRemove: PropTypes.func,
  importList: PropTypes.func,
  close: PropTypes.func,
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
    handleRemove: e => {
      e.preventDefault();
      return dispatch(removeItem(e.target.value));
    },
    // select item from dropdown
    handleSelect: (e, target) => dispatch(updateSelect(target.value)),
    // send all selected items to db
    // saveToDB: e => {
    //   e.preventDefault();
    //   // history.push('/inventory');
    //   return dispatch(saveToDB());
    // },
    // Clear the state (unmount)
    // handleUnmount: () => dispatch(clearState),
  };
}

// TODO: don't worry about stuff down here
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'addIngredients', reducer });
const withSaga = injectSaga({ key: 'addIngredients', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AddIngredients);
