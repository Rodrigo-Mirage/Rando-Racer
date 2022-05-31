
var LayoutConfigs = nodecg.Replicant('layoutConfigs');

var videosConfig = {};
var videosList = [];

LayoutConfigs.on("change", (newVal, oldVal) => {
  if(!newVal){
      var obj = [
        {
            name:"1p_4_3",
            height:650,
            width:800
        },
        {
            name:"2p_4_3",
            height:650,
            width:800
        },
        {
            name:"3p_4_3",
            height:650,
            width:800
        },
        {
            name:"4p_4_3",
            height:650,
            width:800
        },
        {
            name:"1p_16_9",
            height:650,
            width:800
        },
        {
            name:"2p_16_9",
            height:650,
            width:800
        },
        {
            name:"3p_16_9",
            height:650,
            width:800
        },
        {
            name:"4p_16_9",
            height:650,
            width:800
        },
      ];
      LayoutConfigs.value = obj;
  }
});


function open() {
  var configs = LayoutConfigs.value;
  if(configs){
    configs.forEach(config=>{
      const videoHeight = document.getElementById("videoHeight_"+config.name);
      const videoWidth = document.getElementById("videoWidth_"+config.name);
      videoHeight.value=config.height;
      videoWidth.value=config.width;
    });
  }
}

document.addEventListener("dialog-confirmed", function () {
  var configs = LayoutConfigs.value;
  var newConfig = [];
  configs.forEach(config=>{
    const videoHeight = document.getElementById("videoHeight_"+config.name);
    const videoWidth = document.getElementById("videoWidth_"+config.name);
    newConfig.push({
      name:config.name,
      height:videoHeight.value,
      width:videoWidth.value
    });
  });
  LayoutConfigs.value = newConfig;
});


document.addEventListener("dialog-dismissed", function () {
});

document.addEventListener("dialog-opened", function () {
  open();
});
