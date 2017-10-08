/*----- constants -----*/



/*----- app's state (variables) -----*/
//sets length of turn
var simonCount;
simonCount = 1
//stores Simon Array
var simonData;
//holds keydown data
var userData;
// holds count of user presses
var userCount;
//duration for flash animation in ms
var flashTime;
// game in play
var gameOn = false;
//duration for coundown timer
var timerDuration;
//holds timer data for easy mode
var easyTimer;
//holds timer data for hard mode
var hardTimer;
//window timer for end-of-turn timeout
var clock;
var countInteger;

var expertMode = false;


//jQuery wrapper function

$(document).ready(function () {


  // ************************

  /*----- cached element references -----*/

  /*----- event listeners -----*/

  var expertButton = $('#expertButton').on('click', function(){
    expertMode = true;
    gameOne = false;
    // setTimeout(init, 200);
    $('.pad').removeClass('loser');
  })

  var normalButton = $('#normalButton').on('click', function(){
    expertMode = false;
    gameOne = false;
    // setTimeout(init, 500);
    $('.pad').removeClass('loser');
  })

  var keyListener = $('body').on('keydown', function (evt) {
    if (event.keyCode == 84 && gameOn === true) {
      console.log('enter press T')
      userData = "pad1";
      padOneFlash();
      checkClick();
    } else if (event.keyCode == 71 && gameOn === true) {
      console.log('enter press G');
      userData = "pad2";
      padTwoFlash();
      checkClick();
    } else if (event.keyCode == 89 && gameOn === true) {
      console.log('enter press Y');
      userData = "pad3";
      padThreeFlash();
      checkClick();
    } else if (event.keyCode == 72 && gameOn === true) {
      console.log('enter press H');
      userData = "pad4";
      padFourFlash();
      checkClick();
    }
    else if (event.keyCode == 32 && gameOn !== true) {
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
  if (expertMode){
    countInteger = 2
    timerDuration = (320 * simonCount) + 200
    flashTime = 340;
  } else {
    countInteger = 1
    timerDuration = (400 * simonCount) + 200
    flashTime = 400
  }

  // userTurn = 0;
  simonData = [];
  userCount = 0;
  // flashTime = 400;
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

function renderSimonData() {
  if (gameOn) {
    setTimeout(startTimer, timerDuration + (flashTime * (simonCount)));
    var offset = 200;
    for (var i = 0; i < simonData.length; i++) {
      if (simonData[i] === 'pad1') {
        setTimeout(padOneFlash, (flashTime + offset))
      } else if (simonData[i] === 'pad2') {
        setTimeout(padTwoFlash, (flashTime + offset))
      } else if (simonData[i] === 'pad3') {
        setTimeout(padThreeFlash, (flashTime + offset))
      } else if (simonData[i] === 'pad4') {
        setTimeout(padFourFlash, (flashTime + offset))
      }
      offset += (flashTime * 1.5);
    }
  }
}

// compares user input to Simon Data;
function checkClick() {
  if (userData === simonData[userCount]) {
    console.log('good click');
    userCount += 1;
    console.log('usercount = ' + userCount)
    winCheck();
  } else {
    badClick();
  }
}

//checks for win to advance stage;
function winCheck() {
  if (userCount === simonData.length) {
    nextStage();
    // window.clearTimeout(startTimer);
  }
}
// if bad click... 
function badClick() {
  simonCount = 1;
  console.log('bad click');
  window.clearTimeout(clock);
  $('.pad').toggleClass('loser');
  $('#display').text('play again? - click spacebar')
  gameOn = false;
}
// starts countDown for user turn
function startTimer() {
  $('#display').text('User Turn');
  window.clearTimeout(clock);
  clock = window.setTimeout(badClick, timerDuration + 1000)
}
//pad flash render functions... 
function padOneFlash() {
  $('.pad1').toggleClass('pad1Flash');
  setTimeout(function () {
    $('.pad1').toggleClass('pad1Flash');
  }, flashTime)
}

function padTwoFlash() {
  $('.pad2').toggleClass('pad2Flash');
  setTimeout(function () {
    $('.pad2').toggleClass('pad2Flash');
  }, flashTime)
}

function padThreeFlash() {
  $('.pad3').toggleClass('pad3Flash');
  setTimeout(function () {
    $('.pad3').toggleClass('pad3Flash');
  }, flashTime)
}

function padFourFlash() {
  $('.pad4').toggleClass('pad4Flash');
  setTimeout(function () {
    $('.pad4').toggleClass('pad4Flash');
  }, flashTime)
}

//advance to next stage.
function nextStage() {
  setTimeout(function () { $('.pad').toggleClass('winner') }, 200);
  setTimeout(function () { $('.pad').toggleClass('winner'); }, 400);
  setTimeout(function () { $('.pad').toggleClass('winner') }, 600);
  setTimeout(function () { $('.pad').toggleClass('winner'); }, 800);
  simonData = [];
  userCount = 0;
  simonCount += countInteger;
  console.log('next stage');
  window.clearTimeout(clock);
  timerDuration = (400 * simonCount) + 400;
  setTimeout(getSimonData, flashTime * 2);
}

//icebox:
//PaperJs render animations for button flash

//special layout for mobile w. clicks / minimal ui
////Normal/Expert toggles setTimeout interval
//flash state === keydown duration
//era toggle selects soundset
//custom soundsets

//map styling to buchla 223
//multiple sountsets