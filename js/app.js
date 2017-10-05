$(document).ready(function() {

  /*----- constants -----*/

  /*----- app's state (variables) -----*/

  /*----- cached element references -----*/

  /*----- event listeners -----*/

  /*----- functions -----*/

});

//Gamestate:

//era toggle selects soundset
//Normal/Expert toggles setTimeout interval

//spacebar to begin...

//getSimonTurn

//Generate Simon Array length of turn -> initialize @ 1 -> force random into .25 increment, to String, returning '1', '2', '3', '4'

//Render Simon Turn Array from index[0]

// loop through array & flash pad states accordingly

//howlerJS plays back corresponding sounds

//setTimeout interval between renders according to difficulty set by user in Normal/Expert Button


//userTurn

//Start coundown to turn timeout of interval*length of turn + some slop for human

//while...
//4 different keys return '1', '2', '3', '4' correspondingly
//render pad flash

//upon keypress check for match with index of Simon Array
//if match playback "match" howl
//increment simonTurn length +1
//getSimonTurn...

//ifmismatch - user loses
//render 'lose' state, set SimonTurn to []

//wait for spacebar to begin...
