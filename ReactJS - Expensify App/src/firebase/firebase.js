import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyC98OsMqUaE7W80NFfEi3TpxqfgiSboN4U",
    authDomain: "expensify-42aee.firebaseapp.com",
    databaseURL: "https://expensify-42aee.firebaseio.com",
    projectId: "expensify-42aee",
    storageBucket: "expensify-42aee.appspot.com",
    messagingSenderId: "511066132419"
};

firebase.initializeApp(config);

const database = firebase.database();

//  

database.ref('expenses').on('value', (snapshot) => {
    const expenses = [];
        snapshot.forEach((childSnapshot) => {
            expenses.push({
                id: childSnapshot.key,
                ...childSnapshot.val()
            });
        });
        console.log(expenses);
});

