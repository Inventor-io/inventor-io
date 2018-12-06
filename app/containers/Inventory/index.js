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
import {
  Button,
  Checkbox,
  Table,
  Container,
  Header,
  Confirm,
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import NavBar from 'containers/NavBar/Loadable';
import { makeSelectInventory } from './selectors';
import { getInventory, addToOrder, order, delInven } from './actions';
import reducer from './reducer';
import saga from './saga';

// import Table from '../../components/InventoryTable';

/* eslint-disable react/prefer-stateless-function */

export class Inventory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selectedForDeletion: {},
    };
  }

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
        <NavBar />
        <Container>
          <Header as="h1">Inventory List</Header>
          <Table unstackable>
            <Table.Header>
              <Table.Row>
                {this.props.currentInventory ? (
                  ['ndbno', 'Item', 'Selected', 'Quantity', 'Delete'].map(
                    (key, i) => (
                      <Table.HeaderCell key={i.toString()}>
                        {key}
                      </Table.HeaderCell>
                    ),
                  )
                ) : (
                  <Table.Cell />
                )}
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.props.currentInventory ? (
                this.props.currentInventory.map((obj, e) => {
                  const rowData = [
                    'ndbno',
                    'Item',
                    'Selected',
                    'Quantity',
                    'Delete',
                  ].map((key, i) => {
                    if (key === 'Selected') {
                      return (
                        <Table.Cell key={i.toString()}>
                          <Checkbox value={e} onChange={this.props.toggle} />
                        </Table.Cell>
                      );
                    }
                    if (key === 'Delete') {
                      return (
                        <Table.Cell key={i.toString()}>
                          <Button
                            icon="trash alternate outline"
                            value={obj.ndbno}
                            onClick={() => {
                              this.setState({
                                open: true,
                                selectedForDeletion: obj.ndbno,
                              });
                            }}
                          />
                        </Table.Cell>
                      );
                    }

                    return (
                      <Table.Cell key={i.toString()}>{obj[key]}</Table.Cell>
                    );
                  });
                  return <Table.Row key={e.toString()}>{rowData}</Table.Row>;
                })
              ) : (
                <tr />
              )}
            </Table.Body>
          </Table>

          <Button content="Place order" onClick={this.props.handleOrder} />

          <Confirm
            content="Delete this inventory?"
            open={this.state.open}
            onCancel={() => this.setState({ open: false })}
            onConfirm={() => {
              this.setState({ open: false });
              this.props.deleteInventory(this.state.selectedForDeletion);
            }}
          />
        </Container>
      </div>
    );
  }
}

Inventory.propTypes = {
  // functions
  mountData: PropTypes.func,
  toggle: PropTypes.func,
  handleOrder: PropTypes.func,
  deleteInventory: PropTypes.func,
  // states
  currentInventory: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  currentInventory: makeSelectInventory(),
});

function mapDispatchToProps(dispatch) {
  return {
    mountData: () => dispatch(getInventory()),
    toggle: (_, data) => {
      dispatch(addToOrder(data));
    },
    handleOrder: e => {
      e.preventDefault();
      return dispatch(order());
    },
    deleteInventory: ndbno => dispatch(delInven(ndbno)),
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
