
var raceInfo = nodecg.Replicant("raceInfo"); 
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const pl = urlParams.get('pl');
var id = pl;
var index = 0;


const crop = document.getElementById("crop");

crop.src = "/bundles/Rando-Racer/graphics/player.html?pl=" + id;


raceInfo.on("change", (newVal, oldVal) => {
    setup(newVal);
});

var u = 0;
var d = 0;
var l = 0;
var r = 0;

const up = document.getElementById("up");
const down = document.getElementById("down");
const left = document.getElementById("left");
const right = document.getElementById("right");

const Dup = document.getElementById("dragTop");
const Ddown = document.getElementById("dragBottom");
const Dleft = document.getElementById("dragLeft");
const Dright = document.getElementById("dragRight");

var LayoutConfigs = nodecg.Replicant('layoutConfigs');

var height = 0;
var width = 0;


LayoutConfigs.on("change", (newVal, oldVal) => {
    height = parseInt(newVal.videosConfig.height);
    width = parseInt(newVal.videosConfig.width);
});

var linkVar = (varName,value) => {
switch(varName){
    case "u":
        u = value;
        Dup.style.top = value +"px";
    break;
    case "d":
        d = value;
        Ddown.style.top = (height - value) +"px";
    break;
    case "l":
        l = value;
        Dleft.style.left = (value) +"px";
    break;
    case "r":
        r = value;
        Dright.style.left = (width - value) +"px";
    break;
}
};

up.onchange = function () { linkVar("u",this.value)};
down.onchange =function () { linkVar("d",this.value)};
left.onchange =function () { linkVar("l",this.value)};
right.onchange =function () { linkVar("r",this.value)};



function setup(newVal){
    var count = 0;
    newVal.runners.forEach(runner => {
        if(runner.id == id){
           index = count;

            u = runner.crop.top;
            d = runner.crop.bottom;
            l = runner.crop.left;
            r = runner.crop.right;

            up.value = u;
            down.value = d;
            left.value = l;
            right.value = r;

            Dup.style.top = u +"px";
            Ddown.style.top = (height - d) +"px";
            Dleft.style.left = (l) +"px";
            Dright.style.left = (width - r) +"px";

        }
        count++;
    });
}

function Save(){

    var crop = {
        top:parseInt(up.value),
        bottom:parseInt(down.value),
        left:parseInt(left.value),
        right:parseInt(right.value)

    }
    raceInfo.value.runners[index].crop = crop;
}