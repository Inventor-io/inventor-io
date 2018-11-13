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
  makeSelectPhoto,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import {
  updateAddress,
  updateName,
  updateNumber,
  sendForm,
  // updatePhoto,
} from './actions';

/* eslint-disable react/prefer-stateless-function */
export class Restaurant extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedFile: null,
    };
    this.uploadHandler = this.uploadHandler.bind(this);
    this.fileChangeHandler = this.fileChangeHandler.bind(this);
  }

  fileChangeHandler(e) {
    const file = e.target.files[0];
    this.setState({ selectedFile: file });
  }

  uploadHandler() {
    console.log(this.state.selectedFile);
  }

  render() {
    // const item = state => state.resName;
    // console.log(item);
    // console.log('Restaurant store', restaurant);
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
          <Button content="Submit" onClick={this.props.onSubmitForm} />
          {/* <input type="file" onChange={this.props.fileChangeHandler} />
          <button onClick={this.props.uploadHandler}>Upload</button> */}
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
  name: PropTypes.any,
  address: PropTypes.any,
  number: PropTypes.any,
};

// const mapStateToProps = state => ({ restaurant: state.restaurant });
const mapStateToProps = createStructuredSelector({
  resAddress: makeSelectResAddress,
  resName: makeSelectResName,
  resNumber: makeSelectResNumber,
  photo: makeSelectPhoto,
});

function mapDispatchToProps(dispatch) {
  return {
    onChangeName: e => dispatch(updateName(e.target.value)),
    onChangeAddress: e => dispatch(updateAddress(e.target.value)),
    onChangeNumber: e => dispatch(updateNumber(e.target.value)),
    onSubmitForm: e => {
      e.preventDefault();
      dispatch(sendForm());
    },
    // fileChangeHandler: e => {
    //   console.log(e);
    //   const file = e.target.files[0];
    //   dispatch(updatePhoto(file));
    // },
    // uploadHandler: () => {
    //   dispatch(updatePhoto(this.props.photo));
    // },
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
