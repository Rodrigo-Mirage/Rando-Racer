var hostName = nodecg.Replicant("hostName");
var raceInfo = nodecg.Replicant("raceInfo"); 
var randoTracker = nodecg.Replicant("randoTracker"); 
var videoPositions = nodecg.Replicant("videoPositions");
var timerReplicant = nodecg.Replicant('timer');

var videoPos;
var runnersData;
var pNumber;
var trackerData;

videoPositions.on("change", (newVal, oldVal) => {
    videoPos = newVal;
    if(newVal != oldVal){
        setData();
    }
});

timerReplicant.on("change", (newVal, oldVal) => {
    var div = document.getElementById("timer");
    if(div){
        div.innerHTML = newVal;
    }
});

hostName.on("change", (newVal, oldVal) => {
    var div = document.getElementById("hosts");
    if(div){
        div.innerHTML = newVal;
    }
});


raceInfo.on("change", (newVal, oldVal) => {
    runnersData = newVal;
    if(pNumber != newVal.runners.length ){
        pNumber = newVal.runners.length;
        setDivs(pNumber);
    }
    if(newVal != oldVal ){

        setData();
    }
});

var setting = false;
var setuped = false;

function setData(){
    if(videoPos && runnersData){
        setting = true;
        for(var runner in runnersData.runners){
            var data = runnersData.runners[runner];
            var pPosition = parseInt(runner)+1;
            var position = videoPos.indexOf(pPosition);
            if(position > -1){
                console.log(data);
                console.log(position);
                console.log(pPosition);

                var Name = document.getElementById(`Runner${position}Name`);
                var Social = document.getElementById(`Runner${position}Social`);
                var Tracker = document.getElementById(`Runner${position}Tracker`);

                Name.innerHTML = data.name;
                Social.innerHTML = " /"+data.stream;

            }
        }
        setting = false;
    }
    updateTracker();
}

function setDivs(pNumber){
    var html = "";
    for(var i = 0 ; i < pNumber ; i++){
        html += `<div id ="Runner${i}Name"></div>
        <div id ="Runner${i}Social"></div>
        <div id ="Runner${i}Player"></div>
        <div id ="Runner${i}Tracker"></div>`;
    }
    html +="<div id='prizes'><div  id='prizes0'></div><div  id='prizes1'></div></div>";
    html +="<div id='hosts'></div>";
    html +="<div id='timer'></div>";
    var div = document.getElementById("canvas");
    div.innerHTML = html;
    setuped = true;
}

randoTracker.on("change", (newVal, oldVal) => {
    trackerData = newVal;
    if(setuped){
        updateTracker();
    }
});

