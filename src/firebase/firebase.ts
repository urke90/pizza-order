// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyAbSvuv4krAAB9W2pVSkKBTj14DSFF0ZtM',
    authDomain: 'pizza-order-6d2f9.firebaseapp.com',
    databaseURL: 'https://pizza-order-6d2f9-default-rtdb.firebaseio.com',
    projectId: 'pizza-order-6d2f9',
    storageBucket: 'pizza-order-6d2f9.appspot.com',
    messagingSenderId: '699965693572',
    appId: '1:699965693572:web:2e36a7bd0a5732d2ceecd1'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
