/**
 *
 * RestaurantDashboard
 *
 */
/* eslint-disable */
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
// import getRestaurantCosts from './helpers/dashboard';

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
    // this.props.info.salesInfo ? getRestaurantCosts(this.props.info.salesInfo.rows) : null;
    // async function getCost(){
    //   const salesInfo = this.props.info.salesInfo.rows;
    //   getRestaurantCosts(salesInfo);
    // }
    // getCost();

    //* {moment(salesInfo[0].date).format('MM/DD/YYYY')} */
    // console.log(JSON.stringify(this.props.info.salesInfo), getRestaurantCosts)
    //          getRestaurantCosts(this.props.info.salesInfo)

    return (
      <div>
        <NavBar />
        {this.props.info ? (
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

/* eslint-enable */