function updateTracker() {
    if(trackerData){
        var newVal = trackerData;
        if(videoPos){
            var medalwidth = "65px";
            var medalheight = "70px";
    
            var prizemarginT = "30px";
            var prizemargin = "5px";
            var prizewidth = "50px";
            var prizeheight = "20px";
    
            var itemwidth = "60px";
            var itemheight = "60px";
            var layout = newVal.layout;
            if(newVal.runnerInfo){
                for (i = 0; i < newVal.runnerInfo.length; i++) {
    
                    var position = videoPos.indexOf(i+1);
                    if(position > -1){
    
                        var randoTrackerDiv = document.getElementById(`Runner${position}Tracker`);
                        randoTrackerDiv.style.height = "auto";
                        randoTrackerDiv.innerHTML = "";
    
                        var newcontent = document.createElement('div');
    
                        var tracker = "<div class='trackLine'>";
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
                                    tracker += "</div><div class='trackLine'>";
    
                                } else { 
                                    switch (element.type) {
                                        //OOT
                                        case "jewel":
                                           // tracker += "<div style='display:inline-block; text-align: center;vertical-align: bottom;background-repeat: no-repeat;background-size: contain; background-image: url(\"Images//Tracker//"+newVal.layout+"//" + imgName + ".png\"); width:" + medalwidth + ";height :" + medalheight + "' onclick=\"addItem('" + element.name + "','"+layout+"',"+i+")\"><div class='location' style='margin-top:45px'  \">" + element.location + "</div></div>";
                                        break;
                                        case "medal":
                                           // tracker += "<div style='display:inline-block; text-align: center;vertical-align: bottom;background-repeat: no-repeat;background-size: contain; background-image: url(\"Images//Tracker//"+newVal.layout+"//" + imgName + ".png\"); width:" + itemwidth + ";height :" + itemheight + "' onclick=\"addItem('" + element.name + "','"+layout+"',"+i+")\"><div class='location' style='margin-top:35px'  \">" + element.location + "</div></div>";
                                        break;
                                        case "location":
                                           // tracker += "<div style='display:inline-block; text-align: center;vertical-align: bottom;background-repeat: no-repeat;background-size: contain;background-position: center; background-image: url(\"Images//Tracker//"+newVal.layout+"//" + imgName + ".png\"); width:" + itemwidth + ";height :" + itemheight + "'  \"><div class='location'  \" style='display:inline-block; text-align: center;vertical-align: bottom;background-repeat: no-repeat;background-size: contain;margin-top:"+prizemarginT+";margin-left:"+prizemargin+"; background-image: url(\"Images//Tracker//"+newVal.layout+"//" + element.prize + ".png\"); width:" + prizewidth + ";height :" + prizeheight + "'></div></div>";
                                        break;
                                        case "item":
                                        case "music":
                                        case "transf_mask":
                                        case "boss_mask":
                                            tracker += "<div class='trackItem' style='background-repeat: no-repeat;background-size: contain; background-image: url(\"Images//Tracker//"+newVal.layout+"//" + imgName + ".png\");' \"></div>";
                                            break;
                                        case "space":
                                            tracker += "<div class='trackItem' style='background-repeat: no-repeat;background-size: contain;' ></div>";
                                            break;
                                    }
                                }
                            });
                        }

                        var prizes = "";
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
                                    prizes += "</div><div style = 'margin-left:5px;'>";
    
                                } else { 
                                    switch (element.type) {
                                        //OOT
                                        case "jewel":
                                            prizes += "<div class='prize' style='display:inline-block; text-align: center;vertical-align: bottom;background-repeat: no-repeat;background-size: contain; background-image: url(\"Images//Tracker//"+newVal.layout+"//" + imgName + ".png\");' \"><div class='location'   \">" + element.location + "</div></div>";
                                        break;
                                        case "medal":
                                            prizes += "<div  class='prize' style='display:inline-block; text-align: center;vertical-align: bottom;background-repeat: no-repeat;background-size: contain; background-image: url(\"Images//Tracker//"+newVal.layout+"//" + imgName + ".png\");' \"><div class='location'   \">" + element.location + "</div></div>";
                                        break;
                                        case "location":
                                            prizes += "<div  class='prize' style='display:inline-block; text-align: center;vertical-align: bottom;background-repeat: no-repeat;background-size: contain;background-position: center; background-image: url(\"Images//Tracker//"+newVal.layout+"//" + imgName + ".png\");'  \"><div class='location'  \" style='display:inline-block; text-align: center;vertical-align: bottom;background-repeat: no-repeat;background-size: contain; background-image: url(\"Images//Tracker//"+newVal.layout+"//" + element.prize + ".png\"); '></div></div>";
                                        break;
                                        case "item":
                                        case "music":
                                        case "transf_mask":
                                        case "boss_mask":
                                           // tracker += "<div style='display:inline-block;background-repeat: no-repeat;background-size: contain; background-image: url(\"Images//Tracker//"+newVal.layout+"//" + imgName + ".png\"); width:" + itemwidth + ";height :" + itemheight + "' \"></div>";
                                            break;
                                        case "space":
                                            // tracker += "<div style='display:inline-block;background-repeat: no-repeat;background-size: contain; width:" + itemwidth + ";height :" + itemheight + "' ></div>";
                                            break;
                                    }
                                }
                            });
                        }

                        var prizeTracker = document.getElementById(`prizes${position}`);
                        prizeTracker.innerHTML = prizes;
                        newcontent.innerHTML = tracker;
                        randoTrackerDiv.appendChild(newcontent);
    
                    }
    
                }
            }
        }
    }
}