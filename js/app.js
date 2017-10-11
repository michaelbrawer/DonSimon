/*----- constants -----*/


/*----- app's state (variables) -----*/

//sets score displayed on scoreboard
var scoreBoard;
//integer for scoreboard to increase
var scoreUp;
//sets length of turn
var simonCount;
//stores Simon Array
var simonData;
//holds keydown data
var userData;
// holds count of user presses
var userCount;
//duration for flash animation in ms
var flashTime;
// game in play
var gameOn;
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
var expertMode;
//soundSet currently active, targets gameSound array
var currentSound;
//holds crazy counter mode
var crazyCounter;

//default state on page load...
gameOn = false;
simonCount = 1;
currentSound = 'set1970';
expertMode = false;
scoreBoard = 0;

//jQuery wrapper function

$(document).ready(function () {

// ************************


  /*----- cached element references -----*/

    //array containing gamesound addresses
    var gameSounds = {
      initSound: {
        loadSound: new Howl({
          src: ['https://dl.dropboxusercontent.com/s/hw7rlg8fiwmwkvx/wipe.mp3?dl=1'],
          buffer: true
        })
      },
      set1963: {
        soundOne: new Howl({
          src: ['https://dl.dropboxusercontent.com/s/lkipjekblqr43gk/60H1.mp3?dl=1'],
          buffer: true
        }),
        soundTwo: new Howl({
          src: ['https://dl.dropboxusercontent.com/s/rjdruv4d55l7q7f/60H2.mp3?dl=1'],
          buffer: true
        }),
        soundThree: new Howl({
          src: ['https://dl.dropboxusercontent.com/s/vk8z6jwbnlubooz/60H3.mp3?dl=1'],
          buffer: true
        }),
        soundFour: new Howl({
          src: ['https://dl.dropboxusercontent.com/s/sy394rdoyk03l25/60H4.mp3?dl=1'],
          buffer: true
        }),
        winSound: new Howl({
          src: ['https://dl.dropboxusercontent.com/s/w326tg4f3egg9id/60sWin.mp3?dl=1'],
          buffer: true
        }),
        loseSound: new Howl({
          src: ['https://dl.dropboxusercontent.com/s/2mztl3bqmsds7aw/60sLoseLong.mp3?dl=1'],
          buffer: true
        })
      },
      set1970: {
        soundOne: new Howl({
          src: ['https://dl.dropboxusercontent.com/s/g96ez1oxzo4p9z3/70sHi1.mp3?dl=1'],
          buffer: true
        }),
        soundTwo: new Howl({
          src: ['https://dl.dropboxusercontent.com/s/v1agv03lkjqj9cu/70sHi2.mp3?dl=1'],
          buffer: true
        }),
        soundThree: new Howl({
          src: ['https://dl.dropboxusercontent.com/s/xl4t6cmat3w5q22/70sHi3.mp3?dl=1'],
          buffer: true
        }),
        soundFour: new Howl({
          src: ['https://dl.dropboxusercontent.com/s/q8nve96p47vhbdn/70sHi4.mp3?dl=1'],
          buffer: true
        }),
        winSound: new Howl({
          src: ['https://dl.dropboxusercontent.com/s/qhx56tytluv7lyy/70swin1.mp3?dl=1'],
          buffer: true
        }),
        loseSound: new Howl({
          src: ['https://dl.dropboxusercontent.com/s/ps0tsokqrfcr8i5/70slose.mp3?dl=1'],
          buffer: true
        }),
      },
      set2004: {
        soundOne: new Howl({
          src: ['https://dl.dropboxusercontent.com/s/xig1n41i21q5ae8/20Hi1.mp3?dl=1'],
          buffer: true
        }),
        soundTwo: new Howl({
          src: ['https://dl.dropboxusercontent.com/s/8oplugay2rojsez/20Hi2.mp3?dl=1'],
          buffer: true
        }),
        soundThree: new Howl({
          src: ['https://dl.dropboxusercontent.com/s/1cimx83x395vc1d/20Hi3.mp3?dl=1'],
          buffer: true
        }),
        soundFour: new Howl({
          src: ['https://dl.dropboxusercontent.com/s/7juppthphjpp2t3/20Hi4.mp3?dl=1'],
          buffer: true
        }),
        winSound: new Howl({
          src: ['https://dl.dropboxusercontent.com/s/b3j6i84nf5xecby/20Win1.mp3?dl=1'],
          buffer: true
        }),
        loseSound: new Howl({
          src: ['https://dl.dropboxusercontent.com/s/f00twi2mlt6djbk/20lose.mp3?dl=1'],
          buffer: true
        })
      }
    }
  
  /*----- event listeners -----*/

  //soundset and mode buttons

  var gameButtons = $('button').on('click', function () {
    switch (this.id) {
      case 'expertButton':
        if (!expertMode) {
          expertMode = true;
          scoreBoard = 0;
          badClick();
          renderScore();
          $('#display').text('expert mode - click / space to start')
          $('.page-header').css('background-color', 'rgba(198, 40, 40,.7)')
        }
        break;
      case 'normalButton':
        if (expertMode) {
          expertMode = false;
          scoreBoard = 0;
          badClick();
          renderScore();
          $('#display').text('normal mode - click / space to start')
          $('.page-header').css('background-color', 'rgba(98, 113, 120, .7)')
        }
        break;
      case '1963':
        $('body').css('background-image', 'url(https://i.imgur.com/Q3lyGYn.jpg)');
        // $(this).addClass('active').siblings('.soundset').removeClass('active');
        currentSound = 'set1963';
        break;
      case '1970':
        $('body').css('background-image', 'url(https://i.imgur.com/JV5PToT.jpg)');
        // $(this).addClass('active').siblings('.soundset').removeClass('active');
        currentSound = 'set1970';
        break;
      case '2004':
        $('body').css('background-image', 'url(https://i.imgur.com/O6Pik1v.jpg)');
        // $(this).addClass('active').siblings('.soundset').removeClass('active');
        currentSound = "set2004"
        break;
      default:
        return;
    }
  })

  // game play using mouse / pointer entry
  var clickListener = $('.pad').click(function () {
    if (gameOn) {
      userData = this.id;
      if (userData === 'pad1') {
        padOneFlash();
      } else if (userData === 'pad2') {
        padTwoFlash();
      } else if (userData === 'pad3') {
        padThreeFlash();
      } else if (userData === 'pad4') {
        padFourFlash();
      }
      checkClick();
    } else { return }
  });

  //click display to start
  $('#display').click(init);

  //using key entry
  var keyListener = $('body').on('keydown', function (evt) {
    if (event.keyCode == 84 && gameOn === true) {
      //key enter "T"
      userData = "pad1";
      checkClick();
      if (gameOn) { padOneFlash() }
    } else if (event.keyCode == 71 && gameOn === true) {
      //key enter "G"
      userData = "pad2";
      checkClick();
      if (gameOn) { padTwoFlash() }
    } else if (event.keyCode == 89 && gameOn === true) {
      //key enter Y
      userData = "pad3";
      checkClick();
      if (gameOn) { padThreeFlash() }
    } else if (event.keyCode == 72 && gameOn === true) {
      //key enter H
      userData = "pad4";
      checkClick();
      if (gameOn) { padFourFlash() }
    } else if (event.keyCode == 32 && gameOn !== true) {
      init();
    } else {
      return;
    }
  })

  // ************************

  /*----- GamePlay functions -----*/

  //initializes gameplay / mode variables / readies play state:
  function init() {
    if (expertMode) {
      countInteger = 2;
      timerDuration = (320 * simonCount) + 150;
      flashTime = 340;
      // flashTime = crazyCounter;
      scoreUp = 35;
    } else {
      countInteger = 1;
      timerDuration = (400 * simonCount) + 200;
      flashTime = 340;
      scoreUp = 10;
    }
    simonData = [];
    userCount = 0;
    gameOn = true;
    gameSounds.initSound.loadSound.play()
    renderScore();
    $('.pad').removeClass('loser');
    getSimonData();
  }

  //generate random data for simon...
  function getSimonData() {
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
    if (gameOn) { renderSimonData() }
  }

  //playback simon data as an animation...
  function renderSimonData() {
    if (gameOn) {
      $('#display').text('Simon Turn')
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
      userCount += 1;
      winCheck();
    } else {
      gameOn = false;
      scoreBoard = 0;
      badClick();
    }
  }

  //checks for win to advance stage;
  function winCheck() {
    if (userCount === simonData.length) {
      nextStage();
      renderScore();
    }
  }
  // if bad click... 
  function badClick() {
    window.clearTimeout(clock);
    gameOn = false;
    simonCount = 1;
    gameSounds[currentSound].loseSound.play()
    loseFlash();
  }

  // starts global countDown for user turn upon completion of simon render animation... 
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

  //user input rendering functions//

  // **************************

  //stage advance / loss animation
  function winFlash() {
    setTimeout(function () { gameSounds[currentSound].winSound.play() }, 300);
    setTimeout(function () { $('.pad').toggleClass('winner') }, 200);
    setTimeout(function () { $('.pad').toggleClass('winner'); }, 400);
    setTimeout(function () { $('.pad').toggleClass('winner') }, 600);
    setTimeout(function () { $('.pad').toggleClass('winner'); }, 800);
  }

  function loseFlash() {
    $('.pad').toggleClass('loser');
    $('#display').text('play again? - click  / spacebar');
  }

  function renderScore() {
    $('.scoreBoard').text("Score: " + scoreBoard);
  }

  // individual pad flash render functions... 
  function padOneFlash() {
    if (gameOn) {
      gameSounds[currentSound].soundOne.play();
      // gameSounds[currentSound].soundOne.play();
      //target audio object -> gameSounds[currentSound].pad1
      $('.pad1').toggleClass('pad1Flash');
      setTimeout(function () {
        $('.pad1').toggleClass('pad1Flash');
      }, flashTime)
    }
  }

  function padTwoFlash() {
    if (gameOn) {
      gameSounds[currentSound].soundTwo.play();
      $('.pad2').toggleClass('pad2Flash');
      setTimeout(function () {
        $('.pad2').toggleClass('pad2Flash');
      }, flashTime)
    }
  }

  function padThreeFlash() {
    if (gameOn) {
      gameSounds[currentSound].soundThree.play();
      $('.pad3').toggleClass('pad3Flash');
      setTimeout(function () {
        $('.pad3').toggleClass('pad3Flash');
      }, flashTime)
    }
  }

  function padFourFlash() {
    if (gameOn) {
      gameSounds[currentSound].soundFour.play();
      $('.pad4').toggleClass('pad4Flash');
      setTimeout(function () {
        $('.pad4').toggleClass('pad4Flash');
      }, flashTime)
    }
  }

  //popover handling
  $('[data-toggle="popover"]').popover()
  $('[data-toggle="tooltip"]').tooltip()
  $('.popover-dismiss').popover({
    trigger: 'focus key'
  })
  $(document).keyup(function (event) {
    $('.popover').hide();
  });

// ***************************

});

// ************************

//random timer for future crazy mode implementation
function getCrazyCounter() {
  var newCrazy = (Math.random() * 450);
  if (newCrazy < 150) {
    newCrazy = 150
  }
  else if (newCrazy > 400) {
    newCrazy = 400
  }
  crazyCounter = newCrazy
}

//icebox:
//PaperJs render animations for button flash
//vision impaired mode
//rotating backgroudns based on soundset (CHECK!!!)
//instructions popover (CHECK!!)
//gameplay on clicks & key entry (CHECK!!!)
//special layout for mobile w. clicks / minimal (CHECK!!)
////Normal/Expert toggles setTimeout interval (CHECK!!!)
//era toggle selects soundset (CHECK!!!)
//custom soundsets (CHECK!!)

//map styling to buchla 223
//multiple sountsets (CHECK!!!)

//data store highscore