import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Switch } from 'react-router-dom';

import Header from './Header';
import EventList from './EventList';
import PropsRoute from './PropsRoute';
import Event from './Event';
import EventForm from './EventForm';
import { success } from '../helpers/notifications';
import { handleAjaxError } from '../helpers/helpers';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: null,
    }
    this.addEvent = this.addEvent.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
  }

  componentDidMount() {
    axios
      .get('/api/events.json')
      .then(response => this.setState({ events: response.data }))
      .catch(handleAjaxError);
  }

  addEvent(newEvent) {
    axios
      .post('/api/events.json', newEvent)
      .then((response) => {
        const savedEvent = response.data;
        success("Event Added");
        // alert('Event Added!');
        // origin code does not get id from savedEvent
        const id = savedEvent["id"];
        this.setState(prevState => ({
          events: [...prevState.events, savedEvent],
        }));
        const { history } = this.props;
        history.push(`/events/${id}`);
      })
      .catch(handleAjaxError);
  }

  deleteEvent(eventId) {
    const sure = window.confirm("Are you sure?");
    if (sure){
      axios
        .delete(`/api/events/${eventId}.json`)
        .then((response) => {
          if (response.status === 204) {
            // alert('Event deleted');
            success('Event deleted');
            const { history } = this.props;
            history.push('/events');

            const { events } = this.state;
            this.setState({ events: events.filter(event => event.id !== eventId) });
          }
        })
        .catch(handleAjaxError);
    }
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
            <PropsRoute path="/events/new" component={EventForm} onSubmit={this.addEvent} />
            <PropsRoute
              exact
              path="/events/:id/edit"
              component={EventForm}
              event={event}
              onSubmit={this.updateEvent}
            />
            <PropsRoute
              path="/events/:id"
              component={Event}
              event={event}
              onDelete={this.deleteEvent}
            />
          </Switch>
        </div>
      </div>
    )
  }
}

Editor.propTypes = {
  match: PropTypes.shape(),
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

Editor.defaultProps = {
  match: undefined,
};

export default Editor;