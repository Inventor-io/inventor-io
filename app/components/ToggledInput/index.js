/**
 *
 * ToggledInput
 *
 */

import React from 'react';
import { Input, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
class ToggledInput extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { buttonShown: false, value: this.props.value };
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  open() {
    this.setState({
      buttonShown: true,
    });
  }

  close() {
    this.setState({
      buttonShown: false,
    });
  }

  handleChange(e) {
    const targetVal = e.target.value;
    this.setState({ value: targetVal });
  }

  render() {
    return (
      <div>
        <Input
          // defaultValue={this.props.value.toFixed(2)}
          onChange={this.handleChange}
          onClick={this.open}
        />
        {this.state.buttonShown && (
          <Button
            content="Submit"
            size="tiny"
            onClick={() => {
              const newMeasurement = this.state.value;
              if (
                !Number.isNaN(newMeasurement) &&
                newMeasurement >= 0 &&
                newMeasurement < Infinity
              ) {
                this.props.update(Number.parseFloat(newMeasurement));
                this.close();
              } else {
                alert('Please enter a non-negative number');
              }
            }}
          />
        )}
      </div>
    );
  }
}

ToggledInput.propTypes = {
  value: PropTypes.string,
  update: PropTypes.func,
};

export default ToggledInput;
