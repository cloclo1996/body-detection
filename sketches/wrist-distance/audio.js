// for legacy browsers
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();  

// get the audio element
const audioElement = document.querySelector('audio');

// pass it into the audio context
const track = audioContext.createMediaElementSource(audioElement);
track.connect(audioContext.destination);

let distanceArray = [];
let distanceArray2 = [];


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
    
    
    if(average1 > 1){
        average1 = 1;
    }
    
    if(average1 < 0.2){
        average1 = 0;
    }




    
    //console.log(average);
    //document.getElementById("vignette").style.boxShadow = `inset 0px ${average*300}px 85px rgba(0,0,0,${average})`;
    audioElement.volume = parseFloat(average1).toFixed(2)

    console.log(audioElement.volume);
}

function pitchControl(){
    let total2 = 0;
    for(var i2 = 0; i2 < distanceArray2.length; i2++) {
        total2 += distanceArray2[i2];
    }

    if(i2 >= distanceArray2.length){
        i2=0;
    }

    let average2 = parseFloat(total2/distanceArray2.length).toFixed(2);

    if(average2 > 1){
        average2 = 1;
    }
    
    if(average2 < 0.2){
        average2 = 0;
    }
    
    audioElement.playbackRate = parseFloat(average2).toFixed(2);
}