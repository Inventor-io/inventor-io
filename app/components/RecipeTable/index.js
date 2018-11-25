/**
 *
 * RecipeTable
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
import { Table, Button, Icon } from 'semantic-ui-react';
// import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
class RecipeTable extends React.PureComponent {
  render() {
    const { recipeList } = this.props.recipeList;
    console.log('RECIPE LIST', recipeList);
    return (
      <div>
        {/* <FormattedMessage {...messages.header} /> */}
        <Table unstackable="true" textAlign="right">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign="left">Name</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
              <Table.HeaderCell>Left in Stock</Table.HeaderCell>
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {recipeList && recipeList.length ? (
              recipeList.map(row => (
                <Table.Row key={row.recipe_id}>
                  <Table.Cell textAlign="left">{row.recipe_name}</Table.Cell>
                  <Table.Cell>${row.price.toFixed(2)}</Table.Cell>
                  <Table.Cell>TBD</Table.Cell>
                  <Table.Cell>
                    <Button
                      size="tiny"
                      icon
                      onClick={() => console.log('EDIT', row.recipe_id)}
                    >
                      <Icon name="edit" />
                    </Button>
                    {/* <Button
                      size="tiny"
                      icon
                      onClick={() => console.log('DELETE', row.recipe_id)}
                    >
                      <Icon name="trash" />
                    </Button> */}
                  </Table.Cell>
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell textAlign="center" colSpan="4">
                  Please make a recipe
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

RecipeTable.propTypes = {
  recipeList: PropTypes.object,
  // recipeList[recipeList] : PropTypes.any,
};

export default RecipeTable;
