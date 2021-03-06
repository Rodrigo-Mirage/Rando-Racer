
var LayoutConfigs = nodecg.Replicant('layoutConfigs');
var raceInfo = nodecg.Replicant("raceInfoCurrent"); 
var RunStatus = nodecg.Replicant("RunStatus"); 
const videos = document.getElementById("videos");
const timerVal = nodecg.Replicant("timeVal");
var videosInfo = nodecg.Replicant("videosInfoCurrent");

var player = videojs('vid1',window.location.host.indexOf('localhost')>-1?null:
{
    html5: {
      vhs: {
        withCredentials: true
      }
    }
});

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
var layoutlist = [];
var CurLayout = "";


LayoutConfigs.on("change", (newVal, oldVal) => {
    layoutlist = newVal;
});
raceInfo.on("change", (newVal, oldVal) => {
    CurLayout = newVal.layout;
});


videosInfo.on("change", (newVal, oldVal) => {
    newVal.forEach(runner=>{
        if(runner.id == id){
            qual = runner.qualities.filter(a=>a.set == true)[0];
            if(CurLayout){
                var layData = layoutlist.filter(a=>a.name == CurLayout)[0];
                if(layData){
                    baseheight = parseInt(layData.height);
                    basewidth = parseInt(layData.width);
                }
            }
            if(quality != qual.name){
                quality = qual.name;

                var options = window.location.host.indexOf('localhost')>-1?{
                    src: qual.url,
                    type: 'application/x-mpegURL'
                }:{
                    src: qual.url,
                    type: 'application/x-mpegURL',
                    withCredentials:true
                };
                player.src(options);
                if(cropped == "true"){
                    var width = basewidth;
                    var height= baseheight;

                    
                    var u = parseInt(runner.crops.top)||0;
                    var d = parseInt(runner.crops.bottom)||0;
                    var l = parseInt(runner.crops.left)||0;
                    var r = parseInt(runner.crops.right)||0;

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