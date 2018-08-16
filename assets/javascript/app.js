
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAhHHhsMU8QwDSQg0YptG6v2FPmGZapPEQ",
    authDomain: "train-scheduler-a67f8.firebaseapp.com",
    databaseURL: "https://train-scheduler-a67f8.firebaseio.com",
    projectId: "train-scheduler-a67f8",
    storageBucket: "",
    messagingSenderId: "66510379977"
  };
  firebase.initializeApp(config);


var database = firebase.database()

var trainName;
var destination;
var tFrequency;
var nextArrival;
var minutesAway;


    

// submit on click 
  // add new employee
  $("#submit").on("click", function(event) {
    event.preventDefault();
  
    // Get the input values
    trainName = $("#trainName").val().trim();
    destination = $("#destination").val().trim();
    var firstTime = $("#firstTime").val().trim();
    var tFrequency = parseInt($("#frequency").val().trim());

// First Time (pushed back 1 year to make sure it comes before current time)
var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
console.log(firstTimeConverted);

// Current Time
var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

// Difference between the times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
var tRemainder = diffTime % tFrequency;
console.log(tRemainder);

// Minute Until Train
var tMinutesTillTrain = tFrequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));

    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTime: firstTime,
        tFrequency: tFrequency,
        tMinutesTillTrain: tMinutesTillTrain,
        nextTrain: nextTrain,
        dateAdded: firebase.database.ServerValue.TIMESTAMP

    });

  });
  

// on child added
  // populate table rows

database.ref().on("child_added", function(event) {
  var newRow = $("<tr>")
  // Columns in Current Employees Div
  var tdName = $("<td>")
  tdName.text(event.val().trainName)
  var tdDest = $("<td>")
  tdDest.text(event.val().destination)
  var tdFreq = $("<td>")
  tdFreq.text(event.val().tFrequency)
  var tdNext = $("<td>")
  tdNext.text(event.val().nextTrain) 
  var tdMinutesAway = $("<td>")
  tdMinutesAway.text(event.val().tMinutesTillTrain)
//   var tdBilled = $("<td>")
//   tdBilled.text(event.val().totalBilled)
  newRow.append(tdName, tdDest, tdFreq, tdNext, tdMinutesAway)
  $("tbody").append(newRow)
})