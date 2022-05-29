const { initializeApp } = require('firebase/app');
require('firebase/storage');
// const firebaseConfig = {
//     apiKey: process.env.FIREBASE_API_KEY,
//     authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//     databaseURL: process.env.FIREBASE_DATABASE_URL,
//     projectId: process.env.FIREBASE_PROJECT_ID,
//     storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.FIREBASE_APP_ID,
//     measurementId: process.env.FIREBASE_MEASUREMENT_ID
//   };

const firebaseConfig = {
  apiKey: "AIzaSyAj4WITxji_28xeBiXl7GN6uraS2v8neq0",
  authDomain: "todolist-app-42bcb.firebaseapp.com",
  databaseURL: "https://todolist-app-42bcb.firebaseio.com",
  projectId: "todolist-app-42bcb",
  storageBucket: "todolist-app-42bcb.appspot.com",
  messagingSenderId: "713944183028",
  appId: "1:713944183028:web:2f311feb53a57136462ea1",
  measurementId: "G-4GKRTF4MCX"
};


module.exports = initializeApp(firebaseConfig);
