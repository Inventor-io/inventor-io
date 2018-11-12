/**
 *
 * Inventory
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import axios from 'axios';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectInventory from './selectors';
import reducer from './reducer';
import saga from './saga';

import Table from '../../components/InventoryTable';

/* eslint-disable react/prefer-stateless-function */

export class Inventory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inventoryList: [],
    };
  }

  componentDidMount() {
    axios.get('/api/inventory').then(res => {
      this.setState({ inventoryList: res.data });
    });
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Inventory</title>
          <meta name="description" content="Description of Inventory" />
        </Helmet>

        <h1>Inventory List</h1>
        <Table data={this.state.inventoryList} />
      </div>
    );
  }
}

// get to later
// Inventory.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };

const mapStateToProps = createStructuredSelector({
  inventory: makeSelectInventory(),
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

const withReducer = injectReducer({ key: 'inventory', reducer });
const withSaga = injectSaga({ key: 'inventory', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Inventory);
