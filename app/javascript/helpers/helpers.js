export const isEmptyObject = obj => Object.keys(obj).length === 0;

export const validateEvent = (event) => {
  const errors = {};
  console.log("in validate event", event);
  if(event.event_type === '') {
    errors.event_type = 'You must enter and event type';
  }

  if(event.event_date === '') {
    errors.event_date = 'You must enter and event date';
  }

  if(event.title === '') {
    errors.title = 'You must enter a title';
  }

  if(event.speaker === '') {
    errors.speaker = 'You must enter at least one speaker';
  }

  if(event.host === '') {
    errors.host = 'You must enter atleast one host';
  }

  console.log("errors", errors);
  return errors;
}