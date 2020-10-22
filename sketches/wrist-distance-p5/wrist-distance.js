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
let vol;

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
    distance = round(body.getDistanceBetweenBodyParts(bodyParts.leftWrist, bodyParts.rightWrist))
    document.getElementById('output').innerText = `Distance between wrists: ${newDistance}`

    let newDistance = value_limit(distance,0,200);
    vol = map(newDistance,0,200,0,1);
    audio.volume(isFinite(vol));
    console.log(audio.volume());
    body.getDistanceBetweenBodyParts(bodyParts.leftWrist, bodyParts.rightWrist)
    //volumeControl();
})



// draw the video, left & right wrist onto the canvas
function draw(){   
    // draw the video element into the canvas
    ctx.drawImage(video, 0, 0, video.width, video.height);
    
    
    if (body) {
        // draw circle for left and right wrist
        const leftWrist = body.getBodyPart(bodyParts.leftWrist)
        const rightWrist = body.getBodyPart(bodyParts.rightWrist)

        // draw left wrist
        let c = color('magenta');
        fill(c);
        ellipse(leftWrist.position.x, leftWrist.position.y, 10,10);


        // draw right wrist
        c = color('red');
        fill(c);
        ellipse(rightWrist.position.x, rightWrist.position.y, 10, 10);
    }    
}


//=====================================
//              RUN
//=====================================

// start body detecting 
bodies.start()