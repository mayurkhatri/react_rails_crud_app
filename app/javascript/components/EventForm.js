import React from 'react';
import propTypes from 'prop-types';

class EventForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      event: props.event,
      errors: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { event } = this.state;
    const errors = this.validateEvent(event);
    console.log('in handleSubmit()', e);
    if(!this.isEmptyObject(errors)) {
      this.setState({ errors });
    } else {
      console.log(event);
    }
  }

  handleInputChange(event) {
    console.log('in handleInputChange()');
  }

  validateEvent(event) {
    const errors = {};

    if (event.event_type === '') {
      errors.event_type = 'You must enter an event type';
    }

    if (event.event_date === '') {
      errors.event_date = 'You must enter a valid date';
    }

    if (event.title === '') {
      errors.title = 'You must enter a title';
    }

    if (event.speaker === '') {
      errors.speaker = 'You must enter at least one speaker';
    }

    if (event.host === '') {
      errors.host = 'You must enter at least one host';
    }

    console.log(event);
    return errors;
  }

  isEmptyObject(obj) {
    return Object.keys(obj).length === 0;
  }

  renderErrors() {
    const { errors } = this.state;

    if (this.isEmptyObject(errors)){
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
    return (
      <div>
        <h2>New Event</h2>
        {this.renderErrors()}
        <form className="eventForm" onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="event_type">
              <strong>Event type</strong>
              <input
                type="text"
                id="event_type"
                name="event_type"
                onChange={this.handleInputChange} />
            </label>
          </div>
          <div>
            <label htmlFor="event_date">
              <strong>Date:</strong>
              <input
               type="text"
               id="event_date"
               name="event_date"
               onChange={this.handleInputChange} />
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
                onChange={this.handleInputChange} />
            </label>
          </div>
          <div>
            <label htmlFor="speaker">
              <strong>Speakers:</strong>
              <input
                type="text"
                id="speaker"
                name="speaker"
                onChange={this.handleInputChange} />
            </label>
          </div>
          <div>
            <label htmlFor="host">
              <strong>Hosts:</strong>
              <input
                type="text"
                id="host"
                name="host"
                onChange={this.handleInputChange} />
            </label>
          </div>
          <div>
            <label htmlFor="published">
              <strong>Publish:</strong>
              <input
                type="checkbox"
                id="published"
                name="published"
                onChange={this.handleInputChange} />
            </label>
          </div>
          <div className="form-actions">
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    );
  }
}

EventForm.propTypes = {
  event: propTypes.shape(),
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