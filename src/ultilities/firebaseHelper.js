import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCgxNDiNXEurtA2Qqw39bX7rDvWQ9ubBJ0",
    authDomain: "reactnativelearning-50c20.firebaseapp.com",
    databaseURL: "https://reactnativelearning-50c20.firebaseio.com/",
    storageBucket: "reactnativelearning-50c20.appspot.com"
}

export default firebaseHelper = firebase.initializeApp(firebaseConfig);