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
      samplingRate: 100})

//let prevValueIsWithinDistance = false;
//let currentValueIsWithinDistance = false;
//currentValueIsWithinDistance = (distance > 10 && distance < 100);

let distanceArray = [];

//Event listener is triggered when a body is detected
bodies.addEventListener('bodiesDetected', (e) => {
    body = e.detail.bodies.getBodyAt(0)
    distance = Math.round(body.getDistanceBetweenBodyParts(bodyParts.leftWrist, bodyParts.rightWrist))
    distance = value_limit(distance, 0, 100);
    //currentValueIsWithinDistance = (distance > 20 && distance < 100)
    document.getElementById('output').innerText = `Distance between wrists: ${distance}`
    body.getDistanceBetweenBodyParts(bodyParts.leftWrist, bodyParts.rightWrist)
})



// draw the video, left & right wrist onto the canvas
function draw() {
    // draw the video element into the canvas
    background(200);
    
    // draw the video element into the canvas
    ctx.drawImage(video, 0, 0, video.width, video.height);
    
    if (body) {
        // draw circle for left and right wrist
        const leftWrist = body.getBodyPart(bodyParts.leftWrist)
        const rightWrist = body.getBodyPart(bodyParts.rightWrist)

        // draw left wrist
        let c = color('magenta');
        fill(c);
        noStroke();
        circle(leftWrist.position.x, leftWrist.position.y, 10);

        // draw right wrist
        c = color('red')
        fill(c);
        noStroke();
        circle(rightWrist.position.x, rightWrist.position.y, 10);
    }
    draw();
}


//=====================================
//              RUN
//=====================================

// start body detecting 
bodies.start()