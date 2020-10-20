// @ts-nocheck

// Setup all nodes
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();    

// load some sound
const audioElement = document.querySelector('#zymbel');
const track = audioCtx.createMediaElementSource(audioElement);

// sets up a bodystream with configuration object
const bodies = new BodyStream ({
      posenet: posenet,
      architecture: modelArchitecture.MobileNetV1, 
      detectionType: detectionType.singleBody, 
      videoElement: document.getElementById('video'), 
      samplingRate: 100})
    
let body;
let distance;
let prevValueIsWithinDistance = false;
let currentValueIsWithinDistance = false;

currentValueIsWithinDistance = (distance > 10 && distance < 100);


bodies.addEventListener('bodiesDetected', (e) => {
    body = e.detail.bodies.getBodyAt(0)
    distance = Math.round(body.getDistanceBetweenBodyParts(bodyParts.leftWrist, bodyParts.rightWrist))
    currentValueIsWithinDistance = (distance > 20 && distance < 100)
    document.getElementById('output').innerText = `Distance between wrists: ${distance}`
    body.getDistanceBetweenBodyParts(bodyParts.leftWrist, bodyParts.rightWrist)
})


document.querySelector('button').addEventListener('click', function() {
        audioCtx.resume().then(() => {
        console.log("I am playing!");
        audioElement.play();
    });
});

//playButton.dataset.playing = false;
/*setInterval(()=>{
    if(audioCtx === 'suspended'){
        audioCtx.resume();
    }*/
//

/* ----- setup ------ 
// volume
const gainNode = audioCtx.createGain();

const volumeControl = document.querySelector('#volume');
volumeControl.addEventListener('input', function() {
gainNode.gain.value = this.value;
}, false);

// panning
const pannerOptions = {pan: 0};
const panner = new StereoPannerNode(audioCtx, pannerOptions);

const pannerControl = document.querySelector('#panner');
pannerControl.addEventListener('input', function() {
panner.pan.value = this.value;	
}, false);

// connect our graph
track.connect(gainNode).connect(panner).connect(audioCtx.destination);*/






// get elements
let video = document.getElementById("video");
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

// draw the video, nose and eyes into the canvas
function drawCameraIntoCanvas() {

    // draw the video element into the canvas
    ctx.drawImage(video, 0, 0, video.width, video.height);
    
    if (body) {
        // draw circle for left and right wrist
        const leftWrist = body.getBodyPart(bodyParts.leftWrist)
        const rightWrist = body.getBodyPart(bodyParts.rightWrist)

        // draw left wrist
        ctx.beginPath();
        ctx.arc(leftWrist.position.x, leftWrist.position.y, 10, 0, 2 * Math.PI);
        ctx.fillStyle = 'white'
        ctx.fill()

        // draw right wrist
        ctx.beginPath();
        ctx.arc(rightWrist.position.x, rightWrist.position.y, 10, 0, 2 * Math.PI);
        ctx.fillStyle = 'white'
        ctx.fill()
    }
    requestAnimationFrame(drawCameraIntoCanvas)
}

/* ----- run ------ */

// start body detecting 
bodies.start()
// draw video and body parts into canvas continously 
drawCameraIntoCanvas();

document.querySelector('button').addEventListener('click', function() {
    audioCtx.resume().then(() => {
      console.log('Playback resumed successfully');
    });
})