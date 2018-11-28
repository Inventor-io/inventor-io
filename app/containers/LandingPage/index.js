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
import reducer from './reducer';
import messages from './messages';
import history from '../../utils/history';
import TopLeft from './Image1';
import TopRight from './Image2';
import BottomLeft from './Image3';
import BottomRight from './Image4';

/* eslint-disable react/prefer-stateless-function */
export class LandingPage extends React.Component {
  render() {
    return (
      <div className="landing">
        <FormattedMessage {...messages.header} />{' '}
        <div className="login">
          <FacebookLogin
            appId="119762035585891"
            fields="name,email,picture"
            callback={this.props.responseFacebook}
          />
        </div>
        <TopLeft />
        <TopRight />
        <BottomLeft />
        <BottomRight />
        <div className="people">people</div>
        <div className="tour">tour</div>
        <div className="contact">contact</div>
      </div>
    );
  }
}

LandingPage.propTypes = {
  responseFacebook: PropTypes.func,
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
