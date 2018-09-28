// Initialize Firebase
var config = {
  apiKey: "AIzaSyBDZazEgwwzBBqhyPQsvfoKXDjzsSSbZSw",
  authDomain: "budgetary-app.firebaseapp.com",
  databaseURL: "https://budgetary-app.firebaseio.com",
  projectId: "budgetary-app",
  storageBucket: "budgetary-app.appspot.com",
  messagingSenderId: "165118016154"
};
firebase.initializeApp(config);
    // Variables
    // Get a reference to the database service
    var database = firebase.database();

    // Initializing our click count at 0
    var clickCounter = 0;

    // Functions on Click
    $("#click-button").on("click", function() {

      // Add 1 to clickCounter
      clickCounter++;

      // **** Store Click Data to Firebase in a JSON property called clickCount *****
      // **** Note how we are using the Firebase .set() method ****
      // **** .ref() refers to the path you want to save your data to
      // **** Since we left .ref() blank, it will save to the root directory
      database.ref().set({
        clickCount: clickCounter
      });
