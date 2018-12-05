/**
 *
 * NavBar
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Menu } from 'semantic-ui-react';

import injectReducer from 'utils/injectReducer';
import history from '../../utils/history';
import makeSelectNavBar from './selectors';
import reducer from './reducer';

/* eslint-disable react/prefer-stateless-function */
export class NavBar extends React.Component {
  state = {};

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    history.push(`/${name}`);
  };

  logoutClick = () => {
    localStorage.clear();
    if (typeof FB === 'object') {
      window.FB.logout();
    }
    history.push('/');
  };

  render() {
    const { activeItem } = this.state;
    return (
      <div>
        <Helmet>
          <title>NavBar</title>
          <meta name="description" content="Description of NavBar" />
        </Helmet>
        <Menu>
          {!this.props.restaurant ? (
            <React.Fragment>
              <Menu.Item
                name="restaurant"
                // content="Home"
                icon="home"
                active={activeItem === 'restaurant'}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name="dashboard"
                active={activeItem === 'dashboard'}
                content="Dashboard"
                onClick={this.handleItemClick}
              />

              <Menu.Item
                name="recipe"
                active={activeItem === 'recipe'}
                content="Recipes"
                onClick={this.handleItemClick}
              />

              <Menu.Item
                name="inventory"
                active={activeItem === 'inventory'}
                content="Inventory"
                onClick={this.handleItemClick}
              />

              <Menu.Item
                name="addInventory"
                active={activeItem === 'addInventory'}
                content="Add Inventory"
                onClick={this.handleItemClick}
              />

              <Menu.Item
                name="purchaseComplete"
                active={activeItem === 'purchaseComplete'}
                content="My Purchases"
                onClick={this.handleItemClick}
              />

              <Menu.Item
                name="sales"
                active={activeItem === 'sales'}
                content="Sales"
                onClick={this.handleItemClick}
              />
            </React.Fragment>
          ) : null}

          <Menu.Menu position="right">
            <Menu.Item
              name="logout"
              active={activeItem === 'logout'}
              onClick={this.logoutClick}
            />
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}

NavBar.propTypes = {
  restaurant: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  navBar: makeSelectNavBar(),
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

const withReducer = injectReducer({ key: 'navBar', reducer });

export default compose(
  withReducer,
  withConnect,
)(NavBar);
