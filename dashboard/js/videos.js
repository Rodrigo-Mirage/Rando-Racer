var raceInfo = nodecg.Replicant("raceInfoCurrent");
var videosInfo = nodecg.Replicant("videosInfoCurrent");
const currentDataDiv = document.getElementById("currentData");
const videoSelects = document.getElementById("videoSelects")
var videoPositions = nodecg.Replicant("videoPos");

var slots = 0;
var selectList=[];

videosInfo.on("change", (newVal, oldVal) => {
    setup(newVal);
});


function setup(data){

    var html = "";
    if(data){
        data.forEach(runner => {
            html += `<fieldset><legend>${runner.name}</legend>`;
            if(runner.qualities.length ==0){
                html += ` <label class="bubble_off">Offline</label>`;
            }else{
                html += ` Stream: <a href='http://twitch.tv/${runner.channel}' target='_blank'>${runner.channel}<a><br>`;
                html += ` Qualidades:<br>`;
                runner.qualities.forEach(quality => {
                    html += `<button class='${quality.set==true? 'set':'unset'}' onclick="setQuality('${runner.id}','${quality.name}')" >${quality.name}</button>`;
                });
                html += `<br>Controle:<br>`;
                
                html += `<button onclick="switchStatus('${runner.id}','${runner.status}')" >${runner.status=="play"?"Pause":"Play"}</button>`;
                if(runner.volume == 0){
                    html += `<button onclick="focusAudio('${runner.id}')" >Foco</button>`;
                }


            }html += `</fieldset>`;
        });
    }
    currentDataDiv.innerHTML = html;
}
videoPositions.on("change", (newVal, oldVal) => {
});

raceInfo.on("change", (newVal, oldVal) => { 
    nodecg.readReplicant("videoPos", "Rando-Racer", (newrace) => {
        if(!newrace){
            videoPositions.value = [];        
            slots = 0;
        }else{
            slots = newrace.length;
            selectList = newrace;
        }

        if(newVal.layout){
            slots = parseInt(newVal.layout[0]);
        }
        var html = "";
        for(var i = 0 ; i<slots ; i++){
            var selected = "";  
            if(selectList[i]){
                selected = selectList[i];
            }
            
            html += `<select id='SelectVideo${i}'>`;
            html += `<option value=''>Video ${i}</option>`;
            newVal.runners.forEach(runner=>{
                html += `<option ${selected!="" && runner.id == selected?"selected":""} value='${runner.id}'>${runner.name}</option>`;
            });
            html += "</select>";
        }
        html += `<button onclick="reposicionar()" >Reposicionar</button>`;

        videoSelects.innerHTML = html;
    });
});

function reposicionar(){
    var data = [];
    for(var i = 0 ; i < slots ; i++){
        const select = document.getElementById(`SelectVideo${i}`);
        data.push(select.value);
    }
    videoPositions.value = data;
}


function switchStatus(id,status){
    if(status == "play"){
        nodecg.sendMessage('pausePlayer',{id});
    }else{
        nodecg.sendMessage('playPlayer',{id});
    }

}

function focusAudio(id){
    nodecg.sendMessage('FocusPlayer',{id});
}


function setQuality(id,quality){
    var runner = videosInfo.value.filter(a=>a.id = id);
    if(runner){
        var qualities = runner[0].qualities;
        var newQualis = [];
        qualities.forEach(q=>{
            var quali ={
                name:q.name,
                url:q.url,
                set:(q.name == quality)
            }
            newQualis.push(quali);
        })
        runner[0].qualities = newQualis;
    }
}

function reload(){
    nodecg.sendMessage('reloadVideos');
}