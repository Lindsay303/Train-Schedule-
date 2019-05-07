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


// 2. Button for adding trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();
  console.log("this work");

  // Grabs user input
  var trainName = $("#train-name-input").val();
  var trainDestination = $("#destination-input").val();
  var firstTrain = $("#first-input").val();
  var trainFrequency = $("#frequency-input").val();

  
  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    first: firstTrain,
    frequency: trainFrequency
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.first);
  console.log(newTrain.frequency);

  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var firstTrain = childSnapshot.val().first;
  var trainFrequency = childSnapshot.val().frequency;
  var nextArrival = childSnapshot.val().nextArrival;

 //Current time 
  var timeIs = moment();
  //convert time
  var nextTrainConverted = moment(nextArrival , "HH:mm").subtract(1, "years");
  //calculate now vs next
  var diff = moment().diff(moment(nextTrainConverted) , "minutes");
  var left = diff % trainFrequency;
  // minutes away
  var timeLeft = trainFrequency - left;
  var nextArrival = moment().add(timeLeft , "m").format("HH:mm")



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
    $("<td>").text(nextArrival),
    // $("<td>").text(nextTrain),
    );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);

  
});

