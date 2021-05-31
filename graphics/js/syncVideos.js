
var raceInfo = nodecg.Replicant("raceInfo"); 
var RunStatus = nodecg.Replicant("RunStatus"); 
const videos = document.getElementById("videos");
const timerVal = nodecg.Replicant("timeVal");

var players = new Array();
var playersInfo = new Array();
var ready = false;
var starting = {};

var startTime = 0;

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady() {
    if (typeof playersInfo === 'undefined') return;
    
    for (var i = 0; i < playersInfo.length; i++) {
        var curplayer = createPlayer(playersInfo[i]);
        players[i] = curplayer;
    }
}

function createPlayer(playerInfo) {
    return new YT.Player(playerInfo.id, {
        height: playerInfo.height,
        width: playerInfo.width,
        videoId: playerInfo.videoId,
        playerVars:{
            controls:0,
            rel: 0,
            modestbranding: 1,
            start:playerInfo.start,
            enablejsapi:1
        }
    });
}
function updateplayer(playerInfo){

}


raceInfo.on("change", (newVal, oldVal) => {
    setup(newVal);
});

RunStatus.on("change", (newVal, oldVal) => {
    playStatus(newVal);
});


timerVal.on("change", (newVal, oldVal) => {
    //console.log(newVal);
    startTime = newVal>0?newVal:0;
    sync()
});


function setup(newVal){
    console.log(newVal)
    if(newVal.type == "async"){
        console.log(ready)
        if(ready){
            var count = 0;
            newVal.runners.forEach(runner => {
                var newUrl = "";
                var start = 0;
                if(runner.url.indexOf("v=")>-1){
                    newUrl = runner.url.substring((runner.url.lastIndexOf("v=")+2));
                }
                else{
                    if(runner.url.indexOf("/")){
                        newUrl = runner.url.substring(runner.url.lastIndexOf("/"));
                    }
                }
                if(runner.start){
                    start = parseInt(runner.start);
                }
    
                start = start + (startTime>0?startTime:0);
                if(runner.url){
                    var info =
                    {
                        id: 'player'+count,
                        height: '360',
                        width: '640',
                        videoId: newUrl,
                        start : start
                    }
                    if(playersInfo[count]){
                        if(editplayer(playersInfo[count],info,count)){
                            playersInfo[count] = info;
                        }
                    }
                    else{
                        videos.innerHTML = videos.innerHTML + `<div id ='player${count}'></div>`;
                        starting['player'+ count] = start ;
                        playersInfo[count] = info;
                    }
                }
    
                count++;
            });
            ready = true;
        }
        else{
            var count = 0;
            newVal.runners.forEach(runner => {
                var newUrl = "";
                var start = 0;
    
                if(runner.url.indexOf("v=")>-1){
                    newUrl = runner.url.substring((runner.url.lastIndexOf("v=")+2));
                }
                else{
                    if(runner.url.indexOf("/")){
                        newUrl = runner.url.substring(runner.url.lastIndexOf("/"));
                    }
                }
                //ytp-show-cards-title
                //ytp-watermark
                if(runner.start){
                    start = parseInt(runner.start);
                }
    
                start = start + (startTime>0?startTime:0);
    
                console.log(start);
    
                if(runner.url){
                    videos.innerHTML = videos.innerHTML+ `<div id ='player${count}'></div>`;
                    starting['player'+ count] = start ;
                    var info =
                    {
                        id: 'player'+count,
                        height: '360',
                        width: '640',
                        videoId: newUrl,
                        start : start
                    }
                    playersInfo[count] = info;
                }
    
                count++;
            });
            ready = true;
        }
    }
}

function editplayer(oldData,newData,index){
    if(newData != oldData){
        if(newData.videoId != oldData.videoId){
            players[index].loadVideoById({'videoId': newData.videoId,
            'startSeconds': newData.start,
            'suggestedQuality': 'large'});
            return true;
        }
        starting['player'+ count] = newData.start ;
    }
    return false;
}

function playStatus(rep){
    console.log(rep)
    if (rep.general == "running"){
        players.forEach(element => {
            if(element.playVideo){
                element.playVideo();
            }
        });
        sync();
    }else{
        players.forEach(element => {
            console.log(element);
            if(element.stopVideo){
                element.stopVideo();
            }
        });
    }
}

function sync(){
    players.forEach(element => {
        if(element.getCurrentTime){
            var actual = element.getCurrentTime()
            //console.log(startTime + starting[element.h.id])
            //console.log()
            if((startTime + starting[element.h.id] )% 10 == 0 && (actual - (startTime + starting[element.h.id])< -1 || actual - (startTime + starting[element.h.id]) >1  )){
                element.seekTo(startTime + starting[element.h.id]);
            }
        }
    });
}
