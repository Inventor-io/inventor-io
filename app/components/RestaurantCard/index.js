/**
 *
 * RestaurantCard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';

const RestaurantCard = props => (
  <Card>
    <Card.Content header={props.header} />
    <Card.Content description={props.description} />
    {/* <Card.Content extra>
      <Icon name= />4 Friends {JSON.stringify(props)}
    </Card.Content> */}
  </Card>
);

RestaurantCard.propTypes = {
  header: PropTypes.any,
  description: PropTypes.any,
};
export default RestaurantCard;
