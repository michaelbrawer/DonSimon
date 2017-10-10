/*----- constants -----*/
//array containing gamesound addresses
var gameSounds = [{}, {}, {}]


/*----- app's state (variables) -----*/
//sets scoreboard load state:
var scoreBoard = 0;
//integer for scoreboard to increase
var scoreUp;
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
//how many steps does each stage increment by
var countInteger;
//is expert mode engaged
var expertMode = false;
//soundSet currently active, targets gameSound array...
var currentSound;



//jQuery wrapper function

$(document).ready(function () {


  // ************************

  /*----- cached element references -----*/

  /*----- event listeners -----*/

  //mode buttons
var difficultyButtons = $('.difficulty').on('click', function(){
  if (this.id === "expertButton") {
    if (expertMode){return} else {
      expertMode = true;
      gameOne = false;
      init();
      }
  } else if (this.id === 'normal button') {
    if (!expertMode){return} else {
      expertMode = false;
      gameOne = false;
      init();
      }
  }
  $('.pad').removeClass('loser');
})

  //difficulty mode buttons (OLD)
  // var expertButton = $('#expertButton').on('click', function () {
  //   if (expertMode){return} else {
  //   init();
  //   expertMode = true;
  //   gameOne = false;
  //   $('.pad').removeClass('loser');
  //   }
  // })

  // var normalButton = $('#normalButton').on('click', function () {
  //   if (!expertMode){return} else {
  //   init();
  //   expertMode = false;
  //   gameOne = false;
  //   $('.pad').removeClass('loser');
  //   }
  // })

  //sound set selector buttons
  var chooseSound = $('.soundset').on('click', function(){
    if (this.id === "1963"){
      $('body').css('background-image', 'url(https://i.imgur.com/Q3lyGYn.jpg)');
    } else if (this.id === "1970") {
      $('body').css('background-image', 'url(https://i.imgur.com/JV5PToT.jpg)');
    } else if (this.id === '2004'){
      $('body').css('background-image', 'url(https://i.imgur.com/fwktNlT.jpg)');
    } else {return}
  });

  //using mouse / pointer entry
  var clickListener = $('.pad').click(function(){
    if (gameOn){
    userData = this.id;
    if (userData === 'pad1'){
      padOneFlash();
    } else if (userData === 'pad2'){
      padTwoFlash();
    } else if(userData === 'pad3'){
      padThreeFlash();
    } else if (userData === 'pad4'){
      padFourFlash();
    }
    checkClick();
  } else {return}
  });

  //click display to start
  $('#display').click(init);

  //using key entry
  var keyListener = $('body').on('keydown', function (evt) {
    if (event.keyCode == 84 && gameOn === true) {
      console.log("Enter Pad T")
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

  /*----- functions -----*/
//initializes gamestate/variables:
function init() {
  if (expertMode) {
    countInteger = 2;
    timerDuration = (320 * simonCount) + 200;
    flashTime = 340;
    scoreUp = 35;
  } else {
    countInteger = 1;
    timerDuration = (400 * simonCount) + 200;
    flashTime = 400;
    scoreUp = 10;
  }

  simonData = [];
  userCount = 0;
  gameOn = true;
  $('.pad').removeClass('loser');
  getSimonData();
}

//generate random data...
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

//playback simon data as an animation...
function renderSimonData() {
  if (gameOn) {
    setTimeout(startTimer, timerDuration + (flashTime * (simonCount)));
    //consider lowering this offset...
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
    userCount += 1;
    winCheck();
  } else {
    scoreBoard = 0;
    badClick();
  }
}

//checks for win to advance stage;
function winCheck() {
  if (userCount === simonData.length) {
    nextStage();
    $('.scoreBoard').text("Score: " + scoreBoard);
    // window.clearTimeout(startTimer);
  }
}
// if bad click... 
function badClick() {
  simonCount = 1;
  window.clearTimeout(clock);
  $('.pad').toggleClass('loser');
  $('.scoreBoard').text("Score: " + scoreBoard);
  $('#display').text('play again? - click  / spacebar')
  gameOn = false;
}

// starts countDown for user turn
function startTimer() {
  $('#display').text('User Turn');
  window.clearTimeout(clock);
  clock = window.setTimeout(badClick, timerDuration + 1000)
}

//advance to next stage.
function nextStage() {
  scoreBoard += scoreUp;
  simonData = [];
  userCount = 0;
  simonCount += countInteger;
  window.clearTimeout(clock);
  timerDuration = (400 * simonCount) + 200;
  winFlash();
  setTimeout(getSimonData, flashTime * 2);
}

//rendering functions//

//stage advance animation
function winFlash (){
  setTimeout(function () { $('.pad').toggleClass('winner') }, 200);
  setTimeout(function () { $('.pad').toggleClass('winner'); }, 400);
  setTimeout(function () { $('.pad').toggleClass('winner') }, 600);
  setTimeout(function () { $('.pad').toggleClass('winner'); }, 800);
}

//pad flash render functions... 
function padOneFlash() {
  //target audio object -> gameSounds[currentSound].pad1
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

});

// ************************



//icebox:
//PaperJs render animations for button flash
//vision impaired mode
//rotating backgroudns based on soundset (CHECK!!!)
//special layout for mobile w. clicks / minimal ui
////Normal/Expert toggles setTimeout interval (CHECK!!!)
//flash state === keydown duration
//era toggle selects soundset (CHECK!!!)
//custom soundsets

//map styling to buchla 223
//multiple sountsets