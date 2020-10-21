let audio;

function setup(){
    audio = createAudio('zymbel.mp3');
}


//======================================
//             PLAY/PAUSE
//======================================
// select play button
const playButton = document.querySelector('button');

//note that the button's attribute is set on 'loop'
playButton.addEventListener('click', function() {

    // check if context is in suspended state (autoplay policy)
    if (audio.state === 'suspended') {
        audio.resume();
    }

    // play or pause track depending on state
    if (this.dataset.playing === 'false') {
        console.log('I am playing');
        audio.play();
        audio.volume(1);
        this.dataset.playing = 'true';
    } else if (this.dataset.playing === 'true') {
        console.log("I've been paused");
        audio.pause();
        this.dataset.playing = 'false';
    }
}, false);



//========================================
//                 GAIN
//========================================

/*function volumeControl(){
    gainNode.gain.value = map(distance,0,500,0,1);
    let volume = gainNode.gain.value;
    console.log(volume);
}*/