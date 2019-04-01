import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Switch } from 'react-router-dom';

import Header from './Header';
import EventList from './EventList';
import PropsRoute from './PropsRoute';
import Event from './Event';
import EventForm from './EventForm';

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

    // does not work
    // const { match } = this.props;
    // const eventId = match.match.params.id;

    const eventId = this.props.match.params.id;
    const event = events.find(e => e.id === Number(eventId));

    return (
      <div>
        <Header />
        <div className="grid">
        <EventList events={events} activeId={Number(eventId)}/>
          <Switch>
            <PropsRoute path="/events/new" component={EventForm} />
            <PropsRoute
              path="/events/:id"
              component={Event}
              event={event}
            />
          </Switch>
        </div>
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