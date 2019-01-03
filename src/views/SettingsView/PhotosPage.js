import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import {
  Image,
  Segment,
  Header,
  Divider,
  Grid,
  Button,
  Card,
  Icon
} from 'semantic-ui-react';
import Cropper from 'react-cropper';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import 'cropperjs/dist/cropper.css';

import {
  uploadProfileImage,
  deleteImage,
  setProfilePicture
} from '../../actions/userActions';

const query = ({ auth }) => [
  {
    collection: 'users',
    doc: auth.uid,
    subcollections: [{ collection: 'photos' }],
    storeAs: 'photos'
  }
];

const actions = {
  uploadProfileImage,
  deleteImage,
  setProfilePicture
};

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
  photos: state.firestore.ordered.photos,
  uploading: state.async.loading
});

class PhotosPage extends Component {
  state = {
    files: [],
    cropResult: null,
    image: {}
  };

  uploadImage = async () => {
    const { image } = this.state;
    try {
      await this.props.uploadProfileImage(image);
      this.reset();
      toastr.success('Success!', 'Your photo was successfully uploaded.');
    } catch (error) {
      toastr.error('Oops', error.message);
    }
  };

  deleteImage = image => () => {
    try {
      this.props.deleteImage(image);
      toastr.success('Success!', 'Your photo was successfully deleted.');
    } catch (error) {
      toastr.error('Oops', error.message);
    }
  };

  newProfileImage = image => () => {
    try {
      this.props.setProfilePicture(image);
    } catch (error) {
      toastr.error('Oops', error.message);
    }
  };

  reset = () => {
    this.setState({
      files: [],
      image: {}
    });
  };

  onDrop = files => {
    this.setState({
      files
    });
  };

  cropImage = () => {
    if (typeof this.refs.cropper.getCroppedCanvas() === 'undefined') return;

    this.refs.cropper.getCroppedCanvas().toBlob(blob => {
      let imageURL = URL.createObjectURL(blob);
      this.setState({
        cropResult: imageURL,
        image: blob
      });
    }, 'image/jpeg');
  };

  render() {
    const { photos, profile, uploading } = this.props;
    // Remove main photo from appearing in list
    const filteredPhotos =
      photos && photos.filter(photo => photo.url !== profile.photoURL);

    return (
      <Segment>
        <Header dividing size='large' content='Your Photos' />
        <Grid>
          <Grid.Row />
          <Grid.Column width={4}>
            <Header color='teal' sub content='Step 1 - Add Photo' />
            <Dropzone onDrop={this.onDrop} multiple={false}>
              <div style={{ paddingTop: '30px', textAlign: 'center' }}>
                <Icon name='upload' size='huge' />
                <Header content='Click or drag to add image' />
              </div>
            </Dropzone>
          </Grid.Column>
          <Grid.Column width={1} />
          <Grid.Column width={4}>
            <Header sub color='teal' content='Step 2 - Resize image' />
            {this.state.files[0] && (
              <Cropper
                style={{ height: 200, width: '100%' }}
                ref='cropper'
                src={this.state.files[0].preview}
                aspectRatio={1}
                viewMode={0}
                dragMode='move'
                guides={false}
                scalable={true}
                cropBoxMovable={true}
                cropBoxResizable={true}
                crop={this.cropImage}
              />
            )}
          </Grid.Column>
          <Grid.Column width={1} />
          <Grid.Column width={4}>
            <Header sub color='teal' content='Step 3 - Preview and Upload' />
            {this.state.files[0] && (
              <div>
                <Image
                  style={{ minHeight: '200px', minWidth: '200px' }}
                  src={this.state.cropResult}
                />
                <Button.Group>
                  <Button
                    loading={uploading}
                    onClick={this.uploadImage}
                    style={{ width: '100px' }}
                    positive
                    icon='check'
                  />
                  <Button
                    disabled={uploading}
                    onClick={this.reset}
                    style={{ width: '100px' }}
                    icon='close'
                  />
                </Button.Group>
              </div>
            )}
          </Grid.Column>
        </Grid>

        <Divider />
        <Header sub color='teal' content='All Photos' />

        <Card.Group itemsPerRow={5}>
          <Card>
            <Image src={profile.photoURL || '/assets/user.png'} />
            <Button positive>Profile picture</Button>
          </Card>

          {filteredPhotos &&
            filteredPhotos.map(photo => (
              <Card key={photo.id}>
                <Image src={photo.url} />
                <div className='ui two buttons'>
                  <Button
                    onClick={this.newProfileImage(photo)}
                    basic
                    color='green'
                  >
                    Main
                  </Button>
                  <Button
                    onClick={this.deleteImage(photo)}
                    basic
                    icon='trash'
                    color='red'
                  />
                </div>
              </Card>
            ))}
        </Card.Group>
      </Segment>
    );
  }
}

export default compose(
  connect(
    mapStateToProps,
    actions
  ),
  firestoreConnect(auth => query(auth))
)(PhotosPage);
