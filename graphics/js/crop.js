
var raceInfo = nodecg.Replicant("raceInfoCurrent"); 
var videosInfo = nodecg.Replicant("videosInfoCurrent");
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const pl = urlParams.get('pl');
var id = pl;
var index = 0;
var quality = "";

const container = document.getElementById("vid1Container");   

const crop = document.getElementById("crop");
const original = document.getElementById("original");
var player = videojs('vid1');

raceInfo.on("change", (newVal, oldVal) => {
    if(newVal){
        original.src = "/bundles/Rando-Racer/graphics/"+newVal.type+".html?cropped=false&muted=true&pl=" + id;
    }
    setup(newVal);
    
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
            }
        }if(runner.status == "play"){
            player.play();
        }
    })
});

var u = 0;
var d = 0;
var l = 0;
var r = 0;

const up = document.getElementById("up");
const down = document.getElementById("down");
const left = document.getElementById("left");
const right = document.getElementById("right");

var LayoutConfigs = nodecg.Replicant('layoutConfigs');

var height = 0;
var width = 0;
var baseheight = 0;
var basewidth = 0;


LayoutConfigs.on("change", (newVal, oldVal) => {
    height = 480;
    width = 854;
    original.height = height;
    original.width = width;
    crop.style.height = parseInt(newVal.videosConfig.height);
    crop.style.width = parseInt(newVal.videosConfig.width);
    baseheight = parseInt(newVal.videosConfig.height);
    basewidth = parseInt(newVal.videosConfig.width);
    updatePrevia();
});

var linkVar = (varName,value) => {
    switch(varName){
        case "u":
            u = value||0;
        break;
        case "d":
            d = value||0;
        break;
        case "l":
            l = value||0;
        break;
        case "r":
            r = value||0;
        break;
    }
    updatePrevia();
};

up.onchange = function () { linkVar("u",this.value||0)};
down.onchange =function () { linkVar("d",this.value||0)};
left.onchange =function () { linkVar("l",this.value||0)};
right.onchange =function () { linkVar("r",this.value||0)};

function updatePrevia(){
    var width = basewidth;
    var height= baseheight;

    const container = document.getElementById("vid1Container");    

    
    var posU = height * (u/1000);
    var posD = height * (d/1000);
    var posL = width * (l/1000);
    var posR = width * (r/1000);

    var finalW = (posL)+(posR)+width;
    var finalL = (posR)-(posL)<0?(posR)-(posL):0;
    var finalH = (posU)+(posD)+height;
    var finalT = (posD)-(posU)<0?(posD)-(posU):0;

    container.style.marginTop = (finalT)+"px";
    container.style.marginLeft = (finalL)+"px";

    player.width(finalW);
    player.height(finalH);
}

function setup(newVal){
    var count = 0;
    newVal.runners.forEach(runner => {
        if(runner.id == id){
           index = count;

            u = runner.crop.top||0;
            d = runner.crop.bottom||0;
            l = runner.crop.left||0;
            r = runner.crop.right||0;

            up.value = u;
            down.value = d;
            left.value = l;
            right.value = r;
        }
        count++;
    });
    updatePrevia();
}

function Save(){

    var crop = {
        top:parseInt(up.value)||0,
        bottom:parseInt(down.value)||0,
        left:parseInt(left.value)||0,
        right:parseInt(right.value)||0
    }
    raceInfo.value.runners[index].crop = crop;
}