export const objectToArray = obj => {
  if (typeof obj === 'object') {
    return Object.entries(obj).map(entry => ({...entry[1], id: entry[0]}));
  }
}

export const completeNewEvent = (user, photoURL, event) => {
  return {
    ...event,
    hostUID: user.uid,
    hostPhotoURL: photoURL || '../../public/assets/user.png',
    created: Date.now(),
    hostedBy: user.displayName,
    attendees: {
      [user.uid]: {
        going: true,
        joinDate: Date.now(),
        photoURL: user.photoURL || '/assets/user.png',
        displayName: user.displayName,
        host: true
      }
    }
  }
}