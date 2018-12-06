/**
 *
 * IngredientsTable
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import { Table, Button, Icon, Input } from 'semantic-ui-react';
// import AddIngredients from '../../containers/AddIngredients';
// import ToggledInput from '../ToggledInput';
// import history from '../../utils/history';

/* eslint-disable react/prefer-stateless-function */
/* eslint-enable */
class IngredientsTable extends React.PureComponent {
  render() {
    return (
      <div>
        <Table unstackable fixed selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width="6">Ingredient</Table.HeaderCell>
              <Table.HeaderCell width="2">NDBNO</Table.HeaderCell>
              <Table.HeaderCell width="4">Quantity</Table.HeaderCell>
              <Table.HeaderCell width="2" />
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.props.ingredientsList && this.props.ingredientsList.length ? (
              this.props.ingredientsList.map(row => (
                <Table.Row key={row.ndbno}>
                  <Table.Cell>{row.inventory_name}</Table.Cell>
                  <Table.Cell>{row.ndbno}</Table.Cell>
                  <Table.Cell>
                    {/* <ToggledInput
                      value={row.measurement}
                      startsLocked="true"
                      update={newMeasurement => {
                        this.props.changeIngredientAmount(
                          row.recipe_id,
                          row.ndbno,
                          newMeasurement,
                        );
                      }}
                    /> */}
                    <Input
                      value={row.measurement}
                      onChange={e => {
                        this.props.changeIngredientAmount(
                          row.recipe_id,
                          row.ndbno,
                          e.target.value,
                        );
                      }}
                    />
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    <Button
                      icon
                      size="tiny"
                      onClick={() =>
                        this.props.removeIngredient(
                          row.recipe_id,
                          row.ndbno,
                          this.props.ingredientsList,
                        )
                      }
                    >
                      <Icon name="trash alternate" />
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell textAlign="center" colSpan="3">
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
  // changeIngredientList: PropTypes.func,
  changeIngredientAmount: PropTypes.func,
  // recipeID: PropTypes.number,
};

export default IngredientsTable;
