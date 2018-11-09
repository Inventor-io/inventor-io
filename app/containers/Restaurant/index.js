/**
 *
 * Restaurant
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
// import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

// import {makeSelectRestaurant} from 'containers/App/selectors';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { Input } from 'semantic-ui-react';
// import makeSelectRestaurant from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { updateAddress, updateName, updateNumber } from './actions';

/* eslint-disable react/prefer-stateless-function */
export class Restaurant extends React.Component {
  render() {
    // const item = state => state.resName;
    // console.log(item);
    // console.log('Restaurant store', restaurant);
    return (
      <div>
        <FormattedMessage {...messages.header} />
        <Input
          value={this.props.name}
          onChange={this.props.onChangeName}
          size="large"
          placeholder="Name"
        />
        <br />
        <Input
          value={this.props.address}
          onChange={this.props.onChangeAddress}
          size="large"
          placeholder="Address"
        />
        <br />
        <Input
          value={this.props.number}
          onChange={this.props.onChangeNumber}
          size="large"
          placeholder="Phone Number"
        />
      </div>
    );
  }
}

Restaurant.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  onChangeName: PropTypes.func,
  onChangeAddress: PropTypes.func,
  onChangeNumber: PropTypes.func,
};

const mapStateToProps = state => ({ restaurant: state.restaurant });
// const mapStateToProps = createStructuredSelector({
//   restaurant: makeSelectRestaurant(),
// });

function mapDispatchToProps(dispatch) {
  return {
    onChangeName: e => dispatch(updateName(e.target.value)),
    onChangeAddress: e => dispatch(updateAddress(e.target.value)),
    onChangeNumber: e => dispatch(updateNumber(e.target.value)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'restaurant', reducer });
const withSaga = injectSaga({ key: 'restaurant', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Restaurant);
