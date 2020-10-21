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
    for(let i=0; distanceArray.length>=5; i++){
        distanceArray[i]/100;
    }

    if(distance[0]<distance[4]){
        gainNode.gain.value++;
    } else if (distance[0]>distance[4]){
        gainNode.gain.value--;
    }

    console.log(gainNode.gain.value);
}

//need custom event?
/*volumeControl.addEventListener('input', function() {
    gainNode.gain.value = this.value;
}, false);*/