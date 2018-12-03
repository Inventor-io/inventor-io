/**
 *
 * AddRecipePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import QueryString from 'query-string';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Header, Input, Button, Container, Modal } from 'semantic-ui-react';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import NavBar from 'containers/NavBar/Loadable';
import AddIngredients from '../AddIngredients';
import {
  makeSelectRecName,
  makeSelectRecPrice,
  makeSelectRecId,
  makeSelectIngredientsList,
  makeSelectModalState,
  // makeSelectRecDescription,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  updateId,
  updateName,
  updatePrice,
  // updateDescription,
  getIngredientsList,
  updateIngredientsList,
  sendForm,
  deleteIngredient,
  updateModalState,
  updateIngredientAmount,
} from './actions';
import history from '../../utils/history';
import IngredientsTable from '../../components/IngredientsTable';

/* eslint-disable react/prefer-stateless-function */

export class AddRecipePage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.props.changeModal(false);
    if (this.props.location.search) {
      this.state = { showCreateModal: false };
      const params = QueryString.parse(this.props.location.search);
      // console.log('PARAMS', params);
      this.props.changeId(params.id);
      this.props.changeName(params.name);
      this.props.changePrice(params.price); // mjw - Combine. Now causes 3 renders.
      this.props.getIngredients();
    } else if (this.props.recName) {
      this.state = { showCreateModal: true };
      // console.log('CLEARING PARAMS');
      this.props.changeId(null);
      this.props.changeName('');
      this.props.changePrice(''); // mjw - Combine. Now causes 3 renders.
      this.props.changeIngredientList([]); // mjw - selector ingredient array is ingredients.ingredients
    }
    this.toggleCreateModal = this.toggleCreateModal.bind(this);
  }

  toggleCreateModal() {
    this.setState(prevState => ({
      showCreateModal: !prevState.showCreateModal,
    }));
  }

  render() {
    console.log('ADD REC PROPS', this.props);
    console.log('ADD REC STATE', this.state);
    return (
      <div>
        <Helmet>
          <title>AddRecipePage</title>
          <meta name="description" content="Description of AddRecipePage" />
        </Helmet>
        <NavBar />
        <Container>
          {/* <FormattedMessage {...messages.header} /> */}
          {!this.props.location.search ? (
            <div>
              <Header as="h1">Name your recipe:</Header>
              <Input
                value={this.props.recName}
                onChange={e => this.props.changeName(e.target.value)}
                size="large"
                placeholder="Name"
              />
              <br />
              <Input
                value={this.props.recPrice}
                onChange={e => this.props.changePrice(e.target.value)}
                size="large"
                placeholder="Price"
              />
              <br />
              <Button
                content="Cancel"
                onClick={() => history.push('/recipe')}
              />
              <Button
                content="Submit"
                onClick={() => {
                  if (
                    this.props.recName !== '' &&
                    (!this.props.ingredientsList ||
                      this.props.ingredientsList.every(
                        row => row.name !== this.props.recName,
                      ))
                  ) {
                    console.log('NEW NAME');
                    this.props.onSubmitForm();
                  }
                }}
              />
            </div>
          ) : (
            <div>
              <Header as="h1">Edit Recipe: {this.props.recName} </Header>
              <IngredientsTable
                changeIngredientsList={newList =>
                  this.props.changeIngredientList(newList)
                }
                modalState={this.props.modalState}
                changeModal={this.props.changeModal}
                recipeID={this.props.recId}
                changeIngredientList={this.props.changeIngredientList}
                ingredientsList={this.props.ingredientsList}
                removeIngredient={this.props.removeIngredient}
                changeIngredientAmount={this.props.changeIngredientAmount}
              />
              <Button
                content="Add an ingredient"
                color="green"
                onClick={() => this.props.changeModal(true)}
              />
            </div>
          )}
          <br />
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
                      current.every(oldItem => oldItem.ndbno !== newItem.ndbno),
                    )
                    .map(item => ({
                      recipe_id: this.props.recId,
                      inventory_name: item.inventory_name,
                      ndbno: String(item.ndbno),
                      measurement: 0,
                    }));
                  console.log('Filtered new list:', filtered);
                  console.log('New list', current.concat(filtered));
                  this.props.changeIngredientList(current.concat(filtered));
                  this.props.changeModal(false);
                }}
              />
            </Modal.Content>
          </Modal>
        </Container>
      </div>
    );
  }
}

// AddDescription (Possible addition)
/* <br />
<Input
value={this.props.description}
onChange={this.props.onChangeDescription}
size="large"
placeholder="Description"
/> */

AddRecipePage.propTypes = {
  changeId: PropTypes.func,
  changeName: PropTypes.func,
  // onChangeDescription: PropTypes.func,
  changePrice: PropTypes.func,
  changeIngredientList: PropTypes.func,
  changeModal: PropTypes.func,
  changeIngredientAmount: PropTypes.func,
  removeIngredient: PropTypes.func,
  onSubmitForm: PropTypes.func,
  recId: PropTypes.any,
  recName: PropTypes.any,
  recPrice: PropTypes.any,
  getIngredients: PropTypes.func,
  ingredientsList: PropTypes.any,
  modalState: PropTypes.bool,
  // description: PropTypes.any,
  location: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  // addRecipePage: makeSelectAddRecipePage()
  recName: makeSelectRecName(),
  recPrice: makeSelectRecPrice(),
  recId: makeSelectRecId(),
  ingredientsList: makeSelectIngredientsList(),
  modalState: makeSelectModalState(),
  // recDescription: makeSelectRecDescription,
});

function mapDispatchToProps(dispatch) {
  return {
    getIngredients: () => dispatch(getIngredientsList()),
    changeId: newId => dispatch(updateId(newId)),
    changeName: newName => dispatch(updateName(newName)),
    changePrice: newPrice => dispatch(updatePrice(newPrice)),
    changeModal: newState => dispatch(updateModalState(newState)),
    // send update of amount to database
    changeIngredientAmount: (recipeID, ndbno, newAmount) => {
      console.log('CHANGE INGREDIENT TRIGGERED');
      dispatch(updateIngredientAmount(recipeID, ndbno, newAmount));
    },
    removeIngredient: (recipeID, ndbno) => {
      console.log('Dispatched deleteIngredient for');
      console.log('recipeID', recipeID, 'ndbno', ndbno);
      dispatch(deleteIngredient(recipeID, ndbno));
    },
    // onChangeDescription: e => dispatch(updateDescription(e.target.value)),
    changeIngredientList: newList => dispatch(updateIngredientsList(newList)),
    onSubmitForm: () => {
      console.log('sendForm dispatched!');
      dispatch(sendForm());
      history.push(
        '/recipe',
        // `/editRecipe?id=${this.props.recId}&name=${this.props.recName}&price=${
        //   this.props.recPrice
        // }`,
      );
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'addRecipePage', reducer });
const withSaga = injectSaga({ key: 'addRecipePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AddRecipePage);
