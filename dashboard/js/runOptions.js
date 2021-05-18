var optionsData = nodecg.Replicant("optionsData");
var optionsActiveData = nodecg.Replicant("optionsActiveData");
var optionsNextData = nodecg.Replicant("optionsNextData");

var changeCropData = nodecg.Replicant("changeCropData");

var speedcontrolBundle = "nodecg-speedcontrol";
var runDataActiveRun = nodecg.Replicant("runDataActiveRun", speedcontrolBundle);
var runDataArray = nodecg.Replicant("runDataArray", speedcontrolBundle);

var idRun = 0;
var idNextRun = 0;
const gameName = document.getElementById("gameName");
const couch = document.getElementById("couch");
const layout = document.getElementById("layout");
const crop = document.getElementById("crops");
const cam = document.getElementById("cam");
const rando = document.getElementById("rando");

const gameNameNext = document.getElementById("gameNameNext");
const layoutNext = document.getElementById("layoutNext");
const cropNext = document.getElementById("cropsNext");
const couchNext = document.getElementById("couchNext");
const camNext = document.getElementById("camNext");
const randoNext = document.getElementById("randoNext");

optionsData.on("change", (newVal, oldVal) => {
  if (newVal != oldVal) {
    nodecg.readReplicant(
      "runDataActiveRun",
      speedcontrolBundle,
      (activeVal) => {
        SetActive(activeVal);
      }
    );
  }
});

runDataActiveRun.on("change", (newVal, oldVal) => {
  if (newVal) SetActive(newVal);
});

runDataArray.on("change", (newVal, oldVal) => {
  if (newVal) SetAll(newVal);
});

optionsActiveData.on("change", (newVal, oldVal) => {
    gameName.innerHTML = newVal.gameName ? newVal.gameName : "";
    var text =
      "<button onclick='SetRatio(\"" +
      newVal.idRun +
      '","' +
      newVal.layout +
      "\")'>setRatio</button>";
    layout.innerHTML = (newVal.layout ? newVal.layout : "") + text;
    var htmlCrops = "";
    if (newVal.crops) {
      newVal.crops.forEach((crop) => {
        if (htmlCrops != "") {
          htmlCrops += "<br>";
        }
        htmlCrops +=
          crop.channel + ': <button class="nodecg-configure round-button" nodecg-dialog="setCrop" onclick="openCrop(\'' +
          newVal.idRun +
          "','" +
          crop.channel +
          "','" +
          newVal.layout +
          "','" +
          crop.prop +
          "')\">Crop</button>";
        
        cam.innerHTML = "<button onclick=\"SetCam(\'" + newVal.idRun + "'," + (newVal.cam ? newVal.cam : false) + ")\">Camera " + (newVal.cam ? "ON" : "Off") + "</button>";
        if (newVal.cam) { 
          cam.innerHTML += "<button class='nodecg-configure round-button' nodecg-dialog='setCrop' onclick=\"CropCam(\'" + newVal.idRun + "','" +
                crop.channel +"','" +
                newVal.camProp +"')\">Camera Crop</button>";
        }
      });
      crop.innerHTML = htmlCrops;
    }
  couch.value = (newVal.couch ? newVal.couch : "");

  var randoText = "RANDOM :";
  randoText += (!newVal.rando ? "Nenhum" : newVal.rando);
  randoText += "<button onclick=\"SetRando(\'" + newVal.idRun + "',null)\">Nenhum</button>";
  randoText += "<button onclick=\"SetRando(\'" + newVal.idRun + "','OOT')\">OOT</button>";
  randoText += "<button onclick=\"SetRando(\'" + newVal.idRun + "','MMR')\">MMR</button>";
  randoText += "<button onclick=\"SetRando(\'" + newVal.idRun + "','SMZ3')\">SMZ3</button>";
  randoText += "<button onclick=\"SetRando(\'" + newVal.idRun + "','Convidado')\">Convidado</button>";
  rando.innerHTML = randoText;
});

