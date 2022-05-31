
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

                    var posL = (width * (l/1000));
                    var posR = (width * (r/1000));
        

                    //container.style.marginTop = (d+u)+"px";
                    container.style.marginLeft = "-"+(posL*1.4)+"px";
                    
                    console.log((posL*2) + width,"-"+(posL*2)+"px")
                    console.log((posL*1.3) + width,"-"+(posL*1.3)+"px")
                    console.log((posL*1.4) + width,"-"+(posL*1.4)+"px")
                    
                    console.log(1110,"-310px")

                    player.width((posL*1.4) + width)
                    player.height(u+d+height)
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