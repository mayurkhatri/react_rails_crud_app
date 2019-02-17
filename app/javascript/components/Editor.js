import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Header from './Header';
import EventList from './EventList';
import PropsRoute from './PropsRoute';
import Event from './Event';

class Editor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: null,
    }
  }

  componentDidMount() {
    axios
      .get('/api/events.json')
      .then(response => this.setState({ events: response.data }))
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { events } = this.state;
    if(events === null) return null;

    return (
      <div>
        <Header />
        <EventList events={events}/>
        <PropsRoute
          path="/events/:id"
          component={Event}
          event={event}
        />
      </div>
    )
  }
}

Editor.propTypes = {
  match: PropTypes.shape(),
};

Editor.defaultProps = {
  match: undefined,
};

export default Editor;