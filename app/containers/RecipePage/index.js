/**
 *
 * RecipePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import 'semantic-ui-css/semantic.min.css'; // TODO - mjw - FIX ME
import { Dropdown, Button } from 'semantic-ui-react';
import {
  // makeSelectRecipePage,
  // selectRecipePageDomain,
  makeSelectRecipeList,
} from './selectors';

import reducer from './reducer';
import saga from './saga';
import { getRecipes } from './actions';
import history from '../../utils/history';
import RecipeTable from '../../components/RecipeTable';
// import messages from './messages';

// For RestaurantList Dropdown
import makeSelectRestaurantList from '../RestaurantList/selectors';
import makeSelectRestaurantId from '../RestaurantDashboard/selectors';

/* eslint-disable react/prefer-stateless-function */

export class RecipePage extends React.PureComponent {
  render() {
    const restaurants = this.props.restaurantList.restaurants.map(
      restaurant => ({
        text: restaurant.restaurants_name,
        value: restaurant.id,
      }),
    );
    // console.log('RESTAURANTS', restaurants);
    return (
      <div>
        <Helmet>
          <title>RecipePage</title>
          <meta name="description" content="Description of RecipePage" />
        </Helmet>

        {/* <FormattedMessage {...messages.header} /> */}
        <h2>Recipe Page</h2>
        <div>
          <Button
            content="TEST recipe get"
            onClick={this.props.getRecipeList}
          />
          Showing recipes for:
          <Dropdown
            placeholder="Select Restaurant"
            selection
            options={restaurants}
            onChange={(trash, target) => console.log(target.value)}
          />
          <Button
            content="Add a new recipe"
            onClick={() => history.push('/addRecipe')}
          />
          <RecipeTable recipeList={this.props.recipeList} />
        </div>
      </div>
    );
  }
}
//
RecipePage.propTypes = {
  restaurantList: PropTypes.any,
  recipeList: PropTypes.array,
  getRecipeList: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  // recipePage: makeSelectRecipePage(),
  restaurantList: makeSelectRestaurantList(),
  selectedRestaurant: makeSelectRestaurantId(),
  recipeList: makeSelectRecipeList(),
});

function mapDispatchToProps(dispatch) {
  return {
    getRecipeList: () => dispatch(getRecipes()),
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
