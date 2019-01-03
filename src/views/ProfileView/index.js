import React, { Component } from 'react';
import {
  Button,
  Card,
  Grid,
  Header,
  Icon,
  Image,
  Item,
  List,
  Menu,
  Segment,
  Tab
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { differenceInYears, format } from 'date-fns';
import { firestoreConnect, isEmpty } from 'react-redux-firebase';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';

import { userProfileQuery } from '../../queries/userQueries';
import LoadingIcon from '../../components/LoadingIcon';
import { getUserEvents } from '../../actions/userActions';

const panes = [
  { menuItem: 'All Events', pane: { key: 'allEvents' } },
  { menuItem: 'Past Events', pane: { key: 'pastEvents' } },
  { menuItem: 'Future Events', pane: { key: 'futureEvents' } },
  { menuItem: 'Hosted Events', pane: { key: 'hostedEvents' } }
];

const mapStateToProps = (state, ownProps) => {
  let userUid = null;
  let profile = {};

  if (ownProps.match.params.id === state.firebase.auth.uid) {
    profile = state.firebase.profile;
  } else {
    profile =
      !isEmpty(state.firestore.ordered.profile) &&
      state.firestore.ordered.profile[0];
  }
  userUid = ownProps.match.params.id;

  return {
    profile,
    userUid,
    auth: state.firebase.auth,
    photos: state.firestore.ordered.photos,
    requesting: state.firestore.status.requesting,
    eventsLoading: state.async.loading,
    events: state.events
  };
};

const actions = {
  getUserEvents
};

class ProfileView extends Component {
  
  async componentDidMount() {
    await this.props.getUserEvents(this.props.userUid);
  }
  
  getAge = DOB => {
    if (!DOB) return 'Unspecified age';
    return differenceInYears(Date.now(), new Date(DOB));
  };

  changeTab = async (e, data) => {
    let index = data.activeIndex === 0 ? undefined : data.activeIndex;
    await this.props.getUserEvents(this.props.userUid, index);
  }

  render() {
    const {
      photos,
      profile,
      auth,
      match,
      requesting,
      events,
      eventsLoading
    } = this.props;
    const isCurrentUser = auth.uid === match.params.id;
    const loading = Object.values(requesting).some(a => a === true);

    if (loading) return <LoadingIcon inverted />;

    return (
      <Grid>
        <Grid.Column width={16}>
          <Segment>
            <Item.Group>
              <Item>
                <Item.Image
                  avatar
                  size='small'
                  src={profile.photoURL || '../../../public/assets/user.png'}
                />
                <Item.Content verticalAlign='bottom'>
                  <Header as='h1'>{profile.displayName}</Header>
                  <br />
                  <Header as='h3'>
                    {profile.occupation || 'No occupation listed'}
                  </Header>
                  <br />
                  <Header as='h3'>
                    {this.getAge(profile.dateOfBirth)}, Lives in{' '}
                    {profile.city || 'unspecified location'}
                  </Header>
                </Item.Content>
              </Item>
            </Item.Group>
          </Segment>
        </Grid.Column>
        <Grid.Column width={12}>
          <Segment>
            <Grid columns={2}>
              <Grid.Column width={10}>
                <Header icon='smile' content={`About ${profile.displayName}`} />
                <p>
                  I am a:{' '}
                  <strong>
                    {profile.occupation || 'No occupation listed'}
                  </strong>
                </p>
                <p>
                  Originally from <strong>{profile.origin || 'Unknown'}</strong>
                </p>
                <p>
                  Member Since:{' '}
                  <strong>
                    {profile.createdAt &&
                      format(new Date(profile.createdAt.toDate()), 'MM/YYYY')}
                  </strong>
                </p>
                <p>{profile.description || 'No description'}</p>
              </Grid.Column>
              <Grid.Column width={6}>
                <Header icon='heart outline' content='Interests' />
                <List>
                  {(profile.interests &&
                    profile.interests.map(interest => (
                      <Item key={interest}>
                        <Icon name='heart' />
                        <Item.Content>{interest}</Item.Content>
                      </Item>
                    ))) ||
                    'No interests'}
                </List>
              </Grid.Column>
            </Grid>
          </Segment>
        </Grid.Column>
        <Grid.Column width={4}>
          <Segment>
            {isCurrentUser ? (
              <Button
                as={Link}
                to='/settings/about'
                color='teal'
                fluid
                basic
                content='Edit Profile'
              />
            ) : (
              <Button color='orange' fluid basic content='Follow User' />
            )}
          </Segment>
        </Grid.Column>

        <Grid.Column width={12}>
          <Segment attached>
            <Header icon='image' content='Photos' />
            <Image.Group size='small'>
              {photos &&
                photos.map(photo => (
                  <LazyLoad
                    key={photo.id}
                    height={150}
                    placeholder={<Image src='/assets/user.png' />}
                  >
                    <Image src={photo.url} />
                  </LazyLoad>
                ))}
            </Image.Group>
          </Segment>
        </Grid.Column>

        <Grid.Column width={12}>
          <Segment attached loading={eventsLoading}>
            <Header icon='calendar' content='Events' />
            <Tab onTabChange={(e, data) => this.changeTab(e, data)} panes={panes} menu={{ secondary: true, pointing: true }} />
            <br/>

            <Card.Group itemsPerRow={5}>
              {events &&
                events.map(event => (
                  <Card as={Link} to={`/events/${event.id}`} key={event.id}>
                    <Image
                      src={`/assets/categoryImages/${event.category}.jpg`}
                    />
                    <Card.Content>
                      <Card.Header textAlign='center'>
                        {event.title}
                      </Card.Header>
                      <Card.Meta textAlign='center'>
                        <div>
                          {event.date &&
                            format(event.date.toDate(), 'dddd Do MMMM')}
                        </div>
                        <div>
                          {event.date && format(event.date.toDate(), 'h:mm A')}
                        </div>
                      </Card.Meta>
                    </Card.Content>
                  </Card>
                ))}
            </Card.Group>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default compose(
  connect(
    mapStateToProps,
    actions
  ),
  firestoreConnect((auth, userUID) => userProfileQuery(auth, userUID))
)(ProfileView);
