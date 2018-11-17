/**
 *
 * AddRecipePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Input, Button } from 'semantic-ui-react';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectRecName, makeSelectRecDescription } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { updateName, updateDescription } from './actions';
// import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class AddRecipePage extends React.PureComponent {
  render() {
    return (
      <div>
        <Helmet>
          <title>AddRecipePage</title>
          <meta name="description" content="Description of AddRecipePage" />
        </Helmet>
        {/* <FormattedMessage {...messages.header} /> */}
        <div>
          <form onSubmit={() => console.log('filler onSubmit')}>
            <Input
              value={this.props.name}
              onChange={this.props.onChangeName}
              size="large"
              placeholder="Name"
            />
            <br />
            <Input
              value={this.props.description}
              onChange={this.props.onChangeDescription}
              size="large"
              placeholder="Description"
            />
            {/* <br />
            <Input
              value={this.props.number}
              onChange={this.props.onChangeNumber}
              size="large"
              placeholder="INGREDIENTS"
            /> */}
            <Button
              content="Submit"
              onClick={() => console.log('Submitted?')}
            />
          </form>
        </div>
      </div>
    );
  }
}

AddRecipePage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  onChangeName: PropTypes.func,
  onChangeDescription: PropTypes.func,
  // onChangeNumber: PropTypes.func,
  // onSubmitForm: PropTypes.func, USE ME TO SEND DATA TO DB
  name: PropTypes.any,
  description: PropTypes.any,
  // number: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  // addRecipePage: makeSelectAddRecipePage(),
  recName: makeSelectRecName,
  recDescription: makeSelectRecDescription,
});

function mapDispatchToProps(dispatch) {
  return {
    onChangeName: e => {
      console.log('name target value', e.target.value);
      dispatch(updateName(e.target.value));
    },
    onChangeDescription: e => dispatch(updateDescription(e.target.value)),
    // onChangeNumber: e => dispatch(updateNumber(e.target.value)),
    onSubmitForm: e => {
      e.preventDefault();
      console.log('FORM SENT PLACEHOLDER');
      // dispatch(/*sendForm()*/);
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
