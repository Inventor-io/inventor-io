/**
 *
 * Restaurant
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { Input, Button } from 'semantic-ui-react';
import {
  makeSelectResAddress,
  makeSelectResName,
  makeSelectResNumber,
  makeSelectResWebsite,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import {
  updateAddress,
  updateName,
  updateNumber,
  sendForm,
  updateWebsite,
} from './actions';
import history from '../../utils/history';

/* eslint-disable react/prefer-stateless-function */
export class Restaurant extends React.Component {
  render() {
    return (
      <div>
        <form onSubmit={this.props.onSubmitForm}>
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
          <br />
          <Input
            value={this.props.number}
            onChange={this.props.onChangeWebsite}
            size="large"
            placeholder="Website"
          />
          <br />
          <Button content="Submit" onClick={this.props.onSubmitForm} />
        </form>
      </div>
    );
  }
}

Restaurant.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  onChangeName: PropTypes.func,
  onChangeAddress: PropTypes.func,
  onChangeNumber: PropTypes.func,
  onSubmitForm: PropTypes.func,
  onChangeWebsite: PropTypes.func,
  name: PropTypes.any,
  address: PropTypes.any,
  number: PropTypes.any,
};

// const mapStateToProps = state => ({ restaurant: state.restaurant });
const mapStateToProps = createStructuredSelector({
  resAddress: makeSelectResAddress,
  resName: makeSelectResName,
  resNumber: makeSelectResNumber,
  resWebsite: makeSelectResWebsite,
});

function mapDispatchToProps(dispatch) {
  return {
    onChangeName: e => dispatch(updateName(e.target.value)),
    onChangeAddress: e => dispatch(updateAddress(e.target.value)),
    onChangeNumber: e => dispatch(updateNumber(e.target.value)),
    onChangeWebsite: e => dispatch(updateWebsite(e.target.value)),
    onSubmitForm: e => {
      e.preventDefault();
      dispatch(sendForm());
      history.push('/restaurant');
    },
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
