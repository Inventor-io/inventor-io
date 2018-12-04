/**
 *
 * LandingPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import FacebookLogin from 'react-facebook-login';
import injectReducer from 'utils/injectReducer';
import makeSelectLandingPage from './selectors';
import { setUsername } from './actions';
import reducer from './reducer';
import history from '../../utils/history';
import TopLeft from './styled/Image1';
import TopRight from './styled/Image2';
import BottomLeft from './styled/Image3';
import BottomRight from './styled/Image4';
import Logo from './styled/Header';
import Nik from './styled/Nik';
import Yirey from './styled/Yirey';
import John from './styled/John';
import Micah from './styled/Micah';
/* eslint-disable react/prefer-stateless-function */
export class LandingPage extends React.Component {
  render() {
    return (
      <div className="background">
        <div className="gradient"> </div>
        <div className="landing">
          <Logo>Inventorio</Logo>
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
        </div>
        <div className="people">
          <div className="top-right-people center">
            This is the cool description of Micah
          </div>
          <Micah />
          <div className="middle-left-people center">Hi this is Nik</div>
          <Nik />
          <div className="middle-right-people center">
            This one is for Yirey
          </div>
          <Yirey />
          <div className="bottom-left-people center">
            {' '}
            This is for John. He is ok
          </div>
          <John />
        </div>
        <div className="tour">
          <div className="background-tour" />
          <div className="recipe-graph center">Recipes Graph</div>
          <div className="recipe-desc center">Recipes Description</div>
          <div className="inventory-graph center">Inventory Graph</div>
          <div className="inventory-desc center">Inventory Description</div>
          <div className="sales-graph center">Sales Graph</div>
          <div className="sales-desc center">Sales Description</div>
        </div>
        <div className="contact">Contact Us</div>
      </div>
    );
  }
}

LandingPage.propTypes = {
  responseFacebook: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectLandingPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    responseFacebook: response => {
      localStorage.setItem('userId', response.id);
      localStorage.setItem('username', response.name);
      dispatch(setUsername(response));
      if (localStorage.getItem('username') !== 'undefined') {
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
