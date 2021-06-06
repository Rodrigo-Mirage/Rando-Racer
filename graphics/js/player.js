
var LayoutConfigs = nodecg.Replicant('layoutConfigs');
var raceInfo = nodecg.Replicant("raceInfo"); 
var RunStatus = nodecg.Replicant("RunStatus"); 
const videos = document.getElementById("videos");
const timerVal = nodecg.Replicant("timeVal");


var height = 0;
var width = 0;

LayoutConfigs.on("change", (newVal, oldVal) => {
    console.log(newVal)
    width = parseInt(newVal.videosConfig.width);
    height = (width * 9)/16;
});

var player;
var playersInfo;
var ready = false;
var starting;
var startTime = 0;

const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);
const pl = urlParams.get('pl');
var id = pl;

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady() {
    console.log("started")
    if (typeof playersInfo === 'undefined') {
        Aff();
    }else{
        player = createPlayer(playersInfo);
    }
}

function Aff(){
    setTimeout(()=>{
        onYouTubeIframeAPIReady();
    },2000);
}



function createPlayer(playerInfo) {
    return new YT.Player(playerInfo.id, {
        height: playerInfo.height,
        width: playerInfo.width,
        videoId: playerInfo.videoId,
        playerVars:{
            controls:1,
            rel: 0,
            modestbranding: 1,
            start:playerInfo.start,
            enablejsapi:1
        }
    });
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
                if(runner.id == id){
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
                    if(runner.url){
                        console.log(height)
                        var info =
                        {
                            id: 'player',
                            height: height,
                            width: width,
                            videoId: newUrl,
                            start : start
                        }
                        if(playersInfo){
                            if(editplayer(playersInfo,info)){
                                playersInfo = info;
                            }
                            starting = start;
                        }
                        else{
                            starting = start ;
                            playersInfo = info;
                        }
                    }
                }
    
                count++;
            });
            ready = true;
        }
        else{
            var count = 0;
            newVal.runners.forEach(runner => {
                if(runner.id == id){
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
        
                    if(runner.url){
                        starting = start ;
                        console.log(height)
                        var info =
                        {
                            id: 'player',
                            height: height,
                            width: width,
                            videoId: newUrl,
                            start : start
                        }
                        playersInfo = info;
                    }
                }
                count++;
            });
            ready = true;
        }
    }
}

function editplayer(oldData,newData){
    if(newData != oldData){
        if(newData.videoId != oldData.videoId){
            player.loadVideoById({'videoId': newData.videoId,
            'startSeconds': newData.start,
            'suggestedQuality': 'large'});
            return true;
        }
    }
    return false;
}

function playStatus(rep){
    console.log(rep)
    if(player){
        if (rep.general == "running"){
            player.playVideo();
            sync();
        }else{
            player.stopVideo();
        }
    }
}

function sync(){
    if (typeof player === 'undefined') return;
    if (typeof player.getCurrentTime === 'undefined') return;
    if(player.getCurrentTime()){
        var actual = player.getCurrentTime()
        if((startTime + starting )% 10 == 0 && (actual - (startTime + starting)< -1 || actual - (startTime + starting) >1  )){
            player.seekTo(startTime + starting);
        }
    }
}
