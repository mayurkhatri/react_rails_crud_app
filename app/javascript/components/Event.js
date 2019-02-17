import React from 'react';
import PropTypes from 'prop-types';
import Link from 'react-router-dom';

const Event = ({event}) => {
  return(
    <div>
      <h1>In event</h1>
    </div>
  )
}

Event.propTypes = {
  event: PropTypes.shape(),
}

Event.defaultProps = {
  event: undefined,
}

export default Event;