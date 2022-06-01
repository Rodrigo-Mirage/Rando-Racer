var raceInfo = nodecg.Replicant("raceInfoCurrent");
const currentDataDiv = document.getElementById("currentData");


raceInfo.on("change", (newVal, oldVal) => {
    setup(newVal);
});


function setup(data){
    var html = "";
    if(data){
        data.runners.forEach(runner => {
            html += `
                ${runner.name}|${runner.game}|
                <button onclick="trackRunner('${runner.id}')" >Tracker</button>
                <button onclick="cropRunner('${runner.id}')" >Crop</button>
            `;
        });
    }

    currentDataDiv.innerHTML = html;
}


function trackRunner(id){
    window.open("/bundles/Rando-Racer/graphics/tracker.html?pl="+id, '_blank');
}

function cropRunner(id){
    window.open("/bundles/Rando-Racer/graphics/crop.html?pl="+id, '_blank');
}
  