var LayoutConfigs = nodecg.Replicant('layoutConfigs');
var videoCrops = nodecg.Replicant('videocrops');

var randomLayout = null;
var randoTracker = nodecg.Replicant("randoTracker");
var randoBase = nodecg.Replicant("randoBase");
var raceInfo = nodecg.Replicant("raceInfo");
var raceData = nodecg.Replicant("raceData");
var RunStatus = nodecg.Replicant('RunStatus');


var timer = nodecg.Replicant("timer");


//elements

const maintimer = document.getElementById("RaceTimer");
const timerDiv = document.getElementById("timer");
const playerNameDiv = document.getElementById("playerName");

const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

var ready = false;
const pl = urlParams.get('pl');
var id = pl;
var player = 0;
var layout = "OOT";
var playerData = {};


const controlerDiv = document.getElementById("controler");


raceInfo.on("change", (newVal, oldVal) => {
    optionsData = newVal.runners;
    for(var i=0; i < newVal.runners.length;i++){
        if(newVal.runners[i].id == pl){
            console.log(newVal.runners[i])
            player = i;
            ready = newVal.runners[i].status == "ready";
            const rdControl = document.getElementById("rdControl");
            if(rdControl){
                if(ready){
                    rdControl.innerHTML = "Undo Ready";
                }
                if(!ready){
                    rdControl.innerHTML = "Ready";
                }
            }
            playerData = {
                name:newVal.runners[i].name,
                channel: newVal.runners[i].alt || newVal.runners[i].stream,
                volume:1
            }
        }
    }
    
});

RunStatus.on("change", (newVal, oldVal) => {
        switch(newVal.general){
            case "waiting":
                if(ready){
                    controlerDiv.innerHTML = `<button id="rdControl" onclick="toggleReady()">Undo Ready</button>`;
                }else{
                    controlerDiv.innerHTML = `<button id="rdControl" onclick="toggleReady()">Ready</button>`;    
                }
                
                break;
            case "running":
                controlerDiv.innerHTML = `<button onclick="done()">Done</button><button onclick="forfeit()">Forfeit</button>`;
                break;
                
            default:
                controlerDiv.innerHTML = `<button id="rdControl" onclick="toggleReady()">Ready</button>`;
        }
});
    
randoTracker.on("change", (newVal, oldVal) => {
    updateTracker(newVal)
});


function resetTracker(player) {    
    nodecg.readReplicant("randoTracker", "Rando-Racer", (optionsOld) => {
        var newData =
        {
            layout: optionsOld.layout,
            runnerInfo:optionsOld.runnerInfo
        }
        if (optionsOld.layout == "OOT") {
            newData.runnerInfo[player].itens = baseData[0];
        }
        if (optionsOld.layout == "MMR") {
            newData.runnerInfo[player].itens = baseData[1];
        }
        if (layout == "ALTTP") {
            newData.runnerInfo[player].itens = baseData[2];
        }
        if (layout == "SMZ3") {
            newData.runnerInfo[player].itens = baseData[3];
        }
        randoTracker.value = newData;
    });
}

