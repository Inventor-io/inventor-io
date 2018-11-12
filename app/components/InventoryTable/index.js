/**
 *
 * Table
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

/* eslint-disable react/prefer-stateless-function */

const InventoryTable = ({ data }) => {
  if (!data.length) {
    return <div />;
  }
  return (
    <div>
      <table>
        <thead>
          <tr>
            {Object.keys(data[0]).map((key, i) => (
              <th key={i.toString()}>{key}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map(obj => {
            const rowData = Object.keys(obj).map((key, i) => {
              let val;
              if (key === 'Selected') {
                val = obj[key] ? 'selected' : 'unselected';
              } else {
                val = obj[key];
              }
              return <td key={i.toString()}>{val}</td>;
            });
            return <tr>{rowData}</tr>;
          })}
        </tbody>
      </table>
    </div>
  );
};

InventoryTable.propTypes = {
  data: PropTypes.array,
};

export default InventoryTable;
