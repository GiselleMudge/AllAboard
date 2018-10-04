//My firebase setup & ode to Ozzy Osbourne's 1st single in his debut solo album
var config = {
    apiKey: "AIzaSyDoSsB9WiwXyhvVYiIG1gSltccrPpDP7jk",
    authDomain: "crazytrain-c2862.firebaseapp.com",
    databaseURL: "https://crazytrain-c2862.firebaseio.com",
    projectId: "crazytrain-c2862",
    storageBucket: "crazytrain-c2862.appspot.com",
    messagingSenderId: "336477405056"
  };
  firebase.initializeApp(config);
  var database = firebase.database();

// When Submit button is clicked, this will trigger the getData function after the jump...
$("#submit").on("click", function(event){
	event.preventDefault();
  getData();
})

// and here is the function that grabs the user's input data: 
function getData() {
trainName = $("#trainName").val().trim();
destination = $("#destination").val().trim();
firstTrain = moment($("#firstTrain").val().trim(), "LT").format("X");
frequency = $("#frequency").val().trim();

// then pushes data into database
database.ref().push({
  trainName : trainName,
  destination : destination,
  firstTrain : firstTrain,
  frequency : frequency,
  });

// then clears the input fields for the next entry!
$("#trainName").val("");
$("#destination").val("");
$("#firstTrain").val("");
$("#frequency").val("");

};


// Condition to state that if a "child" is added to the db, then the new data goes on the main page along with time stamps
database.ref().on("child_added", function(snapshot){
var train = snapshot.val().trainName;
var dest = snapshot.val().destination;
var fTrain = snapshot.val().firstTrain;
var freq = parseInt(snapshot.val().frequency);
var m = Math.ceil(parseInt(moment().diff(moment.unix(fTrain, "X"), 'minutes'))/freq);
var nextA = moment.unix(fTrain, "X").add(m*freq, "minutes");
var nextAr= moment(nextA).format("LT");
var minAway = moment(nextA).diff(moment(), "minutes")+1;

$("#trainTable > tbody").append("<tr><td>" + train + "</td><td>" + dest + "</td><td>" + freq + "</td><td>" + nextAr + "</td><td>" + minAway + "</td></tr>");

});