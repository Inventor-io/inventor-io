/**
 *
 * RecipeDropdown
 *
 */

import React from 'react';
import { Dropdown } from 'semantic-ui-react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

const restaurantList = [
  {
    text: 'All Restaurants',
    value: "All Restaurants",
  },
  {
    text: "El Ranchero",
    value: "El Ranchero",
  },
]

const RecipeDropdown = () => (
  <Dropdown
    placeholder="Select Restaurant"
    selection
    options={restaurantList}
  />
);

// RecipeDropdown.propTypes = {};

export default RecipeDropdown;
