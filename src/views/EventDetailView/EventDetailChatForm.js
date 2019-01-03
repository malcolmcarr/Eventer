import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import TextArea from '../../components/form/TextArea';

class EventDetailChatForm extends Component {
  onCommentSubmit = values => {
    const { addEventComment, eventId, reset, closeForm, parentId } = this.props;
    addEventComment(eventId, values, parentId);
    reset();
    
    if (parentId) {
      closeForm();
    }
  };
  render() {
    return (
      <Form reply onSubmit={this.props.handleSubmit(this.onCommentSubmit)}>
        <Field name='comment' type='text' component={TextArea} rows={2} />
        <Button content='Add Reply' labelPosition='left' icon='edit' primary />
      </Form>
    );
  }
}

export default reduxForm({ Fields: 'comment' })(EventDetailChatForm);
