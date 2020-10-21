// @ts-nocheck
//==========================================
//              SETUP CANVAS
//==========================================
let video = document.getElementById("video");
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");



//==========================================
//                 BODY
//==========================================
let body;
let distance; //distance between wrists
let distanceArray = [];

// sets up a bodystream with configuration object
const bodies = new BodyStream ({
      posenet: posenet,
      architecture: modelArchitecture.MobileNetV1, 
      detectionType: detectionType.singleBody, 
      videoElement: document.getElementById('video'), 
      samplingRate: 100})



//Event listener is triggered when a body is detected
bodies.addEventListener('bodiesDetected', (e) => {
    body = e.detail.bodies.getBodyAt(0)
    distance = Math.round(body.getDistanceBetweenBodyParts(bodyParts.leftWrist, bodyParts.rightWrist))
    
    //=======================================
    //        !!PROBLEM HERE!!
    //         VOLUME CONTROL
    //=======================================


    /*We have been trying to run the function 'volumeControl()' from the audio.js file here
    in this event listener. So every time the distance is measured, we can use its value in
    volumeControl(). But this function seems to freeze the body detection all together.
    How can we prevent this? */

    //distance is limited between 0 and 100. So that we can use it later for volumeControl().
    distance = value_limit(distance, 0, 100);

    //an array of with 5 distances is used in volumeControl() 
    //to detect an increase or decrease of distance. 
    if(distanceArray.length >= 5){
        //once the array is completely populated, a value is removed.
        distanceArray.pop();
    }else{
        distanceArray.push(distance);
    } 


    document.getElementById('output').innerText = `Distance between wrists: ${distance}`
    body.getDistanceBetweenBodyParts(bodyParts.leftWrist, bodyParts.rightWrist)
})


// draw the video, left & right wrist onto the canvas
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
        ctx.fillStyle = 'purple'
        ctx.fill()

        // draw right wrist
        ctx.beginPath();
        ctx.arc(rightWrist.position.x, rightWrist.position.y, 10, 0, 2 * Math.PI);
        ctx.fillStyle = 'red'
        ctx.fill()
    }
    requestAnimationFrame(drawCameraIntoCanvas)
}



//=====================================
//              RUN
//=====================================

// start body detecting 
bodies.start()
// draw video and body parts into canvas continously 
drawCameraIntoCanvas();