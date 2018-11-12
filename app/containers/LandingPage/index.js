/**
 *
 * LandingPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import makeSelectLandingPage from './selectors';
import reducer from './reducer';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class LandingPage extends React.Component {
  render() {
    return (
      <div>
        <FormattedMessage {...messages.header} />{' '}
      </div>
    );
  }
}

LandingPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  landingPage: makeSelectLandingPage(),
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

const withReducer = injectReducer({
  key: 'landingPage',
  reducer,
});

export default compose(
  withReducer,
  withConnect,
)(LandingPage);
