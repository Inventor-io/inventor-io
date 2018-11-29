/**
 *
 * PurchaseComplete
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Container, Header, Table, Divider, Segment } from 'semantic-ui-react';

import NavBar from 'containers/NavBar/Loadable';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectPurchaseComplete from './selectors';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class PurchaseComplete extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>PurchaseComplete</title>
          <meta name="description" content="Description of PurchaseComplete" />
        </Helmet>
        <NavBar />

        <Container>
          <Header as="h1">My Orders</Header>
          <Table unstackable>
            <Table.Header>
              <Table.Row>
                {['ndbno', 'Item', 'Orders', 'Price', 'Delivered'].map(key => (
                  <Table.HeaderCell>{key}</Table.HeaderCell>
                ))}
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {[
                {
                  ndbno: 1,
                  Item: 'apple',
                  Orders: 10,
                  Price: 320,
                  Delivered: false,
                },
              ].map((obj, i) => (
                <Table.Row key={i.toString()}>
                  {['ndbno', 'Item', 'Orders', 'Price', 'Delivered'].map(
                    key => {
                      if (key === 'Delivered') {
                        return (
                          <Table.Cell>
                            {obj.Delivered ? 'True' : 'False'}
                          </Table.Cell>
                        );
                      }
                      return <Table.Cell>{obj[key]}</Table.Cell>;
                    },
                  )}
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          <Divider />
          <Segment textAlign="right" size="huge">
            Total:
            {' $'}
            {/* eslint-disable */}
            {this.props.orderList
              ? this.props.orderList.reduce(
                  (prev, curr) => prev + curr.Price,
                  0,
                )
              : '0'}
            {/* eslint-enable */}
          </Segment>
        </Container>
      </div>
    );
  }
}

PurchaseComplete.propTypes = {
  orderList: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  purchaseComplete: makeSelectPurchaseComplete(),
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

const withReducer = injectReducer({ key: 'purchaseComplete', reducer });
const withSaga = injectSaga({ key: 'purchaseComplete', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PurchaseComplete);
