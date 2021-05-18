var changeCropData = nodecg.Replicant("changeCropData");
var optionsData = nodecg.Replicant("optionsData");

const VideoDiv = document.getElementById("Video");
const container = document.getElementById("container");
const crop = document.getElementById("crop");
const myRange = document.getElementById("myRange");
var sliderDiv = document.getElementById("sliderAmount");

var height = 381;
var width = 679;
var lay = 0;
    crop.style.width = width + "px";
    crop.style.height = height + "px";
//508

var prop = 100;
var id;
var channel;
var layout;

var cropX = 0;
var cropY = 0;

var cam = false;

function open() {
  var options = {
    width: width,
    height: height,
    channel: channel,
    parent: "localhost",
    autoplay: true,
    muted: true,
  };
  if (layout == "4") {
    lay = 171;
  }
  if (layout == "16") {
    lay = 0;
  }

  Player = new Twitch.Player("Video", options);
  Player.setVolume("0.0");
  sliderDiv.value = prop;
  myRange.value = prop;
  resize(prop,VideoDiv);
}
document.addEventListener("dialog-confirmed", function () {
  VideoDiv.innerHTML = "";
  var data = {
    id: id,
    channel: channel,
    layout: layout,
    prop: prop,
  };

  var newList = [];
  nodecg.readReplicant("optionsData", "Brat", (optionsOld) => {
    optionsOld.forEach((run) => {
      if (data.id == run.idRun) {
        if (cam) {
          run.camProp = prop;
        } else { 
          run.crops.forEach((crop) => {
            if (data.channel == crop.channel) {
              crop.prop = data.prop;
            }
          });
        }
      }
      newList.push(run);
    });
    optionsData.value = newList;
  });
});

document.addEventListener("dialog-dismissed", function () {
  VideoDiv.innerHTML = "";
});

document.addEventListener("dialog-opened", function () {
  nodecg.readReplicant("changeCropData", "Brat", (crop) => {
    id = crop.id;
    channel = crop.channel;
    layout = crop.layout;
    prop = crop.prop;
    if (crop.layout) {
      cam = false;
    } else { 
      cam = true;
    }
    open();
  });
});

myRange.onchange = function () {
  prop = this.value;
  sliderDiv.value = prop;
  resize(this.value,VideoDiv);
};

sliderDiv.onchange = function () {
  prop = this.value;
  myRange.value = this.value;
  resize(this.value,VideoDiv);
};

function resize(value,Div) {
  var tocrop = 100 - value;
  cropX = (tocrop / 100) * width;
  cropY = (tocrop / 100) * height;

  crop.style.overflow = "hidden";
  if (cam) {
    Div.firstChild.style.marginTop = "-" + cropY  + "px";
  } else { 
    Div.firstChild.style.marginLeft = "-" + ((cropX) + lay) + "px";
    Div.firstChild.style.marginBottom = "-" + ( cropY)+ "px";
  }

  Div.firstChild.style.width = width + cropX  + "px";
  Div.firstChild.style.height = height + cropY + "px";
  
}
