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