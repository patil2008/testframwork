import {firebase} from './firebase';



export const getUrl = (path) => {
  let storageRef = firebase.storage().ref();
  // Get the download URL
  return storageRef.child(path).getDownloadURL().then(function(url) {
    // Insert url into an <img> tag to "download"
    console.log("url",url);
    return Promise.resolve(url);
  }).catch(function(error) {
  
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/object_not_found':
        // File doesn't exist
        break;
  
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
  
      case 'storage/canceled':
        // User canceled the upload
        break;
  
      
      case 'storage/unknown':
        // Unknown error occurred, inspect the server response
        break;
    }
    return Promise.reject(error);
  });
}