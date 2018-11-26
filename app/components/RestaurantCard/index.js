/**
 *
 * RestaurantCard
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card, Icon } from 'semantic-ui-react';

const RestaurantCard = props => (
  <Card>
    <Card.Content header={props.header} />
    <Card.Content description={props.description} />
    <Card.Content extra>
      <Link to="/dashboard">
        <Icon onClick={props.click} name="info" id={props.id} />
      </Link>
    </Card.Content>
    {/* <Card.Content extra>
      <Icon name= />4 Friends {JSON.stringify(props)}
    </Card.Content> */}
  </Card>
);

RestaurantCard.propTypes = {
  header: PropTypes.any,
  description: PropTypes.any,
  // link: PropTypes.any,
  click: PropTypes.func,
  id: PropTypes.any,
};

export default RestaurantCard;
