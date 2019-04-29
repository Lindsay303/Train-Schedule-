// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between first and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyBtLkCcYQwrOlQA8hRfh4882c9qY0H7eII",
    authDomain: "trainschedule-60d9c.firebaseapp.com",
    databaseURL: "https://trainschedule-60d9c.firebaseio.com",
    projectId: "trainschedule-60d9c",
    storageBucket: "trainschedule-60d9c.appspot.com",
    messagingSenderId: "428438614684"
};

firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Employees
$("#add-train-button").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#time-input").val().trim();
  var firstTrain = moment($("#first-input").val().trim(), "HH:mm").format("X");
  var trainFrequency = $("#train-frequency-input").val().trim();

  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    first: firstTrain,
    frequency: trainFrequency
  };

  // Uploads employee data to the database
  database.ref().push(newTain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.first);
  console.log(newTrain.frequency);

  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#time-input").val("");
  $("#first-input").val("");
  $("#train-frequency-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var firstTrain = childSnapshot.val().first;
  var trainFrequency = childSnapshot.val().frequency;

  // Train Info
  console.log(trainName);
  console.log(trainDestination);
  console.log(firstTrain);
  console.log(trainFrequency);


  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainFrequency),
    $("<td>").text(nextTrain),
    $("<td>").text(minutesAway),
    );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});

