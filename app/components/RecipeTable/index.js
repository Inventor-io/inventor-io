/**
 *
 * RecipeTable
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
import { Table } from 'semantic-ui-react';
// import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
class RecipeTable extends React.PureComponent {
  render() {
    const { recipeList } = this.props.recipeList;
    console.log('RECIPE LIST', recipeList);
    return (
      <div>
        {/* <FormattedMessage {...messages.header} /> */}
        <Table unstackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
              <Table.HeaderCell>Left in Stock</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {recipeList && recipeList.length ? (
              recipeList.map(row => (
                <Table.Row>
                  <Table.Cell>{row.recipe_name}</Table.Cell>
                  <Table.Cell>{row.price}</Table.Cell>
                  <Table.Cell>TBD</Table.Cell>
                </Table.Row>
              ))
            ) : (
              <Table.Cell textAlign="center" colSpan="3">
                Please make a recipe
              </Table.Cell>
            )}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

RecipeTable.propTypes = {
  recipeList: PropTypes.array,
  // recipeList[recipeList] : PropTypes.any,
};

export default RecipeTable;
