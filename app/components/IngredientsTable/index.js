/**
 *
 * IngredientsTable
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import { Table, Button, Icon } from 'semantic-ui-react';
// import history from '../../utils/history';

/* eslint-disable react/prefer-stateless-function */
class IngredientsTable extends React.PureComponent {
  render() {
    return (
      <div>
        <Table unstackable="true">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Ingredient (NDBNO)</Table.HeaderCell>
              <Table.HeaderCell>Quantity</Table.HeaderCell>
              {/* <Table.HeaderCell>Unit</Table.HeaderCell> */}
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.props.ingredientsList && this.props.ingredientsList.length ? (
              this.props.ingredientsList.map(row => (
                <Table.Row key={row.id}>
                  <Table.Cell>{row.ndbno}</Table.Cell>
                  <Table.Cell>{row.measurement}</Table.Cell>
                  {/* <Table.Cell>Cell</Table.Cell> */}
                  <Table.Cell>
                    <Button
                      icon
                      size="tiny"
                      onClick={() =>
                        this.props.removeIngredient(row.recipe_id, row.ndbno)
                      }
                    >
                      <Icon name="trash alternate" />
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell textAlign="center" colSpan="2">
                  Please add ingredients.
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

IngredientsTable.propTypes = {
  ingredientsList: PropTypes.object,
  removeIngredient: PropTypes.func,
};

export default IngredientsTable;
