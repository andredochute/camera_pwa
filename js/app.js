window.onload = () => {
    "use strict";
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("./sw.js");
    }
};

var constraints = {video: {facingMode: "user"}, audio: false};

const cameraView = document.querySelector("#camera--view"),
cameraOutput = document.querySelector("#camera--output"),
cameraSensor = document.querySelector("#camera--sensor"),
cameraTrigger = document.querySelector("#camera--trigger")

function cameraStart(){
    navigator.midiaDevices
    .getUserMedia(constraints)
    .then(function(stream){
        track = stream.getTracks()[0];
        cameraView.srcObject = stream;
    })
    .catch(function(error){
        console.error("Oops. Somethins is broken.", error);
    });
}

cameraTrigger.onclick = function(){
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/webp");
    cameraOutput.classList.add("token");
};

window.addEventListener("load", cameraStart, false);