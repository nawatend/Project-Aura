const firebaseInstance = require('firebase');

// Initialize Firebase
// TODO: Replace with your project's config
const config = {
  apiKey: "AIzaSyDIZpKhU5vNYwQGalpGiBTYjxS9m77Ug80",
  authDomain: "project-aura-2019.firebaseapp.com",
  databaseURL: "https://project-aura-2019.firebaseio.com",
  projectId: "project-aura-2019",
  storageBucket: "project-aura-2019.appspot.com",
  messagingSenderId: "304258852082",
};

let instance = null;

const initFirebase = () => {
  instance = firebaseInstance.initializeApp(config);
};

//singleton pattern, always one ini
const getInstance = () => {
  if (!instance) {
    initFirebase();
  }
  return instance;
};
export {
  initFirebase,
  getInstance,
};