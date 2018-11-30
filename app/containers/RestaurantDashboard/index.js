/**
 *
 * RestaurantDashboard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
// import { Table, Loader, Container } from 'semantic-ui-react';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import NavBar from 'containers/NavBar/Loadable';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';
import makeSelectRestaurantDashboard, {
  makeSelectRestaurantInfo,
  makeSelectRestaurantId,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { loadInformation } from './actions';
// import { getRestaurantCosts } from './helpers/dashboard';

/* eslint-disable react/prefer-stateless-function */
export class RestaurantDashboard extends React.Component {
  componentDidMount() {
    this.props.onLoad();
  }

  render() {
    // console.table(
    // //   this.props.info.salesInfo.rows.map(
    // //     ingredient =>
    // //       (ingredient.price_ingredient = Number(ingredient.price_ingredient)),
    // //   ),
    // // );

    // const salesInfo = this.props.info.salesInfo.rows;
    // console.table(salesInfo);
    // console.table(this.props.info);
    // const restaurantCosts = getRestaurantCosts(salesInfo);

    //* {moment(salesInfo[0].date).format('MM/DD/YYYY')} */

    return (
      <div>
        <NavBar />
        {this.props.info ? ( // JSON.stringify(this.props.info.daySales)
          <LineChart
            width={600}
            height={300}
            data={this.props.info.daySales.rows}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="date" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            {this.props
              ? this.props.info.daySales.map(recipe => (
                <Line
                  type="monotone"
                  dataKey={recipe.recipe_name}
                  stroke="#82ca9d"
                />
              ))
              : null}
            {/* {this.props.info.daySales ? this.props.info.daySales.rows.map(sale => 
              <Line type="monotone" dataKey={sale.recipe_name} stroke="#82ca9d" />
            ): null} */}

            {/* <Line
              type="monotone"
              dataKey="Hamburger"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            /> */}
          </LineChart>
        ) : null}
      </div>
    );
  }
}

RestaurantDashboard.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  onLoad: PropTypes.func,
  info: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  // restaurantDashboard: makeSelectRestaurantDashboard,
  info: makeSelectRestaurantInfo(),
  all: makeSelectRestaurantDashboard,
  id: makeSelectRestaurantId,
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onLoad: () => dispatch(loadInformation()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'restaurantDashboard', reducer });
const withSaga = injectSaga({ key: 'restaurantDashboard', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(RestaurantDashboard);

// {/* <Container>
//   {this.props.info !== undefined ? (
//     <div>
//       {this.props.info.orders.length !== 0 ? (
//         <div>
//           <h1>Orders</h1>
//           <Table celled>
//             <Table.Header>
//               <Table.Row>
//                 {Object.keys(this.props.info.orders[0])
//                   .filter(key => key.indexOf('id') === -1)
//                   .map(header => (
//                     <Table.HeaderCell>{header}</Table.HeaderCell>
//                   ))}
//               </Table.Row>
//             </Table.Header>
//             <Table.Body>
//               {this.props.info.orders.map(order => (
//                 <Table.Row>
//                   <Table.Cell>{order.ndbno}</Table.Cell>
//                   <Table.Cell>{order.price}</Table.Cell>
//                   <Table.Cell>{order.quantity}</Table.Cell>
//                 </Table.Row>
//               ))}
//             </Table.Body>
//           </Table>
//         </div>
//       ) : null}
//       {/* <div>{JSON.stringify(this.props.info)}</div> */}
//       {this.props.info.sales.length !== 0 ? (
//         <div>
//           <h1>Sales</h1>
//           <Table celled>
//             <Table.Header>
//               <Table.Row>
//                 {Object.keys(this.props.info.sales[0])
//                   .filter(
//                     key => key !== 'id' && key !== 'restaurant_id',
//                   )
//                   .map(header => (
//                     <Table.HeaderCell>{header}</Table.HeaderCell>
//                   ))}
//               </Table.Row>
//             </Table.Header>
//             <Table.Body>
//               {this.props.info.sales.map(sales => (
//                 <Table.Row>
//                   <Table.Cell>{sales.recipe_id}</Table.Cell>
//                   <Table.Cell>{sales.quantity}</Table.Cell>
//                   <Table.Cell>{sales.date}</Table.Cell>
//                 </Table.Row>
//               ))}
//             </Table.Body>
//           </Table>
//         </div>
//       ) : null}
//       {this.props.info.recipes.length !== 0 ? (
//         <div>
//           <h1>Recipes</h1>
//           <Table celled>
//             <Table.Header>
//               <Table.Row>
//                 {Object.keys(this.props.info.recipes[0])
//                   .filter(key => key.indexOf('id') === -1)
//                   .map(header => (
//                     <Table.HeaderCell>{header}</Table.HeaderCell>
//                   ))}
//               </Table.Row>
//             </Table.Header>
//             <Table.Body>
//               {this.props.info.recipes.map(recipe => (
//                 <Table.Row>
//                   <Table.Cell>{recipe.recipe_name}</Table.Cell>
//                   <Table.Cell>{recipe.price}</Table.Cell>
//                 </Table.Row>
//               ))}
//             </Table.Body>
//           </Table>
//         </div>
//       ) : null}
//       {this.props.info.resInv.length !== 0 ? (
//         <div>
//           <h1>Restaurant Inventory</h1>
//           <Table celled>
//             <Table.Header>
//               <Table.Row>
//                 {Object.keys(this.props.info.resInv[0])
//                   .filter(key => key.indexOf('id') === -1)
//                   .map(header => (
//                     <Table.HeaderCell>{header}</Table.HeaderCell>
//                   ))}
//               </Table.Row>
//             </Table.Header>
//             <Table.Body>
//               {this.props.info.resInv.map(inventory => (
//                 <Table.Row>
//                   <Table.Cell>{inventory.ndbno}</Table.Cell>
//                   <Table.Cell>{inventory.measurement}</Table.Cell>
//                 </Table.Row>
//               ))}
//             </Table.Body>
//           </Table>
//         </div>
//       ) : null}

//       {/* </Table.Header> */}
//       {/* </Table> */}
//     </div>
//   ) : (
//     <Loader active inline="centered" />
//   )} */}
//   </Container>
