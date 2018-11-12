/**
 *
 * SignupPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectSignupPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class SignupPage extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>SignupPage</title>
          <meta name="description" content="Description of SignupPage" />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

SignupPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  signupPage: makeSelectSignupPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'signupPage', reducer });
const withSaga = injectSaga({ key: 'signupPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SignupPage);
