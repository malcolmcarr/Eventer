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
  Segment
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { differenceInYears, format } from 'date-fns';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Link } from 'react-router-dom';

const mapStateToProps = state => ({
  profile: state.firebase.profile,
  auth: state.firebase.auth,
  photos: state.firestore.ordered.photos
});

const query = ({ auth }) => [
  {
    collection: 'users',
    doc: auth.uid,
    subcollections: [{ collection: 'photos' }],
    storeAs: 'photos'
  }
];

class ProfileView extends Component {
  getAge = DOB => {
    if (!DOB) return 'unspecified age';
    return differenceInYears(Date.now(), new Date(DOB));
  };

  render() {
    const { photos, profile } = this.props;

    return (
      <Grid>
        <Grid.Column width={16}>
          <Segment>
            <Item.Group>
              <Item>
                <Item.Image avatar size='small' src={profile.photoURL} />
                <Item.Content verticalAlign='bottom'>
                  <Header as='h1'>{profile.displayName}</Header>
                  <br />
                  <Header as='h3'>
                    {profile.occupation || 'No occupation'}
                  </Header>
                  <br />
                  <Header as='h3'>
                    {this.getAge(profile.dateOfBirth)}, Lives in {profile.city}
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
                  I am a: <strong>{profile.occupation}</strong>
                </p>
                <p>
                  Originally from <strong>{profile.origin}</strong>
                </p>
                <p>
                  Member Since:{' '}
                  <strong>{format(profile.createdAt && profile.createdAt.toDate(), 'MM/YYYY')}</strong>
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
            <Button as={Link} to='/settings/about' color='teal' fluid basic content='Edit Profile' />
          </Segment>
        </Grid.Column>

        <Grid.Column width={12}>
          <Segment attached>
            <Header icon='image' content='Photos' />
            <Image.Group size='small'>
              {photos && photos.map(photo => <Image src={photo.url} />)}
            </Image.Group>
          </Segment>
        </Grid.Column>

        <Grid.Column width={12}>
          <Segment attached>
            <Header icon='calendar' content='Events' />
            <Menu secondary pointing>
              <Menu.Item name='All Events' active />
              <Menu.Item name='Past Events' />
              <Menu.Item name='Future Events' />
              <Menu.Item name='Events Hosted' />
            </Menu>

            <Card.Group itemsPerRow={5}>
              <Card>
                <Image src={'/assets/categoryImages/drinks.jpg'} />
                <Card.Content>
                  <Card.Header textAlign='center'>Event Title</Card.Header>
                  <Card.Meta textAlign='center'>
                    28th March 2018 at 10:00 PM
                  </Card.Meta>
                </Card.Content>
              </Card>

              <Card>
                <Image src={'/assets/categoryImages/drinks.jpg'} />
                <Card.Content>
                  <Card.Header textAlign='center'>Event Title</Card.Header>
                  <Card.Meta textAlign='center'>
                    28th March 2018 at 10:00 PM
                  </Card.Meta>
                </Card.Content>
              </Card>
            </Card.Group>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect(auth => query(auth))
)(ProfileView);
