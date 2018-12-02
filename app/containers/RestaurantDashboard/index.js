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
import { getRandomColor } from './helpers/dashboard';

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
    // console.table('daySales############', this.props.info.daySales.rows);
    // console.table('dayCosts****************', this.props.salesByDate);
    // console.log('hi');
    console.log(this.props);
    let count = 0;
    return (
      <div>
        <NavBar />
        {this.props.info ? (
          <LineChart
            width={1800}
            height={900}
            data={this.props.all.salesAndRevenue}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="date" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            {this.props
              ? Object.keys(this.props.all.salesAndRevenue[0]).map(key => {
                  if (key !== 'date') {
                    console.log(getRandomColor);
                    let randomColor = getRandomColor();
                    return (
                      <Line
                        type="monotone"
                        dataKey={key}
                        stroke={randomColor}
                      />
                    );
                    console.log(key);
                  }
                })
              : null}
            {/* this.props.all.salesAndRevenue.map() */}
          </LineChart>
        ) : null}
        {this.props.info ? (
          <LineChart
            width={1800}
            height={900}
            data={this.props.all.salesAndRevenue}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="date" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            {this.props
              ? Object.keys(this.props.all.salesAndRevenue[0]).map(key => {
                  if (key !== 'date') {
                    console.log(getRandomColor);
                    let randomColor = getRandomColor();
                    return (
                      <Line
                        type="monotone"
                        dataKey={key}
                        stroke={randomColor}
                      />
                    );
                    console.log(key);
                  }
                })
              : null}
            {/* this.props.all.salesAndRevenue.map() */}
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
  all: makeSelectRestaurantDashboard(),
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

{
  /* this.props.all.salesAndRevenue.map(recipe => {
                  for (let key in recipe) {
                    if (key !== 'date') {
                      <Line
                        type="monotone"
                        dataKey=
                        stroke="#82ca9d"
                      />;
                      console.log(key);
                    }
                  }
                }) */
}
/* eslint-enable */
//   {/* /* {(

//   <Line
//     type="monotone"
//     dataKey={'hamburgers_revenue'}
//     stroke="#82ca9d"
//   />
// )  }*/
//     null} */}
