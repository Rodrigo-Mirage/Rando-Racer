
var timerReplicant = nodecg.Replicant('timer');
var raceInfo = nodecg.Replicant("raceInfo");

var timerDiv = document.getElementById('fullTimer');	
var RunBtn = document.getElementById('RunBtn');	
var RunStatus = nodecg.Replicant('RunStatus');

var timerInt = 0;
var timerString ="00:00:00.000"

timerReplicant.on('change',(newval,oldval)=>{
    timerDiv.innerHTML = newval;
    if(!newval){
        timerReplicant.value = timerString;
    }else{
        timerString = newval;
    }
});
var running = false;
var ready = false;
var block = false;

RunStatus.on("change",(newval,oldval)=>{
    console.log(newval);
    if(newval.general == "waiting" && newval.runners == "ready"){
        running = false;
        RunBtn.innerHTML = "Start";
    }
    if(newval.general == "started" && newval.runners == "ready"){
        running = true;
        RunBtn.innerHTML = "Pause";
    }
    if(newval.general == "waiting" && newval.runners == "waiting"){
        running = false;
        RunBtn.innerHTML = "Start When Ready";
    }
    if(newval.general == "started" && newval.runners == "waiting"){
        running = true;
        RunBtn.innerHTML = "Undo";
    }
    if(newval.general == "running"){
        running = true;
        block = true;
        RunBtn.innerHTML = "STOP";
    }
});



function toggleTimer(){
    running = !running;
    if(running){
        startTimer();
        RunBtn.innerHTML = "Pause";
    }else{
        pauseTimer();
        RunBtn.innerHTML = "Start";
    }
}
function startTimer(){
    nodecg.sendMessage('timerStart');
}

function pauseTimer(){
    nodecg.sendMessage('timerPause');
}

function resetTimer(){
    nodecg.sendMessage('setTimer',{"timer":-30});
}

function setToScreen(){
    timerDiv.innerHTML = timerString;
}

var raceTimers = document.getElementById('raceTimers');	

raceInfo.on("change", (newVal, oldVal) => {
    if(newVal){
        var html = "";

        for (i = 0; i < newVal.runners.length; i++) {
            html += `<div>`+newVal.runners[i].name+` : `+newVal.runners[i].status+`</div>`;
        }
    
        raceTimers.innerHTML = html;
    }
});