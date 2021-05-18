const element = document.getElementById("hostName");
const runnersDiv = document.getElementById("runnersDiv");
var hostName = nodecg.Replicant("hostName"); 
var raceInfo = nodecg.Replicant("raceInfo"); 

var baseData=
{
  runners:[]
}
var runners = [];


hostName.on("change", (newVal, oldVal) => {
  if (newVal) {
    element.value = newVal;
  }
});

function newName(e) {
    var name = e.value;
    hostName.value = name;
}

raceInfo.on("change", (newVal, oldVal) => {
    setup(newVal);
});

function setup(newVal){
  var html = "";
  if(newVal){
    runners = newVal.runners;
    if(runners){
      for(var i =0;i<runners.length;i++){

        html += `<div>
        <input type='text' id='RunnerName`+i+`' placeholder='Nome' value="`+runners[i].name+`" />
        <input type='text' id='RunnerStream`+i+`' placeholder='Twitch' value="`+runners[i].stream+`" />
        <input type='text' id='RunnerAlt`+i+`' placeholder='TwitchAtl' value="`+runners[i].alt+`" />
        <button onclick="trackRunner('`+runners[i].id+`')" >Tracker</button>
        <button onclick="remRunner(`+i+`)" >Remover</button>
        </div>`;
      }
    }
    html += `<div>
      <input type='text' id='addRunnerName' placeholder='Nome' />
      <input type='text' id='addRunnerStream' placeholder='Twitch' />
      <input type='text' id='addRunnerAlt' placeholder='TwitchAtl' />
      <button onclick="addRunner()" >Adicionar</button>
    </div>`;
    runnersDiv.innerHTML = html;
  }else{
    raceInfo.value = baseData;
  }
}

function addRunner() {
  const Name = document.getElementById("addRunnerName");
  const Stream = document.getElementById("addRunnerStream");
  const AltStream = document.getElementById("addRunnerAlt");
  var newId = uuidv4();

  var runnerobj = {
    id: newId,
    name: Name.value,
    stream: Stream.value,
    alt: AltStream.value,
    crop: {
      up:0,
      down:0,
      left:0,
      right:0
    },
    volume:0,
    status:"waiting"
  };
  runners.push(runnerobj);
  raceInfo.value = {runners : runners};
}
function remRunner(i) {
  if(confirm("Deseja remover o Runner?")){
    runners.splice(i, 1);
    raceInfo.value = {runners : runners};
  }
}
function trackRunner(id){
  window.open("/bundles/Rando-Racer/graphics/tracker.html?pl="+id, '_blank');
}

function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}
