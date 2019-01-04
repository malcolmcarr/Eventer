import React, { Component } from 'react';
import { Comment, Header, Segment } from 'semantic-ui-react';
import distanceInWords from 'date-fns/distance_in_words';
import { Link } from 'react-router-dom';
import EventDetailChatForm from './EventDetailChatForm';

class EventDetailChat extends Component {
  state = {
    showReplyForm: false,
    currentCommentId: null
  };

  onOpenReplyForm = id => () => {
    this.setState({ showReplyForm: true, currentCommentId: id });
  };

  handleCloseReplyForm = () => {
    this.setState({ showReplyForm: false, currentCommentId: null });
  };

  render() {
    const { showReplyForm, currentCommentId } = this.state;
    const { addEventComment, eventId, eventChat } = this.props;
    return (
      <div>
        <Segment
          textAlign='center'
          attached='top'
          inverted
          color='teal'
          style={{ border: 'none' }}
        >
          <Header>Chat about this event</Header>
        </Segment>

        <Segment attached>
          <Comment.Group>
            {eventChat &&
              eventChat.map(comment => (
                <Comment key={comment.id}>
                  <Comment.Avatar
                    src={comment.photoURL || '/assets/user.png'}
                  />
                  <Comment.Content>
                    <Comment.Author as={Link} to={`/profile/${comment.uid}`}>
                      {comment.displayName}
                    </Comment.Author>
                    <Comment.Metadata>
                      <div>
                        {comment.date &&
                          distanceInWords(comment.date, Date.now())}{' '}
                        ago
                      </div>
                    </Comment.Metadata>
                    <Comment.Text>{comment.text}</Comment.Text>
                    <Comment.Actions>
                      <Comment.Action
                        onClick={this.onOpenReplyForm(comment.id)}
                      >
                        Reply
                      </Comment.Action>
                      {showReplyForm && currentCommentId === comment.id && (
                        <EventDetailChatForm
                          addEventComment={addEventComment}
                          eventId={eventId}
                          form={`reply_${comment.id}`}
                          closeForm={this.handleCloseReplyForm}
                          parentId={comment.id}
                        />
                      )}
                    </Comment.Actions>
                  </Comment.Content>

                  {comment.childNodes &&
                    comment.childNodes.map(child => (
                      <Comment.Group key={child.id}>
                        <Comment>
                          <Comment.Avatar
                            src={child.photoURL || '/assets/user.png'}
                          />
                          <Comment.Content>
                            <Comment.Author
                              as={Link}
                              to={`/profile/${child.uid}`}
                            >
                              {child.displayName}
                            </Comment.Author>
                            <Comment.Metadata>
                              <div>
                                {child.date &&
                                  distanceInWords(child.date, Date.now())}{' '}
                                ago
                              </div>
                            </Comment.Metadata>
                            <Comment.Text>{child.text}</Comment.Text>
                            <Comment.Actions>
                              <Comment.Action
                                onClick={this.onOpenReplyForm(child.id)}
                              >
                                Reply
                              </Comment.Action>
                              {showReplyForm &&
                                currentCommentId === child.id && (
                                  <EventDetailChatForm
                                    addEventComment={addEventComment}
                                    eventId={eventId}
                                    form={`reply_${child.id}`}
                                    closeForm={this.handleCloseReplyForm}
                                    parentId={child.parentId}
                                  />
                                )}
                            </Comment.Actions>
                          </Comment.Content>
                        </Comment>
                      </Comment.Group>
                    ))}
                </Comment>
              ))}
          </Comment.Group>
          <EventDetailChatForm
            addEventComment={addEventComment}
            eventId={eventId}
            form='newComment'
            parentId={null}
          />
        </Segment>
      </div>
    );
  }
}

export default EventDetailChat;
