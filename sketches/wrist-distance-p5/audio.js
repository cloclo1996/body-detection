let mySound;
function preload() {
  soundFormats('mp3');
  mySound = loadSound('zymbel');
}

function setup() {
    let cnv = createCanvas(100, 100);
    cnv.mousePressed(canvasPressed);
    background(220);
    text('tap here to play', 10, 20);
}


//======================================
//             PLAY/PAUSE
//======================================
function canvasPressed() {
    // playing a sound file on a user gesture
    // is equivalent to `userStartAudio()`
    mySound.play();

    //volume
    mySound.setVolume(0.1);
}
