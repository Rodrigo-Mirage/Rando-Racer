var raceInfo = nodecg.Replicant("raceInfoCurrent");
var videosInfo = nodecg.Replicant("videosInfoCurrent");
const currentDataDiv = document.getElementById("currentData");


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
                console.log(runner)
                if(runner.volume == 0){
                    html += `<button onclick="focusAudio('${runner.id}')" >Foco</button>`;
                }


            }html += `</fieldset>`;
        });
    }
    currentDataDiv.innerHTML = html;
}

function switchStatus(id,status){
    console.log(id,status);
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