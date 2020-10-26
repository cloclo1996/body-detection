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
let nose;
let noseX;
let coreX;
//let panValue = getRandomArbitrary(-1,1);
let panValue = getRandomArbitrary(0,500);
let pannerValue;
let panValueVol;

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
    //let newDistance = value_limit(distance, 0, 500);
    //distance = map2(newDistance,0,500,0,1);
    //let distance2 = map2(newDistance,0,500,0,2);

        //get right & left shoulder
        let rightShoulder = body.getBodyPart(bodyParts.rightShoulder);
        let leftShoulder = body.getBodyPart(bodyParts.leftShoulder);



        //get core X and Y position
        let coreY = (rightShoulder.position.y + leftShoulder.position.y)/2
        coreX = (rightShoulder.position.x + leftShoulder.position.x)/2;

        //remap values to use them later
        let coreXVolume =  map2(coreX,0,500,0,1);
        panValueVol = map2(panValue,0,500,0,1);
        let coreYPitch = map2(coreY,0,500,0,2);
        let coreXPanner = map2(coreX,0,500,-1,1);
        pannerValue = map2(panValue,0,500,-1,1);


    //to detect an increase or decrease of distance. 
    if(distanceArray.length >= 10){
        //once the array is completely populated, a value is removed.
        distanceArray.shift();
    }

    if(distanceArray2.length >= 10){
        distanceArray2.shift();
    }

    if(noseToPannerArray.length >= 10){
        noseToPannerArray.shift();
    }
    
    //volume
    distanceArray.push(coreXVolume);
    
    //pitch
    distanceArray2.push(coreYPitch)
   

    //get the nose
    //nose = body.getBodyPart(bodyParts.nose);
    //noseX = map2(nose.position.x, 0,800,1,-1);

    //panner
    noseToPannerArray.push(coreXPanner);

    

    //console.log(distanceArray);

    //console.log('a');

    if((distance < 60) && (coreY > 250)){
        //console.log('I am playing');
        console.log(coreY)
        audioElement.play();
        pannerControl();
        volumeControl();
        pitchControl();  
    }



    if((distance >= 60) || (coreY <= 250)){
        //console.log("I've been paused");
        audioElement.pause();
    }
    

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