// for legacy browsers
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();  

// get the audio element
const audioElement = document.querySelector('audio');

// pass it into the audio context
const track = audioContext.createMediaElementSource(audioElement);
track.connect(audioContext.destination);


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
//                 GAIN
//========================================

//Work in progress...
const gainNode = audioContext.createGain();
track.connect(gainNode).connect(audioContext.destination);

function volumeControl(){
    let total = 0;
    for(var i = 0; i < distanceArray.length; i++) {
        total += distanceArray[i];
    }

    //if we are at the end of the array....
    if(i >= distanceArray.length){
        i = 0
    }

    //create an average
    let average = parseFloat(total/distanceArray.length).toFixed(2);
    
    if(average>1){
        average = 1;
    }
    
    if(average < 0){
        average = 0;
    }

    console.log(average);
    gainNode.gain.value = parseFloat(average).toFixed(2);
    console.log(gainNode.gain.value);
}