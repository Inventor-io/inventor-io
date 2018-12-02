/**
 *
 * IngredientsTable
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import { Table, Button, Icon, Input, Modal } from 'semantic-ui-react';
import AddIngredients from '../../containers/AddIngredients';
// import history from '../../utils/history';

/* eslint-disable react/prefer-stateless-function */
/* eslint-enable */
class IngredientsTable extends React.PureComponent {
  render() {
    console.log('INGREDIENTS TABLE PROPS:', this.props);
    return (
      <div>
        <Table unstackable white-space="no-wrap">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Ingredient</Table.HeaderCell>
              <Table.HeaderCell>NDBNO</Table.HeaderCell>
              <Table.HeaderCell>Quantity</Table.HeaderCell>
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.props.ingredientsList && this.props.ingredientsList.length ? (
              this.props.ingredientsList.map(row => (
                <Table.Row key={row.ndbno}>
                  <Table.Cell>{row.inventory_name}</Table.Cell>
                  <Table.Cell>{row.ndbno}</Table.Cell>
                  <Table.Cell>
                    <Input defaultValue={row.measurement} />
                  </Table.Cell>
                  <Table.Cell width="3">
                    <Button icon size="tiny">
                      <Icon name="edit alternate" />
                    </Button>
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
            <Table.Footer>
              <Table.Row>
                <Button
                  content="Add an ingredient"
                  color="green"
                  onClick={() => this.props.changeModal(true)}
                />
                <Modal
                  open={this.props.modalState}
                  onClose={() => this.props.changeModal(false)}
                >
                  <Modal.Content>
                    <AddIngredients
                      close={() => this.props.changeModal(false)}
                      importList={newItems => {
                        const current = this.props.ingredientsList
                          ? this.props.ingredientsList
                          : [];
                        console.log('Current ingredients', current);
                        const filtered = newItems
                          .filter(newItem =>
                            current.every(
                              oldItem => oldItem.ndbno !== newItem.ndbno,
                            ),
                          )
                          .map(item => ({
                            recipe_id: this.props.recipeID,
                            inventory_name: item.inventory_name,
                            ndbno: String(item.ndbno),
                            measurement: 0,
                          }));
                        console.log('Filtered new list:', filtered);
                        console.log('New list', current.concat(filtered));
                        this.props.changeIngredientList(
                          current.concat(filtered),
                        );
                        this.props.changeModal(false);
                      }}
                    />
                  </Modal.Content>
                </Modal>
              </Table.Row>
            </Table.Footer>
          </Table.Body>
        </Table>
      </div>
    );
  }
}

IngredientsTable.propTypes = {
  ingredientsList: PropTypes.object,
  removeIngredient: PropTypes.func,
  modalState: PropTypes.bool,
  changeModal: PropTypes.func,
  changeIngredientList: PropTypes.func,
  recipeID: PropTypes.number,
};

export default IngredientsTable;
