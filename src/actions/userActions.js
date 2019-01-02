import { toastr } from 'react-redux-toastr';
import { isLoaded } from 'react-redux-firebase';

export const updateProfile = user => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    try {
      const { isLoaded, isEmpty, ...updatedUser} = user;
      if (updatedUser.dateOfBirth) {
        updatedUser.dateOfBirth = updatedUser.dateOfBirth.toString();
      }
      firebase.updateProfile(updatedUser);
      toastr.success('Update Successful!', 'Your profile was updated.');
    } catch (error) {
      console.error(error);
    }
  };
};