function updateTracker(newVal) {

    var medalwidth = "65px";
    var medalheight = "70px";

    var prizemarginT = "30px";
    var prizemargin = "5px";
    var prizewidth = "50px";
    var prizeheight = "20px";

    var itemwidth = "50px";
    var itemheight = "50px";

    var randoTrackerDiv = document.getElementById("tracker");
    if(randoTrackerDiv){

        randoTrackerDiv.style.height = "auto";
        randoTrackerDiv.innerHTML = "";
        var i = player;
    
        var newcontent = document.createElement('div');

        var tracker = "<span>Player " +(i+1) + " - "+ newVal.runnerInfo[i].name+"<span></br>";
        if(newVal.runnerInfo[i].itens){
            newVal.runnerInfo[i].itens.forEach(element => {
                var imgName = element.name;
                if (element.have == 0) {
                    imgName += "_fade";
                } else {
                    if (element.have != element.max || (element.have == element.max && element.max != 1) ) {
                        imgName += "_" + element.have;
                    }
                }
                
                if (element.type == "break") {
                    tracker += "</div><div style = 'margin-left:5px;'>";

                } else { 
                    switch (element.type) {
                        //OOT
                        case "jewel":
                            tracker += "<div style='display:inline-block; text-align: center;vertical-align: bottom;background-repeat: no-repeat;background-size: contain; background-image: url(\"Images//Tracker//"+newVal.layout+"//" + imgName + ".png\"); width:" + medalwidth + ";height :" + medalheight + "' onclick=\"addItem('" + element.name + "','"+layout+"',"+i+")\"><div class='location' style='margin-top:45px' onclick=\"rotateLocation('" + element.name + "','" + element.location + "','"+newVal.layout+"',"+i+")\">" + element.location + "</div></div>";
                        break;
                        case "medal":
                            tracker += "<div style='display:inline-block; text-align: center;vertical-align: bottom;background-repeat: no-repeat;background-size: contain; background-image: url(\"Images//Tracker//"+newVal.layout+"//" + imgName + ".png\"); width:" + itemwidth + ";height :" + itemheight + "' onclick=\"addItem('" + element.name + "','"+layout+"',"+i+")\"><div class='location' style='margin-top:35px' onclick=\"rotateLocation('" + element.name + "','" + element.location + "','"+newVal.layout+"',"+i+")\">" + element.location + "</div></div>";
                        break;
                        case "location":
                            tracker += "<div style='display:inline-block; text-align: center;vertical-align: bottom;background-repeat: no-repeat;background-size: contain;background-position: center; background-image: url(\"Images//Tracker//"+newVal.layout+"//" + imgName + ".png\"); width:" + itemwidth + ";height :" + itemheight + "' onclick=\"addItem('" + element.name + "','"+layout+"',"+i+")\"><div class='location' onclick=\"rotatePrize('" + element.name + "','" + element.prize + "','"+newVal.layout+"',"+i+")\" style='display:inline-block; text-align: center;vertical-align: bottom;background-repeat: no-repeat;background-size: contain;margin-top:"+prizemarginT+";margin-left:"+prizemargin+"; background-image: url(\"Images//Tracker//"+newVal.layout+"//" + element.prize + ".png\"); width:" + prizewidth + ";height :" + prizeheight + "'></div></div>";
                        break;
                        case "item":
                        case "music":
                        case "transf_mask":
                        case "boss_mask":
                            tracker += "<div style='display:inline-block;background-repeat: no-repeat;background-size: contain; background-image: url(\"Images//Tracker//"+newVal.layout+"//" + imgName + ".png\"); width:" + itemwidth + ";height :" + itemheight + "' onclick=\"addItem('" + element.name + "','"+layout+"',"+i+")\"></div>";
                            break;
                        case "space":
                            tracker += "<div style='display:inline-block;background-repeat: no-repeat;background-size: contain; width:" + itemwidth + ";height :" + itemheight + "' ></div>";
                            break;
                    }
                }
            });
            tracker += `<button onclick="resetTracker(${i})">Reset</button>`;    
        }
        newcontent.innerHTML = tracker;
        randoTrackerDiv.appendChild(newcontent);
        
    }

}

var prior = false;

function rotateLocation(name, location, type, player) {
    prior = true;
    var list = [];
    if (type == "OOT") {
        list = locationListOOT;
    }
    if (type == "ALTTP" || type == "SMZ3") {
        list = magicListALTTP;
    }
    
    var nextLoc = "";
    var ins = false;
    list.forEach((loc) => {
        if (ins) { 
            nextLoc = loc
            ins = false;
        }
        if (location == loc) { 
            ins = true;
        }
    });
    if (nextLoc == "") { 
        nextLoc = "???";
    }

    var newList = [];
    nodecg.readReplicant("randoTracker", "Rando-Racer", (optionsOld) => {
        if (optionsOld) {

            var infos = [];
            for (i = 0; i < optionsOld.runnerInfo.length; i++) {
                infos[i] = optionsOld.runnerInfo[i]
            }

            optionsOld.runnerInfo[player].itens.forEach((item) => {
                if (item.name == name) {
                    item.location = nextLoc;
                }
                newList.push(item);
            });

            infos[player].itens = newList;

            var full = {
                layout:optionsOld.layout,
                runnerInfo: infos
            }

            randoTracker.value = full;
        }
    });
    setTimeout(() => {
        prior = false
    }, 300);
}

