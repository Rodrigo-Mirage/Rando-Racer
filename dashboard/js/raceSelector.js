var raceList = nodecg.Replicant("raceList");
var raceInfo = nodecg.Replicant("raceInfoCurrent");
var nextRaceInfo = nodecg.Replicant("nextraceInfoCurrent");
var previousRaceInfo = nodecg.Replicant("prevraceInfoCurrent");
const currentDataDiv = document.getElementById("currentData");

var currentid = "";
var nextid = "";
var previd = "";


raceInfo.on("change", (newVal, oldVal) => {
    if(!newVal){
        nodecg.readReplicant("raceList", "Rando-Racer", (list) => {
            if(list){
                if(list.length>0){
                    raceInfo.value = list[0];
                    currentid = list[0].id;
                }
            }
        });
    }else{
        currentid = newVal.id;
        nodecg.readReplicant("raceList", "Rando-Racer", (list) => {
            if(list){
                setList(list);
            }
        });
    }
    setup(newVal);
});


raceList.on("change", (newVal, oldVal) => {
    setList(newVal);
});

function setList(list){
    var set = false;
    if(list){
        list.forEach(race => {
            if(set){
                nextid = race.id;
            }else{
                if(race.id == currentid){
                    set = true;
                    if(previd == currentid){
                        previd = "";
                    }
                }else{
                    previd = race.id;
                }
            }
            if(nextid){
                if(nextid == currentid){
                    nextid = "";
                }
            }
        });
        const preBtn = document.getElementById("preBtn");
        const nexBtn = document.getElementById("nexBtn");
        if(!nextid){
            nexBtn.disabled = true;
        }else{
            nexBtn.disabled = false;
        }

        if(!previd){
            preBtn.disabled = true;
        }else{
            preBtn.disabled = false;
        }
}
}



function next(){
    setCurrent(nextid)
}

function previous(){
    setCurrent(previd)
}

function setCurrent(set){
    nodecg.readReplicant("raceList", "Rando-Racer", (list) => {
        if(list){
            list.forEach(race => {
                if(race.id == set){
                    raceInfo.value = race;
                }
            });
        }
    });
}




function setup(runData){
    if(runData){
        const currentDataDiv = document.getElementById("currentData");
        var html = `<div>
        <fieldset>
        <legend>Runner(s)</legend> 
        <div id='CurrentRunners'>`;
        var versus= "";
        runData.runners.forEach(runner=>{
            if(versus != ""){
                versus +=" Vs ";
            }
            versus += runner.name;
        });
        html+=versus;
        html+=`</div></fieldset>
        <fieldset>
        <legend>Jogo</legend> ${runData.jogo}
        </fieldset>
        <fieldset>
        <legend>Host(s)</legend> ${runData.hosts}
        </fieldset>
        </div>`;
        currentDataDiv.innerHTML = html;
    }
}