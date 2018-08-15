
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
var frequency;
var nextArrival;
var minutesAway;


// submit on click 
  // add new employee
  $("#submit").on("click", function(event) {
    event.preventDefault();
  
    // Get the input values
    trainName = $("#trainName").val().trim();
    destination = $("#destination").val().trim();
    firstTime = $("#firstTime").val().trim();
    frequency = parseInt($("#frequency").val().trim())



    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTime: firstTime,
        frequency: frequency,
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
  var tdStart = $("<td>")
  tdStart.text(event.val().firstTime)
//   var tdWorked = $("<td>")
//   tdWorked.text(event.val().monthsWorked) 
//   var tdRate = $("<td>")
//   tdRate.text(event.val().monthlyRate)
//   var tdBilled = $("<td>")
//   tdBilled.text(event.val().totalBilled)
  newRow.append(tdName, tdDest, tdStart)
  $("tbody").append(newRow)
})