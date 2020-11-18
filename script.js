//global constant variables(some were given)
const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p"); //removed inner.html
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
const textArray = document.querySelector(".text");

const newText= document.querySelector("#newText");

const errorsamount = document.querySelector("#errors");



//Array of test words
const testWords = [
  
  "Checking.",
  "testing",
  "Hi",
  "Text to test."
];

//block-scoped local variable & globals
let timer = [0, 0, 0, 0];
let isOn = false;
let errors = 0;
let interval;


function init() {
  showWord(testWords);
}
// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time) {
  if (time <= 9) {
    time = "0" + time;
  }
  return time;
}


// Run a standard minute/second/hundredths timer:
function runTimer() {
  
  let currentTime =
    leadingZero(timer[0]) +
    ":" +
    leadingZero(timer[1]) +
    ":" +
    leadingZero(timer[2]);
  theTimer.innerHTML = currentTime;
  timer[3]++;

  timer[0] = Math.floor(timer[3] / 100 / 60);
  timer[1] = Math.floor(timer[3] / 100 - timer[0] * 60);
  timer[2] = Math.floor(timer[3] - timer[1] * 100 - timer[0] * 6000);
}

// Match the text entered with the provided text on the page:
function checkSpelling() {
  let textEntered = testArea.value;
  let originTextMatch = originText.innerHTML.substring(0, textEntered.length);
  
  
  if (textEntered == originText.innerHTML) {
    testWrapper.style.borderColor = "green";
    //here 
    clearInterval(interval);
   // topFiveRecord(timer);
  } else {
    if (textEntered == originTextMatch) {
      testWrapper.style.borderColor = "blue";
     // topFiveRecord(timer);
    } else {
      testWrapper.style.borderColor = "red";
      errors++;
      errorsamount.innerHTML = errors;
    }
  }
}

// Pick & show random lists of text
function showWord(testWords) {
  const randIndex = Math.floor(Math.random() * testWords.length); // Generate random array index
  originText.innerHTML = testWords[randIndex]; // Output random testWords
}
 //Word counter
function countWords(str) {
  return str.split(" ").filter(c => c != "").length;
}

// Start the timer:
function start() {
  let textEnteredLength = testArea.value.length;
  if (textEnteredLength === 0) {
    isOn = true;
    interval = setInterval(runTimer, 10);
  }
}
// Reset everything:
function reset() {
  clearInterval(interval);
  interval = null;
  timer = [0, 0, 0, 0];
  isOn = false;
  testArea.value = "";
  theTimer.innerHTML = "00:00:00";
  errors = 0;
  errorsamount.innerHTML = 0;
  testWrapper.style.borderColor = "gray";
  //window.alert ("your highest scores are : " + topFives );
}

function clickedNewText() {
  originText.innerHTML = testWords[Math.floor(Math.random() * testWords.length)];
  reset();
}

// Event listeners for keyboard input and the reset button:
window.addEventListener("load", init);
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", checkSpelling, false);
resetButton.addEventListener("click", reset, false);

//clickedNewText.addEventListener("click", , false);

newText.onclick = clickedNewText;
