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
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
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
          <Link to="/inventory">Inventory</Link>
          <br />
          <Link to="/recipe">Recipes</Link>
          <br />
          <Link to="/restaurant">Restaurant</Link>
        </div>
        <div>
          <Button onClick={this.props.logoutClick} content="Logout" />
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
      history.push('/restaurant');
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
