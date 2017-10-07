/*----- constants -----*/



/*----- app's state (variables) -----*/
//sets length of turn
var simonCount;
//stores Simon Array
var simonData;
//duration for countdown timer
var countDown;
//holds keydown data
var userData;
// holds count of user presses
var userCount;
//duration for flash animation in ms
var flashTime;
// game in play
var gameOn = false;
var timerDuration;
var easyTimer;
var hardTimer;
var clock;


//jQuery wrapper function

$(document).ready(function () {


  // ************************

  /*----- cached element references -----*/

  /*----- event listeners -----*/

  var keyListener = $('body').on('keydown', function(evt){
    if (event.keyCode == 84 && gameOn === true){
      console.log('enter press T')
      userData = "pad1";
      padOneFlash();
      checkClick();
    } else if (event.keyCode == 71 && gameOn === true){
      console.log('enter press G');
      userData = "pad2";
      padTwoFlash();
      checkClick();
    } else if (event.keyCode == 89 && gameOn === true){
      console.log('enter press Y'); 
      userData = "pad3";
      padThreeFlash();
      checkClick();
    } else if (event.keyCode == 72 && gameOn === true){
      console.log('enter press H');
      userData = "pad4";
      padFourFlash();
      checkClick();
    } 
      else if (event.keyCode == 32 && gameOn !== true){
      init();
    } else {
      return;
    }
  })

  // ************************
});
// ************************

 /*----- functions -----*/
  //Sets initial Gamestate:
function init() {
  simonCount = 1
  easyTimer = (900 * simonCount) + 200
  hardTimer = (300 * simonCount) + 100
  timerDuration = (900 * simonCount) + 200
  userTurn = 0;
  simonData = [];
  userCount = 0;
  flashTime = 400;
  gameOn = true;
  $('.pad').removeClass('loser');
  getSimonData();
}

//generate random data;
function getSimonData() {
  $('#display').text('Simon Turn')
  for (var i = 0; i < simonCount; i++) {
    var randInt = Math.random();
    if (randInt > 0.75) {
      simonData.push("pad1");
    } else if (randInt > 0.5) {
      simonData.push("pad2");
    } else if (randInt > 0.25) {
      simonData.push("pad3");
    } else { 
      simonData.push("pad4");
    }
  }
  console.log(simonData);
  renderSimonData();
}

function renderSimonData(){
  if (gameOn){
  setTimeout(startTimer, timerDuration)
  var offset = 200;
   for (var i = 0; i < simonData.length; i++){
      if (simonData[i] === 'pad1'){
        setTimeout(padOneFlash, (flashTime + offset))
      } else if (simonData[i] === 'pad2'){
        setTimeout(padTwoFlash, (flashTime + offset))
      } else if (simonData[i] === 'pad3'){
        setTimeout(padThreeFlash, (flashTime + offset))
      } else if (simonData[i] === 'pad4'){
        setTimeout(padFourFlash, (flashTime + offset))
      } 
      offset += (flashTime*1.5);
   }
  }
}

// compares user input to Simon Data;
function checkClick() {
  if (userData === simonData[userCount]) {
    console.log('good click');
    userCount += 1;
    console.log('usercount = '+ userCount)
    winCheck();
  } else {
    badClick();
  }
}

//checks for win to advance stage;
function winCheck(){
  if (userCount === simonData.length){
    nextStage();
    // window.clearTimeout(startTimer);
  }
}
// if bad click... 
function badClick() {
  console.log('bad click');
  window.clearTimeout(clock);
  $('.pad').toggleClass('loser');
  $('#display').text('play again? - click spacebar')
  gameOn = false;
}
  // starts countDown for user turn
function startTimer(){
  $('#display').text('User Turn');
  window.clearTimeout(clock);
  clock = window.setTimeout(badClick, timerDuration + 2000)
}

function padOneFlash(){
  $('.pad1').toggleClass('pad1Flash');
  setTimeout(function(){
    $('.pad1').toggleClass('pad1Flash');
  }, flashTime)
}

function padTwoFlash(){
  $('.pad2').toggleClass('pad2Flash');
  setTimeout(function(){
    $('.pad2').toggleClass('pad2Flash');
  }, flashTime)
}

function padThreeFlash(){
  $('.pad3').toggleClass('pad3Flash');
  setTimeout(function(){
    $('.pad3').toggleClass('pad3Flash');
  }, flashTime)
}

function padFourFlash(){
  $('.pad4').toggleClass('pad4Flash');
  setTimeout(function(){
    $('.pad4').toggleClass('pad4Flash');
  }, flashTime)
}

//advance to next stage.
function nextStage(){
  setTimeout(function(){$('.pad').toggleClass('winner')}, 300);
  setTimeout(function(){$('.pad').toggleClass('winner');}, 600)
  simonData = [];
  userCount = 0;
  simonCount += 1;
  console.log('next stage');
  window.clearTimeout(clock);
  timerDuration = (900 * simonCount) + 200;
  setTimeout(getSimonData, flashTime*2);
}



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