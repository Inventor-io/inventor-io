/**
 *
 * RecipePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import 'semantic-ui-css/semantic.min.css';
import { Dropdown, List, Container } from 'semantic-ui-react';
import makeSelectRecipePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
const restaurantList = [
  {
    text: 'All Restaurants',
    value: 'All Restaurants',
  },
  {
    text: 'El Ranchero',
    value: 'El Ranchero',
  },
  {
    text: 'The Good Place',
    value: 'The Good Place',
  },
];

const recipeList = [
  {
    name: 'House Salad',
    description: 'Like the doctor, but a salad.',
    ingredients: [
      {
        name: 'cabbage',
        quantity: 100,
        unit: 'gram',
      },
      {
        name: 'ranch',
        quantity: 5,
        unit: 'gallon',
      },
    ],
  },
  {
    name: 'Burger',
    description: "Look at me. I'm a burger.",
    ingredients: [
      {
        name: 'burger patty',
        quantity: 1,
        unit: 'unit',
      },
      {
        name: 'burger bun',
        quantity: 1,
        unit: 'unit',
      },
    ],
  },
];

export class RecipePage extends React.PureComponent {
  render() {
    return (
      <div>
        <Helmet>
          <title>RecipePage</title>
          <meta name="description" content="Description of RecipePage" />
        </Helmet>

        {/* <FormattedMessage {...messages.header} /> */}
        <h2>Recipe Page</h2>
        <div>
          Showing recipes for:
          <Dropdown
            placeholder="Select Restaurant"
            selection
            options={restaurantList}
          />
        </div>
        <div>
          <List>
            <b>{recipeList[0].name}</b><br />
            Description: {recipeList[0].description} <br />
            Ingredients:
            <List.Item>
              {recipeList[0].ingredients[0].name}: &nbsp;
              {recipeList[0].ingredients[0].quantity} &nbsp;
              {recipeList[0].ingredients[0].unit}
            </List.Item>
            <List.Item>
              {recipeList[0].ingredients[1].name}: &nbsp;
              {recipeList[0].ingredients[1].quantity} &nbsp;
              {recipeList[0].ingredients[1].unit}
            </List.Item>
          </List>

          <List>
            <b>{recipeList[1].name}</b> <br />
            Description: {recipeList[1].description} <br />
            Ingredients1
            <List.Item>
              {recipeList[1].ingredients[0].name}: &nbsp;
              {recipeList[1].ingredients[0].quantity} &nbsp;
              {recipeList[1].ingredients[0].unit}
            </List.Item>
            <List.Item>
              {recipeList[1].ingredients[1].name}: &nbsp;
              {recipeList[1].ingredients[1].quantity} &nbsp;
              {recipeList[1].ingredients[1].unit}
            </List.Item>
          </List>
        </div>
      </div>
    );
  }
}

RecipePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  recipePage: makeSelectRecipePage(),
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

const withReducer = injectReducer({ key: 'recipePage', reducer });
const withSaga = injectSaga({ key: 'recipePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(RecipePage);
