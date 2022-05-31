
var LayoutConfigs = nodecg.Replicant('layoutConfigs');
var raceInfo = nodecg.Replicant("raceInfoCurrent"); 
var RunStatus = nodecg.Replicant("RunStatus"); 
const videos = document.getElementById("videos");
const timerVal = nodecg.Replicant("timeVal");
var videosInfo = nodecg.Replicant("videosInfoCurrent");
var player = videojs('vid1');

var baseheight = 0;
var basewidth = 0;

var player;
var playersInfo;
var ready = false;
var starting;
var startTime = 0;

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const pl = urlParams.get('pl');
const mute = urlParams.get('muted');
const cropped = urlParams.get('cropped');
var id = pl;

var quality = "";

LayoutConfigs.on("change", (newVal, oldVal) => {
    basewidth = parseInt(newVal.videosConfig.width);
    baseheight = parseInt(newVal.videosConfig.height);
});


videosInfo.on("change", (newVal, oldVal) => {
    newVal.forEach(runner=>{
        if(runner.id == id){
            qual = runner.qualities.filter(a=>a.set == true)[0];
            if(quality != qual.name){
                quality = qual.name;
                player.src({
                    src: qual.url,
                    type: 'application/x-mpegURL'
                });
                if(cropped == "true"){
                    var width = basewidth;
                    var height= baseheight;

                    
                    var u = parseInt(runner.crops.top);
                    var d = parseInt(runner.crops.bottom);
                    var l = parseInt(runner.crops.left);
                    var r = parseInt(runner.crops.right);

                    const container = document.getElementById("vid1Container");    

                    var finalW = (l)+(r)+width;
                    var finalL = (r)-(l)<0?(r)-(l):0;
                    var finalH = (u)+(d)+height;
                    var finalT = (d)-(u)<0?(d)-(u):0;

                    container.style.marginTop = (finalT)+"px";
                    container.style.marginLeft = (finalL)+"px";

                    player.width(finalW);
                    player.height(finalH);
                }
            }
        }if(runner.status == "play"){
            player.play();
            if(!mute){
                player.muted(runner.volume == 0)
            }
        }
    })
});


nodecg.listenFor('playPlayer', function (data, ack) {
    if(!mute){
        if (id == data.id) {
            player.play();
        }
    }
});
nodecg.listenFor('pausePlayer', function (data, ack) {
    if (id == data.id) {
        player.pause();
    }
});
nodecg.listenFor('FocusPlayer', function (data, ack) {
    if(!mute){
        if (id == data.id) {
            player.muted(false)
        }
    }
});