function rotatePrize(name, prize, type, player) {
    prior = true;
    
    var nextLoc = "";
    var ins = false;
    locationListALTTP.forEach((loc) => {
        if (ins) { 
            nextLoc = loc
            ins = false;
        }
        if (prize == loc) { 
            ins = true;
        }
    });
    if (nextLoc == "") { 
        nextLoc = "unk";
    }

    var newList = [];
    nodecg.readReplicant("randoTracker", "Rando-Racer", (optionsOld) => {

        if (optionsOld) {

            
            var infos = [];
            for (i = 0; i < optionsOld.runnerInfo.length; i++) {
                infos[i] = optionsOld.runnerInfo[i]
            }

            optionsOld.runnerInfo[player].itens.forEach((item) => {
                if (item.name == name) {
                    item.prize = nextLoc;
                }
                newList.push(item);
            });

            infos[player].itens = newList;

            var full = {
                layout:optionsOld.layout,
                runnerInfo: infos
            }

            randoTracker.value = full;
        }
    });

    setTimeout(() => {
        prior = false
    }, 300);
}

function addItem(name, layout, player) {
    setTimeout(() => {
        if (prior == false) {
            var newList = [];
            nodecg.readReplicant("randoTracker", "Rando-Racer", (optionsOld) => {
                if (optionsOld) {

            
                    var infos = [];
                    for (i = 0; i < optionsOld.runnerInfo.length; i++) {
                        infos[i] = optionsOld.runnerInfo[i]
                    }
        
                    optionsOld.runnerInfo[player].itens.forEach((item) => {
                        if (item.name == name) {
                            item.have = item.have + 1;
                            if (item.have > item.max) {
                                item.have = 0;
                            }
                        }
                        newList.push(item);
                    });

                    infos[player].itens = newList;

                    var full = {
                        layout:optionsOld.layout,
                        runnerInfo: infos
                    }
        
                    randoTracker.value = full;

                }
            });
        }
    }, 200);
}

var baseData = [];
var locationListOOT = [];
var locationListALTTP = [];
var magicListALTTP = [];
var optionsData = [];

randoBase.on("change", (newVal, oldVal) => {

    baseData = newVal.baseData;
    locationListOOT = newVal.locationListOOT;
    locationListALTTP = newVal.locationListALTTP;
    magicListALTTP = newVal.magicListALTTP;

});

var id = "";
var playerName = "";

timer.on("change", (newVal, oldVal) => {
    maintimer.innerHTML = newVal;
});


var show = false;

function toggleVideo(){
    show = !show;
    if(show){
        showVideo();
    }else{
        hideVideo();
    }

}

function showVideo(){
    LoadVideos(playerData);
    var button = document.getElementById("vdController");
    button.innerHTML = "Hide Video";
}

function hideVideo(){
    var div = document.getElementById("containerPlayer");
    div.innerHTML = "";
    var button = document.getElementById("vdController");
    button.innerHTML = "Show Video";
}

function LoadVideos(playerData) {
    var options = {
        width: 800,
        height: 450,
        channel: playerData.channel,
        parent: "localhost",
        autoplay: true,
        muted: false
    };
    
    var div = document.getElementById("containerPlayer");
    div.innerHTML = "";

    if (div) { 
        var TwitchPlayer = new Twitch.Player("containerPlayer",options);
        TwitchPlayer.setVolume(parseFloat(playerData.volume));
    }
}

function toggleReady(){
    ready = !ready;
    if(ready){
        nodecg.sendMessage("readyRacer",{ id:pl });
    }
    if(!ready){
        nodecg.sendMessage("unreadyRacer",{ id:pl });
    }
}

function done(){
    nodecg.sendMessage("doneRacer",{ id:pl });
}
function forfeit(){
    nodecg.sendMessage("ffRacer",{ id:pl });
}