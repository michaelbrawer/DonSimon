/*----- constants -----*/



/*----- app's state (variables) -----*/
//sets length of turn
var simonCount;
//stores Simon Array
var simonData;
//duration for countdown timer
var countDown;
//holds keydown data
var keypress;



//jquery wrapper function


$(document).ready(function () {


  // ************************

  /*----- cached element references -----*/

  /*----- event listeners -----*/
  $('body').on('keydown', function(evt){
    if (event.keyCode == 84){
      console.log('enter press T');
    } else if (event.keyCode == 71){
      console.log('enter press G');
    } else if (event.keyCode == 89){
      console.log('enter press Y'); 
    } else if (event.keyCode == 72){
      console.log('enter press H');
    }
  })
  /*----- functions -----*/
  //Initiaize Gamestate:




  // ************************
});
// ************************

//functions

function init() {
  simonCount = 1
  userTurn = 0;
  userData = ''
  simonData = [];
}

function getSimonData() {
  for (var i = 0; i < simonCount; i++) {
    var randInt = Math.random();
    if (randInt > .75) {
      simonData.push("pad1");
    } else if (randInt > .5) {
      simonData.push("pad2");
    } else if (randInt > .25) {
      simonData.push("pad3");
    } else {
      simonData.push("pad4");
    }
  }
}

function checkClick() {
  if (userData === simonData[simonCount - 1]) {
    goodClick();
  } else {
    badClick();
  }
}

function goodClick() {
  console.log('good click');
  simonCount += 1;
}

function badClick() {
  console.log('bad click');
}

init();



//constants:
//activeTurn;
//keydata{};

//spacebar to begin...

//getSimonTurn

//Generate Simon Array length of turn -> initialize @ 1 -> force random into .25 increment, to String, returning '1', '2', '3', '4'

//Generate Simon Turn Array push string output by random.

// increment through array & render pad states accordingly

//howlerJS plays back corresponding sounds

//setTimeout interval between index renders according to difficulty set by user in Normal/Expert Button

//restore render default pad state 

//upon playback completion, start user timer countdown (inc. human turn slop)


//userTurn

//render display "go player"

//while...
//4 different keys return pushing  'pad1', 'pad2', 'pad3', 'pad4' correspondingly to userTurn array
//check return against SimonTurn[playerTurn]
//increment playerturn+

//render pad flash

//upon keypress check for match with index of Simon Array
//if match playback "match" howl

//if playerturn > simonturn.length, get simonturnlength+1
//getSimonTurn...


//ifmismatch - user loses
//render 'lose' state, set SimonTurn to []

//wait for spacebar to begin...

//icebox:
//PaperJs render animations for button flash

//special layout for mobile w. clicks / minimal ui
////Normal/Expert toggles setTimeout interval
//flash state === keydown duration
//era toggle selects soundset
//custom soundsets

//map styling to buchla 223

//multiple sountsets