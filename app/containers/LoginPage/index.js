/**
 *
 * LoginPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import FacebookLogin from 'react-facebook-login';
import makeSelectLoginPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { setUsername } from './actions';

/* eslint-disable react/prefer-stateless-function */
export class LoginPage extends React.Component {
  render() {
    if (this.props.user.name) {
      return <Redirect to="/restaurant" />;
    }

    return (
      <div>
        <Helmet>
          <title>LoginPage</title>
          <meta name="description" content="Description of LoginPage" />
        </Helmet>
        <div>
          <FacebookLogin
            appId="119762035585891"
            fields="name,email,picture"
            callback={this.props.responseFacebook}
          />
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  responseFacebook: PropTypes.func,
  user: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectLoginPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    responseFacebook: response => {
      sessionStorage.setItem('username', response.name);
      dispatch(setUsername(response));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'loginPage', reducer });
const withSaga = injectSaga({ key: 'loginPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(LoginPage);
