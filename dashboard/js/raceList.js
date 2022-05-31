const raceListDiv = document.getElementById("raceListDiv");


var raceList = nodecg.Replicant("raceList"); 
var raceInfo = nodecg.Replicant("raceInfo"); 

raceList.on("change", (newVal, oldVal) => {
    if (newVal) {
        setup(newVal);
    }
  });

function setup(data){
    var html = "";
    data.forEach(element => {
        html += `<div>
        Estimativa: ${element.estimativa} |
        Jogo: ${element.jogo}<br>
        Hosts: ${element.hosts} |
        Tipo: ${element.type}<br>`;
        var runners = "";
        element.runners.forEach((runner)=>{
            if(runners != ""){
                runners += " Vs "
            }
            runners += runner.name;
        });
        html += `<div>${runners}<div>`;
        html += `
        <button onClick='editRace("${element.id}")'>Edit</button>
        <button onClick='removeRace("${element.id}")'>Remove</button>
        </div>`;
    });
    raceListDiv.innerHTML = html;
}

function editRace(id){
    nodecg.readReplicant("raceList", "Rando-Racer", (data) => {
        data.forEach((race)=>{
            if(race.id == id){
                raceInfo.value = race;
            }
        });
    });
}
function removeRace(id){
    nodecg.readReplicant("raceList", "Rando-Racer", (data) => {
        var newList = [];
        data.forEach((race)=>{
            if(race.id != id){
                newList.push(race);
            }
        });
        raceList.value = newList;
    });
}