// some logics are learned from linkedin Learning JavaScript Essential Training
//global constant variables(some were given)
const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p"); //had to remove inner.html, otherwise everytime it will take the text from the html 
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
const textArray = document.querySelector(".text");
const randomText= document.querySelector("#randomText");
const totalErrors = document.querySelector("#errors");
const topfivenum = document.querySelector("#topFive");

//Array of texts 
const texts = [ 
  "Checking.",
  "testing",
  "Hi",
  "Text to test."
];

// This is the timer 
var currentTime;
// I need this variable to assign value 
var topFiveNumbers;
//  In this array I will store the top 5 times
var topScores = new Array();

//  let allows to declare variables that are limited to the scope of a block statement, or expression on which it is used
//we need the array if timer as we will show the timw as min sec and mili sec
let timer = [0, 0, 0, 0];
//it ensures that when we start, the timer is off
let timerIsOn = false;
// we will assign numbers to errors. 
let errors = 0;
// we will need interval 
let interval;


// This function is adding leading zeroes for 1 digit values. for example, 1:1:10 will show 01:01:10
function leadingZero(time) {
  if (time <= 9) {
    // we are adding string to a int value. Javascript is flexiable. Later, if we need to use it as int, it will work as int as it is still a number 
    time = "0" + time;
  }
  return time;
}


// It will start the timer.
function startTimer() {
  // now we are calling leading zero function with the min sec and mil sec and getting the whole time in the formet we want
   currentTime =
    leadingZero(timer[0]) +
    ":" +
    leadingZero(timer[1]) +
    ":" +
    leadingZero(timer[2]);
  // display current time
  theTimer.innerHTML = currentTime;
  //update the value
  timer[3]++;
  // display the different values
  // math object to find floor is used to avoid decimals
  // to get the minute 
  timer[0] = Math.floor((timer[3] / 100) / 60);
  // to get the second
  timer[1] = Math.floor((timer[3] / 100) - (timer[0] * 60));
  // to get the milisecond
  timer[2] = Math.floor(timer[3] - timer[1] * 100 - timer[0] * 6000);
}

function topFiveScores(currentTime) {
  // we need to push the times first
  topScores.push(currentTime);
 // Now we will sort the array
  topScores.sort();
  //Now selecting the top five times and it will be stored in topFives
  topFiveNumbers = topScores.slice(0, 5);
  
}

// This function is checking the spelling of the input
function checkSpelling() {
  // it will get the strings
  let textEntered = testArea.value;
  // the sub string will treat the array as sub string
  // we will start from zero, and will return as text entered 
  // it will ensure two equal length string
  let originTextMatch = originText.innerHTML.substring(0, textEntered.length);
  // check if the two string is equal 
  if (textEntered == originText.innerHTML) {
    // if the given text and the inout is same, change the border color to green
    testWrapper.style.borderColor = "green";
    // call the topFiveScore function to store the time
    topFiveScores(currentTime);
    clearInterval(interval);
    // update the topFives value in the html to show
    topfivenum.innerHTML = topFiveNumbers;
  } else { // if the texts are not equal 
    if (textEntered == originTextMatch) {
      
      // now if the substrings are equal, the border will be blue
      testWrapper.style.borderColor = "blue";
    } else { //if not equal, the border will be red
      testWrapper.style.borderColor = "red";
      // whenever it will be wrong, we will increase the errors var 
      errors++;
      // then we will put that in the html
      totalErrors.innerHTML = errors;
    }
  }
}

// Start the timer:
function start() {
  // first key strock will be 0 in the console
  let textEnteredLength = testArea.value.length;
  // we need to add the timerIsOn condition as well, otherwise it will not be able to handle if we start with wrong string. The timer will not stop
  if (textEnteredLength === 0 && timerIsOn === false) {
    timerIsOn = true;
    // when it starts, set an interval, start the timer and run it for every thousand of seconds
    interval = setInterval(startTimer, 10);
  }
}
// Reset everything:
function reset() {
  // reset the interval
  clearInterval(interval);
  interval = null;
  // need to reset the time 
  timer = [0, 0, 0, 0];
  // stop the timer 
  timerIsOn = false;
  testArea.value = "";
  // reset the html 
  theTimer.innerHTML = "00:00:00";
  // reset the error number 
  errors = 0;
  // reset errors in the html 
  totalErrors.innerHTML = 0;
  // after resetting, the border color will be gray again
  testWrapper.style.borderColor = "gray";
}

// This function is for new text. It will select random texts from the given array of texts 
function clickedRandomText() {
  originText.innerHTML = texts[Math.floor(Math.random() * texts.length)];
  // It will also call the reset function to reset evrything
  reset();
}

// Event listeners for keyboard input and the reset button:
// testarea is the box that we need to work with
// we need "keypress". whenever the user will press anything, the start function will start the timer
testArea.addEventListener("keypress", start, false);
// when the user will press the randomText button, it will call the function
randomText.addEventListener("click", clickedRandomText, false);
// whenever the user will stype anything, it will start checking the speeling
testArea.addEventListener("keyup", checkSpelling, false);
// the reset button will call the reset function
resetButton.addEventListener("click", reset, false);
