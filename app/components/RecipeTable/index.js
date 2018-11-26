/**
 *
 * RecipeTable
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import { Table, Button, Icon } from 'semantic-ui-react';
import history from '../../utils/history';
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
                      onClick={() =>
                        history.push(
                          `/editRecipe?id=${row.recipe_id}&name=${
                            row.recipe_name
                          }&price=${row.price}`,
                        )
                      }
                    >
                      <Icon name="edit" />
                    </Button>
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
