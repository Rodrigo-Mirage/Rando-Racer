var LayoutConfigs = nodecg.Replicant('layoutConfigs');

var videosConfig = {};
var videosList = [];

LayoutConfigs.on("change", (newVal, oldVal) => {
  if(newVal){
      videosConfig = newVal.videosConfig;
      videosList = newVal.videosList;
  }else{
      var obj = {
          videosConfig : {
              height:450,
              width:800
          },
          videosList:[
              {   
                  x:0,
                  y:0
              },
              {   
                  x:1000,
                  y:0
              }
          ]
      };
      LayoutConfigs.value = obj;
  }
});

const videoHeight = document.getElementById("videoHeight");
const videoWidth = document.getElementById("videoWidth");
const videoNumber = document.getElementById("videoNumber");


function open() {
  videoHeight.value = videosConfig.height;
  videoWidth.value = videosConfig.width;
  videoNumber.value = videosList.length;
  setPositions();
}

document.addEventListener("dialog-confirmed", function () {
  var videosObj = [];
  for(var i=0; i < videoNumber.value; i++){
    const videoPositionX = document.getElementById("videoPositionX"+i);
    const videoPositionY = document.getElementById("videoPositionY"+i);
    videosObj.push({x:parseInt(videoPositionX.value),y:parseInt(videoPositionY.value)});
  }
  var obj = {
    videosConfig : {
        height:parseInt(videoHeight.value),
        width:parseInt(videoWidth.value)
    },
    videosList: videosObj
  };
  LayoutConfigs.value = obj;
});

videoNumber.onchange = function () {
  setPositions();
};

function setPositions(){
  var html =""
  for(var i=0; i < videoNumber.value; i++){
    html+=`
    <fieldset>
    X: <input id="videoPositionX${i}" type="number" step="1" min="1" value="${( videosList[i]?videosList[i].x:0)}"/>
    Y: <input id="videoPositionY${i}" type="number" step="1" min="1" value="${( videosList[i]?videosList[i].y:0)}"/>
    </fieldset>
    `;
  }
  const videoPositions = document.getElementById("videoPositions");
  videoPositions.innerHTML = html;
}


document.addEventListener("dialog-dismissed", function () {
});

document.addEventListener("dialog-opened", function () {
  open();
});
