import * as firebase from 'firebase';
//import expenses from "../tests/fixtures/expenses";

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

const database = firebase.database;

export {firebase, database as default};

// // child_changed, child_added are others when a child changes.
// database().ref('expenses').on('child_removed', (snapshot) => {
//     console.log(`Removed ${snapshot.key}`, snapshot.val());
// });
//
// // expenses.map((expense) => {
// //     saveToDb(expense);
// // });
//
// const expensesRef = database().ref('expenses');
// console.log(expensesRef.toString());
//
// // getting data
// database().ref('expenses').once('value')
//     .then((dataSnapshot) => {
//         const expenses = [];
//         dataSnapshot.forEach((childSnapshot) => {
//             expenses.push({
//                 ...childSnapshot.val()
//             });
//         });
//         expenses.forEach((expense) => {
//             subscribeToChanges(expense);
//         });
//         console.log(expenses);
// })
//     .catch((error) => {
//         console.error('Error: ', error);
// });
//
//
//
// function saveToDb(expense) {
//     const expensesRef = database().ref('expenses');
//     const expenseRef = expensesRef.push(expense);
//     console.log(expenseRef.key);
//     database().ref('expenses/' + expenseRef.key + '/id').set(
//         expenseRef.key
//     ).then(() => {
//         console.log("Updated with key: ", expenseRef.key);
//     }).catch((error) => {
//         console.error("Error updating with key: " + error);
//     });
// }
//
// function subscribeToChanges(expense) {
//     database().ref('expenses/' + expense.id).on('value', (dataSnapshot) => {
//         console.log("Item has changed:", dataSnapshot.val());
//     });
// }