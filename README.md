# DonSimon
## A Buchla Electric Music Box Themed Simon Clone.
----
### Core Technologies Used:
- HTML
- CSS
- Javascript

### Additional Frameworks:
- jQuery - for DOM traversal / event handling
- Bootstrap - for styling / responsive grid
- Howler JS - for audio implmentation
----
### Getting Started: Installation instructions: (HOSTING)
----
DonSimon can be played via a touchscreen/mouse, but playing Simon is all about mashing buttons!  Fortunately for us, most users will have a bunch of great buttons right in front of them - aka the keyboard.  Accordingly, keys "T", "Y", "G" and "H" map to the pads in the game.  (Look at the keys, it makes sense).

Era toggles on the screen's left switch between 3 "eras" of Buchla synthesis:
- 1963 -  colorful sine wave based, frequency-modulated sounds of the Buchla 100.  Bongos!  
- 1973 - featurning the complex waveshaping of the greatest analog oscillator there ever was, and likely will ever be, the holy grail: the Buchla 259
- 2004 - Buchla goes digial.  Wavetables, aliasing, crispy bit-wise weirdness.  Good Times.

"Difficulty" toggle works two ways.  In easy mode, Simon increments by one move per turn, in difficult it increments by two.  In difficult mode, timers for flash duration and user count-out are also faster.

----
### Next Steps: Unsolved problems and/or planned features:
- Getting some slicker animations involved, possibly using paper JS.
- Mapping a larger, eight-pad game, to the principal touchkeys of a simulated Buchla 223e multi-dimensional   kinesthetic input tactile pad.
- Freeform mode: just play the pads
- Drummer mode: sync flashes interpolated drum patterns via Olivier Gillet's excellent open source code for [Grids](https://github.com/pichenettes/eurorack/tree/master/grids)
