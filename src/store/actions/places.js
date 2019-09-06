import { ADD_PLACE, DELETE_PLACE, LOGOUT } from "./actionTypes";
import firebaseHelper from "../../ultilities/firebaseHelper";
import uuid from "uuid";

export const addPlace = (placeName, location, image) => {
  return async dispatch => {
    const image_uri = image.uri;
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", image_uri, true);
      xhr.send(null);
    });

    const ref = firebaseHelper
      .storage()
      .ref()
      .child(uuid.v4());
    let uploadTask = await ref.put(blob);

    uploadTask.on(
      'state_changed',
      snapshot => {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress + "%");
      },
      error => {
        console.log(error);
      },
      () => {
        blob.close();
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          const placeData = {
            name: placeName,
            location: location,
            image: {uri: downloadURL}
          };
          fetch(
            "https://reactnativelearning-50c20.firebaseio.com/places.json",
            {
              method: "POST",
              body: JSON.stringify(placeData)
            }
          )
            .catch(err => console.log(err))
            .then(res => res.json())
            .then(parsedData => {
              console.log(parsedData);
            });
        });
      }
    );

    // We're done with the blob, close and release it
    download_url = await snapshot.ref.getDownloadURL();
    console.log(download_url);
    return download_url;
    // const placeData = {
    //     name: placeName,
    //     location: location
    // }
    // fetch("https://reactnativelearning-50c20.firebaseio.com/places.json", {
    //     method: "POST",
    //     body: JSON.stringify(placeData)
    // })
    // .catch(err => console.log(err))
    // .then(res => res.json())
    // .then(parsedData => {
    //     console.log(parsedData);
    // });
  };
};

export const deletePlace = placeKey => {
  return {
    type: DELETE_PLACE,
    placeKey: placeKey
  };
};

export const logout = () => {
  return {
    type: LOGOUT
  };
};
