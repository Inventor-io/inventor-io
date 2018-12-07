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
  BarChart,
  Bar,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import makeSelectRestaurantDashboard, {
  makeSelectRestaurantInfo,
  makeSelectRestaurantId,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { loadInformation } from './actions';
import { getRandomColor } from './helpers/dashboard';
import { Segment, Dimmer, Loader, Image } from 'semantic-ui-react';

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
    // console.log(this.props);
    let count = 0;
    return (
      <div>
        <NavBar />
        <h1 align="center">Costs & Revenue</h1>
        {this.props.info ? (
          <ResponsiveContainer width="100%" aspect={8.0 / 3.0}>
            <LineChart
              data={this.props.all.salesAndRevenue}
              margin={{ top: 5, right: 100, left: 100, bottom: 5 }}
            >
              <XAxis dataKey="date" />
              <YAxis
                viewBox={{ y: -80, width: 100, height: 100 }}
                label={{
                  value: 'US Dollars ($)',
                  angle: -90,
                  position: 'left',
                }}
                offset="100"
              />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend onClick={this.props.clickHandler} />
              {this.props
                ? Object.keys(this.props.all.salesAndRevenue[0]).map(key => {
                    if (key !== 'date') {
                      //console.log(getRandomColor);
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
          </ResponsiveContainer>
        ) : null}

        <h1 align="center">Inventory</h1>
        <ResponsiveContainer width="100%" aspect={8.0 / 3.0}>
          {this.props.info ? (
            <BarChart
              width={1800}
              height={900}
              data={this.props.info.inventoryData}
              margin={{ top: 5, right: 100, left: 100, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="inventory_name" />
              <YAxis />
              <Tooltip />
              <Legend />

              <Bar dataKey="quantity" fill={getRandomColor()} />
              {this.props.info.inventoryData.map((entry, index) => {
                const color = getRandomColor();
                return <Cell fill={color} />;
              })}
              {/* {this.props
              ? this.props.info.inventoryData.map(entry => {
                  console.log(entry);
                  if (entry !== 'date') {
                    //console.log(getRandomColor);
                    let randomColor = getRandomColor();
                    return <Bar dataKey="quantity" fill={randomColor} />;
                    console.log(key);
                  }
                })
              : null} */}
              {/* this.props.all.salesAndRevenue.map() */}
            </BarChart>
          ) : (
            <Loader active size="massive" inline="centered" />
          )}
        </ResponsiveContainer>
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
    clickHandler: e => {
      console.log(e.value);
      let item = e.value.split('_')[0];
      console.log(item);
    },
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
