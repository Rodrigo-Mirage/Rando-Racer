
var raceInfo = nodecg.Replicant("raceInfoCurrent"); 
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const pl = urlParams.get('pl');
var id = pl;
var index = 0;


const crop = document.getElementById("crop");
const original = document.getElementById("original");

raceInfo.on("change", (newVal, oldVal) => {
    if(newVal){
        original.src = "/bundles/Rando-Racer/graphics/"+newVal.type+".html?cropped=false&muted=true&pl=" + id;
        crop.src = "/bundles/Rando-Racer/graphics/"+newVal.type+".html?cropped=true&muted=true&pl=" + id;
    }
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
    height = 480;
    width = 854;
    Dright.style.height = height;
    Dleft.style.height = height;
    Ddown.style.width = width;
    Dup.style.width = width;
    original.height = height;
    original.width = width;
    crop.height = parseInt(newVal.videosConfig.height);
    crop.width = parseInt(newVal.videosConfig.width);

});

var linkVar = (varName,value) => {
    switch(varName){
        case "u":
            u = value;
            var posU = height * (u/1000);
            Dup.style.top = posU +"px";
        break;
        case "d":
            d = value;
            var posD = height * (d/1000);
            Ddown.style.top = (height - posD) +"px";
        break;
        case "l":
            l = value;
            var posL = width * (l/1000);
            Dleft.style.left = (posL) +"px";
        break;
        case "r":
            r = value;
            var posR = width * (r/1000);
            Dright.style.left = (width - posR) +"px";
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

            width = 854;
            height = 480;

            var posU = height * (u/1000);
            var posD = height * (d/1000);
            var posL = width * (l/1000);
            var posR = width * (r/1000);


            Dup.style.top = posU +"px";
            Ddown.style.top = (height - posD) +"px";
            Dleft.style.left = posL +"px";
            Dright.style.left = (width - posR) +"px";            

        }
        count++;
    });
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