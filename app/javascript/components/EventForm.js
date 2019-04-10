import React from 'react';
import propTypes from 'prop-types';
import {validateEvent, isEmptyObject, formatDate} from '../helpers/helpers';
import Pikaday from 'pikaday';
import 'pikaday/css/pikaday.css';
import { Link } from 'react-router-dom';

class EventForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      event: props.event,
      errors: {},
    };

    this.dateInput = React.createRef();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    new Pikaday({
      field: this.dateInput.current,
      toString: date => formatDate(date),
      onSelect: (date) => {
        const formattedDate = formatDate(date);
        this.dateInput.current.value = formattedDate;
        this.updateEvent('event_date', formattedDate);
      },
    });
  }

  componentWillReceiveProps({ event }) {
    console.log("in componentWillReceiveProps");
    this.setState({ event });
  }

  updateEvent(key, value) {
    this.setState(prevState => ({
      event: {
        ...prevState.event,
        [key]: value,
      },
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    const { event } = this.state;
    const errors = validateEvent(event);

    if(!isEmptyObject(errors)) {
      this.setState({ errors });
    } else {
      const { onSubmit } = this.props;
      onSubmit(event);
    }
  }

  handleInputChange(event) {
    console.log('in handleInputChange()');
    const { target } = event;
    const { name } = target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    this.updateEvent(name, value);
  }

  renderErrors() {
    const { errors } = this.state;

    if (isEmptyObject(errors)){
      return null;
    }
    return (
      <div className="errors">
        <h3>Following errors prohibited event from being saved:</h3>
        <ul>
          {Object.values(errors).map(error => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      </div>
    );
  }

  render() {
    const { event } = this.state;
    const cancelURL = event.id ? `/events/${event.id}` : '/events';
    const title = event.id ? `${event.event_date} - ${event.event_type}` : 'New Event';
    const { path } = this.props;

    return (
      <div>
        <h2>{title}</h2>
        {this.renderErrors()}
        <form className="eventForm" onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="event_type">
              <strong>Event type</strong>
              <input
                type="text"
                id="event_type"
                name="event_type"
                onChange={this.handleInputChange}
                value={event.event_type}
              />
            </label>
          </div>
          <div>
            <label htmlFor="event_date">
              <strong>Date:</strong>
              <input
               type="text"
               id="event_date"
               name="event_date"
               ref={this.dateInput}
               autoComplete="off"
               value={event.event_date}
               onChange={this.handleInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              <strong>Title:</strong>
              <textarea
                cols="30"
                rows="10"
                id="title"
                name="title"
                onChange={this.handleInputChange}
                value={event.title} />
            </label>
          </div>
          <div>
            <label htmlFor="speaker">
              <strong>Speakers:</strong>
              <input
                type="text"
                id="speaker"
                name="speaker"
                onChange={this.handleInputChange}
                value={event.speaker} />
            </label>
          </div>
          <div>
            <label htmlFor="host">
              <strong>Hosts:</strong>
              <input
                type="text"
                id="host"
                name="host"
                onChange={this.handleInputChange}
                value={event.host} />
            </label>
          </div>
          <div>
            <label htmlFor="published">
              <strong>Publish:</strong>
              <input
                type="checkbox"
                id="published"
                name="published"
                onChange={this.handleInputChange}
                checked={event.published} />
            </label>
          </div>
          <div className="form-actions">
            <button type="submit">Save</button>
            <Link to={cancelURL}>Cancel</Link>
          </div>
        </form>
      </div>
    );
  }
}

EventForm.propTypes = {
  event: propTypes.shape(),
  onSubmit: propTypes.func.isRequired,
  path: propTypes.string.isRequired,
};

EventForm.defaultProps = {
  event: {
    event_type: '',
    event_date: '',
    title: '',
    speaker: '',
    host: '',
    published: false,
  }
};

export default EventForm;