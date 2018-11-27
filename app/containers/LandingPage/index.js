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
import FacebookLogin from 'react-facebook-login';
import injectReducer from 'utils/injectReducer';
import makeSelectLandingPage from './selectors';
import { setUsername } from './actions';
import { logout } from '../LoginPage/actions';
import reducer from './reducer';
import messages from './messages';
import history from '../../utils/history';

/* eslint-disable react/prefer-stateless-function */
export class LandingPage extends React.Component {
  render() {
    return (
      <div>
        <FormattedMessage {...messages.header} />{' '}
        <div>
          <div>
            <FacebookLogin
              appId="119762035585891"
              fields="name,email,picture"
              callback={this.props.responseFacebook}
            />
          </div>
        </div>
      </div>
    );
  }
}

LandingPage.propTypes = {
  responseFacebook: PropTypes.func,
  logoutClick: PropTypes.func,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectLandingPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    responseFacebook: response => {
      sessionStorage.setItem('username', response.name);
      dispatch(setUsername(response));
      if (sessionStorage.getItem('username') !== 'undefined') {
        history.push('/restaurant');
      }
    },
    logoutClick: e => {
      e.preventDefault();
      sessionStorage.clear();
      dispatch(logout());
      history.push('/home');
    },
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
