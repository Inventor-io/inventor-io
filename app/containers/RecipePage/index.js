/**
 *
 * RecipePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectRecipePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import RecipeDropdown from '../../components/RecipeDropdown/Loadable';// mjw

/* eslint-disable react/prefer-stateless-function */
export class RecipePage extends React.PureComponent {
  render() {
    return (
      <div>
        <Helmet>
          <title>RecipePage</title>
          <meta name="description" content="Description of RecipePage" />
        </Helmet>
        <FormattedMessage {...messages.header} />
        <div>
          Select a restaurant: <RecipeDropdown />
        </div>
      </div>
    );
  }
}

RecipePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  recipePage: makeSelectRecipePage(),
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

const withReducer = injectReducer({ key: 'recipePage', reducer });
const withSaga = injectSaga({ key: 'recipePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(RecipePage);
