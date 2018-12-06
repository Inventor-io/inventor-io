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
import {
  Header,
  Input,
  Button,
  Container,
  Modal,
  Label,
} from 'semantic-ui-react';
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
  applyRecChanges,
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
      this.props.changeId(params.id);
      this.props.changeName(params.name);
      this.props.changePrice(params.price); // mjw - Combine. Now causes 3 renders.
      this.props.getIngredients();
    } else if (this.props.recName) {
      this.state = { showCreateModal: true };
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
    const params = QueryString.parse(this.props.location.search);
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
                defaultValue=""
                // value={this.props.recName}
                onChange={e => this.props.changeName(e.target.value)}
                size="large"
                placeholder="Name"
              />
              <br />
              <Input
                // value={this.props.recPrice}
                defaultValue=""
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
                  if (this.props.recName === '') {
                    alert('Please enter a valid name.');
                  } else if (
                    Number.isNaN(this.props.recPrice) ||
                    this.props.recPrice === Infinity ||
                    this.props.recPrice < 0
                  ) {
                    alert('Please use a non-negative number for price');
                  } else {
                    this.props.onSubmitForm();
                  }
                }}
              />
            </div>
          ) : (
            <div>
              <Header as="h1">Edit Recipe: {this.props.recName} </Header>
              <Input labelPosition="right" type="text" placeholder="Amount">
                <Input
                  defaultValue={this.props.location ? params.price : 0}
                  // this.props.recPrice
                  //   ? parseFloat(this.props.recPrice).toFixed(2)
                  //   : 0

                  onChange={e => this.props.changePrice(e.target.value)}
                />
                <Label basic>$</Label>
              </Input>
              <div>
                <Button
                  content="Add an ingredient"
                  color="green"
                  onClick={() => this.props.changeModal(true)}
                  floated="right"
                />

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
                  content="Apply Changes"
                  color="green"
                  floated="right"
                  onClick={() => this.props.applyChanges()}
                />
              </div>
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
  applyChanges: PropTypes.func,
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
      dispatch(updateIngredientAmount(recipeID, ndbno, newAmount));
    },
    removeIngredient: (recipeID, ndbno) => {
      dispatch(deleteIngredient(recipeID, ndbno));
    },
    // onChangeDescription: e => dispatch(updateDescription(e.target.value)),
    changeIngredientList: newList => dispatch(updateIngredientsList(newList)),
    onSubmitForm: () => {
      dispatch(sendForm());
      // history.push(
      //   '/recipe',
      //   // `/editRecipe?id=${this.props.recId}&name=${this.props.recName}&price=${
      //   //   this.props.recPrice
      //   // }`,
      // );
    },
    applyChanges: () => dispatch(applyRecChanges()),
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
