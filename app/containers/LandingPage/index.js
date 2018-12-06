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
import Graph1 from './styled/Graph1';
import Graph2 from './styled/Graph2';
import Logo from './styled/Header';
import Nik from './styled/Nik';
import Yirey from './styled/Yirey';
import John from './styled/John';
import Micah from './styled/Micah';
/* eslint-disable react/prefer-stateless-function */
function smoothscroll() {
  const currentScroll =
    document.documentElement.scrollTop || document.body.scrollTop;
  if (currentScroll > 0) {
    window.requestAnimationFrame(smoothscroll);
    window.scrollTo(0, currentScroll - currentScroll / 10);
  }
}
export class LandingPage extends React.Component {
  render() {
    return (
      <div className="background">
        <div className="gradient"> </div>
        <div className="landing">
          <div className="login" name="top">
            <FacebookLogin
              appId="119762035585891"
              fields="name,email,picture"
              callback={this.props.responseFacebook}
            />
          </div>
          <TopLeft />
          <TopRight />
          <Logo>Inventorio</Logo>
          <BottomLeft>
            <i className="fas fa-angle-double-down landing-icon" />
          </BottomLeft>
          <BottomRight />
        </div>
        <div className="people">
          <div className="top-right-people center big">
            Micah (on the right) is a math-teacher-turned-software-engineer.
            With 4 years in STEM fields, he creates technical solutions with a
            focus on human context.
            <br />
            <br />
            <a className="small" href="http://www.woodswebandphoto.com">
              Photo: Woods Web and Photo
            </a>
          </div>

          <Micah />
          <div className="middle-left-people center big">
            Nik is a former chef who enjoys creating wonderful new recipes. As a
            full-stack software engineer, he enjoys sovling problems that affect
            daily life.
          </div>
          <Nik />
          <div className="middle-right-people center big">
            A full-stack engineer, fluent in all stacks. Loves clean code,
            building apps, fast-paced environments, and challenges. Comes
            equipped with python and machine learning experience. Note: Puppies
            are fatal weakness.
          </div>
          <Yirey />
          <div className="bottom-left-people center big">
            {' '}
            Hi, {`I'm`} John <br />
            <br />
            {`I'm`} interested in full system architectures from full stack
            application engineering to deployment and continuous integration
            systems. <br />
            <br />I like having a hand in every part of the stack and
            understanding how everything works as a whole and
            understanding/knowing the vision for what a finalized product ought
            to look like.
            <br /> <br />I enjoy complex problems and solving them with elegant
            solutions.
          </div>
          <John />
        </div>
        <div className="tour">
          <div className="background-tour" />
          <Graph1 className="bigger-logo">Cost and Revenue Charts</Graph1>
          <div className="recipe-desc center bigger">
            Our constantly updating charts will keep you up to date with every
            change in price! Optimize your menu with our profit maximizing
            algorithms
          </div>
          <Graph2 className="bigger-logo">Inventory Graphs</Graph2>
          <div className="inventory-desc center bigger">
            Our inventory graphs will constantly update with deliveries in real
            time making managing your stock a breeze. Craft your specials with
            knowledge of ingredients on hand.
          </div>
        </div>
        <div className="big-icon">
          {/* eslint-disable */}
          <i
            className="fas fa-angle-double-up up-arrow"
            onClick={smoothscroll}
          />
          {/* eslint-enable */}
        </div>
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
