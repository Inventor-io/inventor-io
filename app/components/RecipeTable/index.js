/**
 *
 * RecipeTable
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import { Table, Button, Icon, Modal } from 'semantic-ui-react';
import history from '../../utils/history';
/* eslint-disable react/prefer-stateless-function */
class RecipeTable extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { showDeleteModal: false, modalRow: null };
    this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
  }

  toggleDeleteModal(row) {
    this.setState(prevState => {
      if (prevState.showDeleteModal) {
        return { showDeleteModal: false, modalRow: null };
      }
      return { showDeleteModal: true, modalRow: row };
    });
  }

  render() {
    const { recipeList } = this.props.recipeList;
    return (
      <div>
        {/* <FormattedMessage {...messages.header} /> */}
        <Table unstackable textAlign="right">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign="left">Name</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
              {/* <Table.HeaderCell>Left in Stock</Table.HeaderCell> */}
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {recipeList && recipeList.length ? (
              recipeList.map(row => (
                <Table.Row key={row.recipe_id}>
                  <Table.Cell textAlign="left">{row.recipe_name}</Table.Cell>
                  <Table.Cell>${row.price.toFixed(2)}</Table.Cell>
                  {/* <Table.Cell>TBD</Table.Cell> */}
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
                    <Modal
                      trigger={
                        <Button
                          size="tiny"
                          icon
                          onClick={() => {
                            this.toggleDeleteModal(row);
                          }}
                        >
                          <Icon name="trash alternate" />
                        </Button>
                      }
                      open={this.state.showDeleteModal}
                    >
                      <Modal.Header>
                        Are you sure you want to delete &#34;
                        {this.state.modalRow
                          ? this.state.modalRow.recipe_name
                          : null}
                        &#34;?
                      </Modal.Header>
                      <Modal.Content>
                        <Button
                          content="Cancel"
                          onClick={this.toggleDeleteModal}
                        />
                        <Button
                          color="red"
                          content="Delete"
                          onClick={() => {
                            this.props.deleteRecipe(
                              this.state.modalRow.recipe_id,
                            );
                            this.toggleDeleteModal();
                          }}
                        />
                      </Modal.Content>
                    </Modal>
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
  deleteRecipe: PropTypes.func,
  recipeList: PropTypes.object,
  // recipeList[recipeList] : PropTypes.any,
};

export default RecipeTable;
