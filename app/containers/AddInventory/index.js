/**
 *
 * AddInventory
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectAddInventory from './selectors';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class AddInventory extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>AddInventory</title>
          <meta name="description" content="Description of AddInventory" />
        </Helmet>

        <h1>Add an ingredient..!</h1>
      </div>
    );
  }
}

// AddInventory.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };

const mapStateToProps = createStructuredSelector({
  addInventory: makeSelectAddInventory(),
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

const withReducer = injectReducer({ key: 'addInventory', reducer });
const withSaga = injectSaga({ key: 'addInventory', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AddInventory);