optionsNextData.on("change", (newVal, oldVal) => {
    gameNameNext.innerHTML = newVal.gameName ? newVal.gameName : "";
    var text =
      "<button onclick='SetRatio(\"" +
      newVal.idRun +
      '","' +
      newVal.layout +
      "\")'>setRatio</button>";
    layoutNext.innerHTML = (newVal.layout ? newVal.layout : "") + text;
    var htmlCrops = "";
    if (newVal.crops) {
      newVal.crops.forEach((crop) => {
        if (htmlCrops != "") {
          htmlCrops += "<br>";
        }
        htmlCrops +=
          crop.channel + ': <button class="nodecg-configure round-button" nodecg-dialog="setCrop" onclick="openCrop(\'' +
          newVal.idRun +
          "','" +
          crop.channel +
          "','" +
          newVal.layout +
          "','" +
          crop.prop +
          "')\">Crop</button>";
        
          camNext.innerHTML = "<button onclick=\"SetCam(\'" + newVal.idRun + "'," + (newVal.cam ? newVal.cam : false) + ")\">Camera " + (newVal.cam ? "ON" : "Off") + "</button>";
          if (newVal.cam) { 
            camNext.innerHTML += "<button class='nodecg-configure round-button' nodecg-dialog='setCrop' onclick=\"CropCam(\'" + newVal.idRun + "','" +
                crop.channel +"','" +
                newVal.camProp +"')\" >Camera Crop</button>";
          }
      });
      cropNext.innerHTML = htmlCrops;
    }
  couchNext.value = (newVal.couch ? newVal.couch : "");
  
  var randoText = "RANDOM :";
  randoText += (!newVal.rando ? "Nenhum" : newVal.rando);
  randoText += "<button onclick=\"SetRando(\'" + newVal.idRun + "',null)\">Nenhum</button>";
  randoText += "<button onclick=\"SetRando(\'" + newVal.idRun + "','OOT')\">OOT</button>";
  randoText += "<button onclick=\"SetRando(\'" + newVal.idRun + "','MMR')\">MMR</button>";
  randoText += "<button onclick=\"SetRando(\'" + newVal.idRun + "','SMZ3')\">SMZ3</button>";
  randoNext.innerHTML = randoText;
    
});

function openCrop(id, channel, layout, prop) {
  var data = {
    id: id,
    channel: channel,
    layout: layout,
    prop: prop,
  };
  changeCropData.value = data;
}

function CropCam(id, channel, prop) {
  var data = {
    id: id,
    channel: channel,
    prop: prop,
  };
  changeCropData.value = data;
}

function SetAll(runs) {
  var optList = [];

  runs.forEach((element) => {
    var players = [];
    for (var i = 0; i < element.teams.length; i++) {
      for (var j = 0; j < element.teams[i].players.length; j++) {
        players.push({
          prop: "100",
          channel: element.teams[i].players[j].social.twitch,
        });
      }
    }

    var thisOptions = {
      idRun: element.id,
      gameName: element.game,
      layout: "16",
      crops: players,
      cam: false,
      camProp: 100,
      rando: null
    };

    optList.push(thisOptions);
  });

  var newList = [];
  nodecg.readReplicant("optionsData", "Brat", (optionsOld) => {
    optList.forEach((opt) => {
      if (optionsOld) {
          optionsOld.forEach((old) => {
            if (opt.idRun == old.idRun) {
              opt.layout = old.layout;
              opt.gameName = old.gameName;
              opt.crops = old.crops;
              opt.cam = old.cam;
              opt.camProp = old.camProp;
              opt.rando = old.rando;
            }
          });
          newList.push(opt);
      }
    });
    optionsData.value = newList;
  }); 
}

function SetActive(activeRun) {
  var next = false;
  nodecg.readReplicant("optionsData", "Brat", (optionsOld) => {
    if (optionsOld) {
      optionsOld.forEach((opt) => {
        if (next) {
          optionsNextData.value = opt;
          idNextRun = opt.idRun
          next = false;
        }
        if (opt.idRun == activeRun.id) {
          optionsActiveData.value = opt;
          idRun = opt.idRun
          next = true;
        }
      });
    }
  });
}

function SetRatio(id, layout) {
  var newList = [];
  nodecg.readReplicant("optionsData", "Brat", (optionsOld) => {
    if (optionsOld) {
      optionsOld.forEach((run) => {
        if (id == run.idRun) {
          if (layout == "16") {
            run.layout = "4";
          } else {
            run.layout = "16";
          }
        }
        newList.push(run);
      });
      optionsData.value = newList;
    }
  });
}

function SetCam(id, camStatus) {
  var newList = [];

  nodecg.readReplicant("optionsData", "Brat", (optionsOld) => {
    if (optionsOld) {
      optionsOld.forEach((run) => {
        if (id == run.idRun) {
          run.cam = !camStatus;
        }
        newList.push(run);
      });
      optionsData.value = newList;
    }
  });
}

function SetRando(id, random) {
  var newList = [];
      console.log(random)
  nodecg.readReplicant("optionsData", "Brat", (optionsOld) => {
    if (optionsOld) {
      optionsOld.forEach((run) => {
        if (id == run.idRun) {
          run.rando = random;
        }
        newList.push(run);
      });
      optionsData.value = newList;
    }
  });
}

function SetCouch(act) {
  var test = 0;
  if (act) {
    ch = couch.value
    test = idRun
  } else { 
    ch = couchNext.value
    test = idNextRun
  }

  var newList = [];
  nodecg.readReplicant("optionsData", "Brat", (optionsOld) => {
    optionsOld.forEach((run) => {
      if (test == run.idRun) {
        run.couch = ch;
      }
      newList.push(run);
    });
    optionsData.value = newList;
  });
}