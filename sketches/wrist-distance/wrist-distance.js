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

// sets up a bodystream with configuration object
const bodies = new BodyStream ({
      posenet: posenet,
      architecture: modelArchitecture.MobileNetV1, 
      detectionType: detectionType.singleBody, 
      videoElement: document.getElementById('video'), 
      samplingRate: 250})



//Event listener is triggered when a body is detected
bodies.addEventListener('bodiesDetected', (e) => {
    body = e.detail.bodies.getBodyAt(0);
    
    distance = Math.round(body.getDistanceBetweenBodyParts(bodyParts.rightWrist, bodyParts.leftWrist))
    

    //distance is limited between 0 and 100. So that we can use it later for volumeControl().
    let newDistance = value_limit(distance, 0, 500);
    distance = map2(newDistance,0,500,0,1);
    distance2 = map2(newDistance,0,500,1,2);
    //console.log(distance);
    //an array of with 5 distances is used in volumeControl() 
    //to detect an increase or decrease of distance. 
    if(distanceArray.length >= 5){
        //once the array is completely populated, a value is removed.
        distanceArray.shift();
    }

    if(distanceArray2.length >= 5){
        distanceArray2.shift();
    }
    distanceArray2.push(distance2)
    distanceArray.push(distance);

    //console.log(distanceArray);

    //console.log('a');

    volumeControl();
    pitchControl();

    //console.log('b');


    document.getElementById('output').innerText = `Distance between wrists: ${distance}`
    body.getDistanceBetweenBodyParts(bodyParts.rightWrist, bodyParts.leftWrist)
})


// draw the video, left & right wrist onto the canvas
function drawCameraIntoCanvas() {

    // draw the video element into the canvas
    ctx.drawImage(video, 0, 0, video.width, video.height);
    
    if (body) {
        // draw circle for left and right wrist
        const rightShoulder = body.getBodyPart(bodyParts.rightWrist)
        const rightHip = body.getBodyPart(bodyParts.leftWrist)

        // draw left wrist
        ctx.beginPath();
        ctx.arc(rightShoulder.position.x, rightShoulder.position.y, 10, 0, 2 * Math.PI);
        ctx.fillStyle = 'purple'
        ctx.fill()

        // draw right wrist
        ctx.beginPath();
        ctx.arc(rightHip.position.x, rightHip.position.y, 10, 0, 2 * Math.PI);
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