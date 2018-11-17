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
import injectReducer from 'utils/injectReducer';
import makeSelectLandingPage from './selectors';
import makeSelectLoginPage from '../LoginPage/selectors';
import { logout } from '../LoginPage/actions';
import reducer from './reducer';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class LandingPage extends React.Component {
  render() {
    return (
      <div>
        <FormattedMessage {...messages.header} />{' '}
        <div>
          <Link to="/login">Login</Link>
          <br />
          <Link to="/inventory">Inventory</Link>
          <br />
          <Link to="/recipe">Recipes</Link>
          <br />
          <Link to="/restaurant">Restaurant</Link>
        </div>
        <div>
          <Button onClick={this.props.logoutClick} content="submit" />
        </div>
      </div>
    );
  }
}

LandingPage.propTypes = {
  logoutClick: PropTypes.func,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  landingPage: makeSelectLandingPage(),
  user: makeSelectLoginPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    logoutClick: e => {
      e.preventDefault();
      sessionStorage.clear();
      dispatch(logout());
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
