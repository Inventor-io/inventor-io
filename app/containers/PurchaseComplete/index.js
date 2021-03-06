/**
 *
 * PurchaseComplete
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Container, Header, Table, Button } from 'semantic-ui-react';

import NavBar from 'containers/NavBar/Loadable';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectPurchaseComplete from './selectors';
import { fetchOrders, itArrived } from './actions';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class PurchaseComplete extends React.Component {
  componentDidMount() {
    this.props.fetch();
  }

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
              <Table.Row key="header">
                {[
                  'ndbno',
                  'Item',
                  'Orders',
                  'Price',
                  'Date',
                  'Delivered',
                  'Arrived',
                ].map(key => (
                  <Table.HeaderCell key={`${key}`}>{key}</Table.HeaderCell>
                ))}
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.props.orderList ? (
                this.props.orderList.map((obj, i) => (
                  <Table.Row key={i.toString()}>
                    {[
                      'ndbno',
                      'Item',
                      'Orders',
                      'Price',
                      'Date',
                      'Delivered',
                      'Arrived',
                    ].map(key => {
                      if (key === 'Delivered') {
                        return (
                          <Table.Cell key={`${key}${i.toString()}`}>
                            {obj.Delivered ? 'True' : 'False'}
                          </Table.Cell>
                        );
                      }
                      if (key === 'Date') {
                        return (
                          <Table.Cell key={`${key}${i.toString()}`}>
                            {moment(obj[key]).format('MM/DD/YYYY h:mm')}
                          </Table.Cell>
                        );
                      }
                      if (key === 'Arrived') {
                        return (
                          <Table.Cell key={`${key}${i.toString()}`}>
                            <Button
                              value={i}
                              icon="truck"
                              onClick={() => this.props.arrived(i)}
                            />
                          </Table.Cell>
                        );
                      }
                      if (key === 'Price') {
                        return (
                          <Table.Cell key={`${key}${i.toString()}`}>
                            {`$${obj[key].toFixed(2)}`}
                          </Table.Cell>
                        );
                      }
                      return (
                        <Table.Cell key={`${key}${i.toString()}`}>
                          {obj[key]}
                        </Table.Cell>
                      );
                    })}
                  </Table.Row>
                ))
              ) : (
                <Table.Row key="None" />
              )}
            </Table.Body>
          </Table>
          {/* <Divider /> */}
          {/* <Segment textAlign="right" size="huge">
            Total:
            {' $'}
            {this.props.orderList
              ? this.props.orderList.reduce(
                  (prev, curr) => prev + curr.Price,
                  0,
                )
              : '0'}
          </Segment> */}
        </Container>
      </div>
    );
  }
}

PurchaseComplete.propTypes = {
  orderList: PropTypes.any,
  fetch: PropTypes.func,
  arrived: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  orderList: makeSelectPurchaseComplete(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: () => dispatch(fetchOrders()),
    arrived: i => dispatch(itArrived(i)),
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
