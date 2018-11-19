/**
 *
 * Inventory
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
// import { Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectInventory } from './selectors';
import { getInventory } from './actions';
import reducer from './reducer';
import saga from './saga';

// import Table from '../../components/InventoryTable';

/* eslint-disable react/prefer-stateless-function */

export class Inventory extends React.Component {
  // constructor(props) {

  componentDidMount() {
    this.props.mountData();
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Inventory</title>
          <meta name="description" content="Description of Inventory" />
        </Helmet>

        <h1>Inventory List</h1>

        <table>
          <thead>
            <tr>
              {this.props.currentInventory ? (
                Object.keys(this.props.currentInventory[0]).map((key, i) => (
                  <th key={i.toString()}>{key}</th>
                ))
              ) : (
                <th />
              )}
            </tr>
          </thead>

          <tbody>
            {this.props.currentInventory ? (
              this.props.currentInventory.map((obj, e) => {
                const rowData = Object.keys(obj).map((key, i) => {
                  let val;
                  if (key === 'Selected') {
                    val = obj[key] ? 'selected' : 'unselected';
                  } else {
                    val = obj[key];
                  }
                  return <td key={i.toString()}>{val}</td>;
                });
                return <tr key={e.toString()}>{rowData}</tr>;
              })
            ) : (
              <tr />
            )}
          </tbody>
        </table>

        {/* <Button content="Place order" onClick={this.props.handleOrder} /> */}
      </div>
    );
  }
}

Inventory.propTypes = {
  // functions
  mountData: PropTypes.func,
  // states
  currentInventory: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  currentInventory: makeSelectInventory(),
});

function mapDispatchToProps(dispatch) {
  return {
    mountData: () => dispatch(getInventory()),
  };
}

// TODO: dont worry about here
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'inventory', reducer });
const withSaga = injectSaga({ key: 'inventory', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Inventory);
