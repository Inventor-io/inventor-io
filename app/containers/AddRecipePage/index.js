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
import { Input, Button } from 'semantic-ui-react';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
  makeSelectRecName,
  makeSelectRecPrice,
  makeSelectRecId,
  makeSelectIngredientsList,
  // makeSelectRecDescription,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  updateName,
  updatePrice,
  updateId,
  getIngredientsList,
  // updateDescription,
  sendForm,
} from './actions';
import IngredientsTable from '../../components/IngredientsTable';

/* eslint-disable react/prefer-stateless-function */

export class AddRecipePage extends React.PureComponent {
  constructor(props) {
    super(props);
    if (this.props.location.search) {
      const params = QueryString.parse(this.props.location.search);
      console.log('PARAMS', params);
      this.props.changeId(params.id);
      this.props.changeName(params.name);
      this.props.changePrice(params.price); // mjw - Combine. Now causes 3 renders.
      this.props.getIngredients();
    }
  }

  render() {
    console.log(`Look I'm using recId ${this.props.recId}`);
    return (
      <div>
        <Helmet>
          <title>AddRecipePage</title>
          <meta name="description" content="Description of AddRecipePage" />
        </Helmet>
        {/* <FormattedMessage {...messages.header} /> */}
        <div>
          {/* <form onSubmit={() => console.log('filler onSubmit')}> */}
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
          {/* <br />
            <Input
              value={this.props.description}
              onChange={this.props.onChangeDescription}
              size="large"
              placeholder="Description"
            /> */}
          <Button content="Submit" onClick={this.props.onSubmitForm} />
          <br />
          <IngredientsTable
            ingredientsList={this.props.ingredientsList.ingredientsList}
          />
        </div>
      </div>
    );
  }
}

AddRecipePage.propTypes = {
  changeId: PropTypes.func,
  changeName: PropTypes.func,
  // onChangeDescription: PropTypes.func,
  changePrice: PropTypes.func,
  onSubmitForm: PropTypes.func,
  recId: PropTypes.any,
  recName: PropTypes.any,
  recPrice: PropTypes.any,
  getIngredients: PropTypes.func.isRequired,
  ingredientsList: PropTypes.object,
  // description: PropTypes.any,
  location: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  // addRecipePage: makeSelectAddRecipePage()
  recName: makeSelectRecName(),
  recPrice: makeSelectRecPrice(),
  recId: makeSelectRecId(),
  ingredientsList: makeSelectIngredientsList(),
  // recDescription: makeSelectRecDescription,
});

function mapDispatchToProps(dispatch) {
  return {
    getIngredients: () => {
      console.log('GET_INGREDIENTS dispatched!');
      dispatch(getIngredientsList());
    },
    changeId: newId => dispatch(updateId(newId)),
    changeName: newName => dispatch(updateName(newName)),
    changePrice: newPrice => dispatch(updatePrice(newPrice)),
    // onChangeDescription: e => dispatch(updateDescription(e.target.value)),
    onSubmitForm: e => {
      e.preventDefault();
      console.log('sendForm dispatched!');
      dispatch(sendForm());
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
