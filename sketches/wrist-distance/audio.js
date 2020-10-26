//const { StereoPannerNode } = require("standardized-audio-context");

// for legacy browsers
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();  

// get the audio element
const audioElement = document.querySelector('audio');

// pass it into the audio context
const track = audioContext.createMediaElementSource(audioElement);
track.connect(audioContext.destination);

const gainNode = audioContext.createGain();
let panner = audioContext.createStereoPanner();

let distanceArray = [];
let distanceArray2 = [];
let noseToPannerArray = [];

//======================================
//             PLAY/PAUSE
//======================================
// select play button
const playButton = document.querySelector('button');

//note that the button's attribute is set on 'loop'
playButton.addEventListener('click', function() {

    // check if context is in suspended state (autoplay policy)
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }

    // play or pause track depending on state
    if (this.dataset.playing === 'false') {
        console.log('I am playing');
        audioElement.play();
        this.dataset.playing = 'true';
    } else if (this.dataset.playing === 'true') {
        console.log("I've been paused");
        audioElement.pause();
        this.dataset.playing = 'false';
    }
    
}, false);



//========================================
//                 VOLUME
//========================================

function volumeControl(){
    let total = 0;
    
    for(var i = 0; i < distanceArray.length; i++) {
        total += distanceArray[i];
    }



    //if we are at the end of the array....
    if(i >= distanceArray.length){
        i = 0;
    }



    //create an average
    let average1 = parseFloat(total/distanceArray.length).toFixed(2);
    
    if(average1 > (panValueVol + 0.2)){
        average1 = 0.01;
    }

    /*if(average1 >= (panValueVol + 0.2)){
        average1 = average1 + 0.02;
    }*/

    else if(((panValueVol - 0.2) <= average1) && (average1 >= (panValueVol + 0.2))){
        average1 = 1;
    }

    /*if((average1 <= panValue) && (average1 >= panValue)){
        average1 = 0;
    }*/


    /*if(average1 <= (panValueVol - 0.2)){
        average1 = average1 - 0.02;
    }*/

    else if(average1 < (panValueVol - 0.2)){
        average1 = 0.01;
    }

    else{
        average1 = 0.01;
    }

    
    track.connect(gainNode);
    gainNode.gain.value = average1;
    gainNode.connect(audioContext.destination);
    console.log(`volume: ${gainNode.gain.value}`);
    //audioElement.volume = parseFloat(average1).toFixed(2)

    //console.log(audioElement.volume);
}

function pitchControl(){
    let total2 = 0;
    for(var i2 = 0; i2 < distanceArray2.length; i2++) {
        total2 += distanceArray2[i2];
    }

    if(i2 >= distanceArray2.length){
        i2=0;
    }

    let average2 = total2/distanceArray2.length;

    if(average2 > 2){
        average2 = 2;
    }

    if(0.8 > average2 > 1.2){
        average = 1;
    }
    
    if(average2 < 0.2){
        average2 = 0;
    }
    
    audioElement.playbackRate = parseFloat(average2).toFixed(2);
}

function setNewPan(){
    average3 = 0;
    panValue = getRandomArbitrary(0,500);
}

function pannerControl(){
    let total = 0;
    for(var i=0; i<noseToPannerArray.length; i++){
        total += noseToPannerArray[i];
    }

    if(i >= noseToPannerArray.length){
        i=0;
    }

    let average3 = total/noseToPannerArray.length;

    //make average needs to match panValue
    if(average3 < pannerValue){
        average3 = -1;
    }

    /*if(average3 >= (panValue + 0.2)){
        average3 = average3 + 0.2;
    }*/

    else if(average3 >= (pannerValue - 0.3) && average3 <= (pannerValue + 0.3)){
        setInterval(setNewPan(),5000);
    }

    /*if((average1 <= panValue) && (average1 >= panValue)){
        average1 = 0;
    }*/


    /*if(average3 <= (panValue - 0.2)){
        average3 = average3 - 0.2;
    }*/

    else if(average3 > pannerValue){
        average3 = 1;
    }

    track.connect(panner);
    panner.pan.value = average3;
    panner.connect(audioContext.destination);
    console.log(`panner: ${panner.pan.value}`);
}